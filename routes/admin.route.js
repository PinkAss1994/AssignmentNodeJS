const express = require('express');
const {getDashBoard, getAllCategory, getAddCategoryView, createCate, createProduct, getAddProductView, getAllProduct, getUpdateProductView, updateProduct} = require('../controllers/admin.controller');
const {upload} = require('../middleware/upload');

const router = express.Router();
router.use((req, res, next) => {
    // changing layout for my admin panel
    req.app.set('layout', 'layouts/admin');
    next();
});
router.get('/admin', getDashBoard);
router.get('/admin/category-list', getAllCategory);
router.get('/admin/create-cate', getAddCategoryView);
router.post('/admin/create-cate', createCate);
router.get('/admin/list-products', getAllProduct);
router.get('/admin/add-products', getAddProductView);
router.post('/admin/add-products',upload.array('file'),createProduct); 
router.get('/admin/update-product/:id',getUpdateProductView);
router.post('/admin/update-product/:id', upload.array('file'), updateProduct);
module.exports = {
    routes: router
}

