const express = require('express');
const router = express.Router();
const ShopController =require('../controllers/shop-controller');


router.use((req, res, next) => {
    req.app.set('layout', 'layouts/client');
    next();
});
router.get('', ShopController.getHomePage);
router.get('/product/:id', ShopController.getProductDetails);
router.get('/products/:productType?/:productChild?', ShopController.getProducts);



module.exports = {
    routes : router
}