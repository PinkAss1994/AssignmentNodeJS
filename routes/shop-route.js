const express = require('express');
const{getHomePage} =require('../controllers/shop-controller');
const router = express.Router();

router.use((req, res, next) => {
    req.app.set('layout', 'layouts/client');
    next();
});

router.get('', getHomePage);

module.exports = {
    routes : router
}