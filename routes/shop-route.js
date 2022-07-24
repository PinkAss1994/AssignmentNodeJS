const express = require('express');
const{getHomePage, getProductsPage} =require('../controllers/shop-controller');
const router = express.Router();

router.use((req, res, next) => {
    req.app.set('layout', 'layouts/client');
    next();
});

router.get('', getHomePage);
router.get('/products', getProductsPage);


module.exports = {
    routes : router
}