const router = require('express').Router();
const dashboardRoutes = require('./dashboardRoutes');
const logInRoutes = require('./logInRoutes');

router.use('/dashboard', dashboardRoutes);
router.use('/login', logInRoutes);

module.exports = router;