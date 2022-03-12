const { dogController } = require('../controllers/Dogs');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const DogsRoutes = require('./Dog');
//const TemperamentsRoutes = require('./Temperament');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/dogs', DogsRoutes);
//router.use('/temperaments', TemperamentsRoutes);

router.get('/', (req, res, next) => {
    res.send("Rutas conectadas correctamente en el index")
})
//router.get('/dogs', dogController)

module.exports = router;
