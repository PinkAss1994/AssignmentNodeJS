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
router.post('/products/:productType*?', ShopController.postNumItems);
router.get("/search", ShopController.getSearch);




module.exports = {
    routes : router
}