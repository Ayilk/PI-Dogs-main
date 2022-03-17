const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { Dog, Temperament } = require('../db');
require('dotenv').config();
const{ API_KEY } = process.env 

const getTemmperaments = async ( req, res, next ) => {   
    const temperamentApi = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data

    let temperaments = temperamentApi.map((el) => el.temperament);
    temperaments = temperaments.join().split(",");
    temperaments = [...new Set (temperaments)].sort();                        
   
    temperaments.forEach((el) => {   
      Temperament.findOrCreate({    
        where: { name: el},        
      });
    })
    const allTemperaments = await Temperament.findAll();
        res.send(allTemperaments);
}

  module.exports = {getTemmperaments};