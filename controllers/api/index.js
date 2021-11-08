const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const logInRoutes = require('./logInRoutes');


router.use('/users', userRoutes)

module.exports = router;