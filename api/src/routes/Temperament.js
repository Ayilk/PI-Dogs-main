const { Router } = require('express');
const router = Router();
const { getTemmperaments } = require('../controllers/Temperaments')

 router.get('/', getTemmperaments)
 //router.get('/:id', getAllDogos)
 

 module.exports = router;