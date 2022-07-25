const express = require('express');
const router = express.Router();
const ShopController =require('../controllers/shop-controller');


router.use((req, res, next) => {
    req.app.set('layout', 'layouts/client');
    next();
});
router.get('', ShopController.getHomePage);
router.get('/product/:id', ShopController.getProductDetails);



module.exports = {
    routes : router
}