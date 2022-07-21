const express = require('express');
const {getDashBoard, getAllCategory, getAddCategoryView, createCate, createProduct, getAddProductView, getAllProduct, fileUploadForm} = require('../controllers/admin.controller');
const {upload} = require('../middleware/upload');
const router = express.Router();

router.get('/admin', getDashBoard);
router.get('/admin/category-list', getAllCategory);
router.get('/admin/create-cate', getAddCategoryView);
router.post('/admin/create-cate', createCate);
router.get('/admin/list-products', getAllProduct);
router.get('/admin/add-products', getAddProductView);
router.post('/admin/add-products',upload.array('file'),createProduct); 
module.exports = {
    routes: router
}

