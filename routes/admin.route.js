const express = require('express');
const {getDashBoard, getAllCategory, getAddCategoryView, createCate, createProduct, getAddProductView, getAllProduct} = require('../controllers/admin.controller');
const {upload} = require('../middleware/upload');
const router = express.Router();

router.get('/admin', getDashBoard);
router.get('/admin/category-list', getAllCategory);
router.get('/admin/create-cate', getAddCategoryView);
router.post('/admin/create-cate', createCate);
router.get('/admin/products', getAllProduct);
router.get('/admin/add-products', getAddProductView);
router.post('/admin/add-products', upload.array('myFiles'), createProduct); 
module.exports = {
    routes: router
}

// const router = express.Router();
// const admin_controller = require('../controllers/admin.controller');

// router.post("/admin/pages/category", admin_controller.category_create);

// module.exports = router;