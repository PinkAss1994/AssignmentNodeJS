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

router.get("/shopping-cart", ShopController.getCart);
router.get("/add-to-cart/:productId", ShopController.addToCart);
router.get("/modify-cart", ShopController.modifyCart);
router.get("/delete-cart", ShopController.getDeleteCart);
router.get("/delete-item/:productId", ShopController.getDeleteItem);



module.exports = {
    routes : router
}