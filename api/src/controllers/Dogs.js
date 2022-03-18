const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { Dog, Temperament } = require('../db');
require('dotenv').config();
const{ API_KEY } = process.env 


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
    const apiDogs = axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
 
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
              temperament: el.temperament,
              image: el.image.url
          }
      }))

      if(id){
          let dogId = infoTotal.filter(el => el.id == id);
          dogId.length ? res.status(200).send(dogId) : res.status(400).send("Dog not found")
      } 
      if(name){
          let dogName = infoTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
          dogName.length ? res.send(dogName) : res.status(400).send("That name is not, sorry ")
      }
      res.send(infoTotal)
    })
    .catch((error) => next(error))
 
   
 }

 const addDog = async ( req, res, next ) => {
    const { name, height, weight, life_span, image, createdInDb, temperament} = req.body;

    const dogCreated = await Dog.create({
         name, height, weight, life_span, image, createdInDb, id: uuidv4()
    })

    const temperamentDb = await Temperament.findAll({
        where: {
            name: temperament
        }
    })
    dogCreated.addTemperament(temperamentDb)
    res.send("Puppy successfully created")
}




 

module.exports = {
    
   getAllDogos,
   addDog
}