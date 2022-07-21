const {Category, validate} = require('../models/category.model');
const{Product, valid} = require('../models/product.model');
const getDashBoard = async (req, res, next) => {
    res.render('admin/home');
}
//manage category

//get all categories

const getAllCategory = async (req, res, next) => {
    const list = await Category.find().exec();
    res.render('admin/categoryList', {
        category: list
    });
}

//get add category view

const getAddCategoryView = async (req, res, next) => {
    res.render('admin/createCategory');
}

//create category

const createCate = async (req, res, next) => {
    const{error} = validate(req.body);
    if(error) return res.status(422).send(error.details[0].message);
    const data = req.body;
    let category = await new Category({
        name: data.name,
        status: data.status,
        product_id: []
    });

    category = await category.save();
    res.redirect('/admin/category-list')
}

// Manage Products

//Get all Products

const getAllProduct = async(req, res, next) => {
    const listProduct = await Product.find().exec();
    res.render('admin/products',{
        product: listProduct
    });
}

//Get Add Product View

const getAddProductView = async(req, res, next) => {
    res.render('admin/createProduct');
}

//Create Product

const createProduct = async (req, res, next) => {
    const{error} = valid(req.body);
    if(error) return res.status(422).send(error.details[0].message);
    const pro = req.body;
    let product = await new Product({
        name: pro.name,
        description: pro.description,
        details: pro.details,
        stock: pro.stock,
        price: pro.price,
        size: pro.size,
        color: pro.color,
        label: pro.label,
        sale: pro.sale,
        images: pro.images
    });
    product = await product.save();
    res.redirect('admin/products');

}
module.exports = {
    getDashBoard,
    getAllCategory,
    getAddCategoryView,
    createCate,
    createProduct,
    getAddProductView,
    getAllProduct
}
