const { Router } = require('express');
const router = Router();
const { getAllDogos } = require('../controllers/Dogs')

 router.get('/', getAllDogos)
 router.get('/:id', getAllDogos)
 

 module.exports = router;