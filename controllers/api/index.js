const router = require('express').Router();
const userRoutes = require('./userRoutes');
const logInRoutes = require('./logInRoutes');

router.use('/dashboard', userRoutes);
router.use('/login', logInRoutes);

module.exports = router;