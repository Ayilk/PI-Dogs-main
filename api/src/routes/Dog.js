const { Router } = require('express');
const router = Router();
const { getAllDogos, addDog } = require('../controllers/Dogs')

 router.get('/', getAllDogos)
 router.get('/:id', getAllDogos)
 router.post('/', addDog)
 

 module.exports = router;