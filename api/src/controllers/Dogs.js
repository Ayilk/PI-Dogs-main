const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { Dog, Temperament } = require('../db');


const getAllDogos = ( req, res, next )=>{
    const name = req.query.name;

    const id = req.params.id;
 
    const dbDogs = Dog.findAll({
         include: {
             model: Temperament,
             attributes: ['name'],
             through: {
                 attributes: []
             }
         }
    })
    const apiDogs = axios.get("https://api.thedogapi.com/v1/breeds");
 
    Promise.all([ dbDogs, apiDogs ])
    .then(info => {
         const [ dbDogsInfo, apiDogsInfo ] = info;
 
         const infoTotal = dbDogsInfo.concat(apiDogsInfo.data.map(el => {
          return{
              id: el.id,
              name: el.name,
              height: el.height.metric,
              weight: el.weight.metric,
              life_span: el.life_span,
              image: el.image.url
          }
      }))

      if(id){
          let dogId = infoTotal.filter(el => el.id == id);
          dogId.length ? res.status(200).send(dogId) : res.status(400).send("Dog not found")
      } 
      if(name){
          let dogName = infoTotal.filter(el => el.name.includes(name))
          dogName.length ? res.send(dogName) : res.status(400).send("That name is not, sorry ")
      }
      res.send(infoTotal)
    })
    .catch((error) => next(error))
 
   
 }

 

module.exports = {
    
   getAllDogos
}