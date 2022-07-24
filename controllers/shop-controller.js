const{Category} = require('../models/category.model');
const{Product} = require('../models/product.model');
const Cart = require('../models/cart');



//Get hom page
const getHomePage = async (req, res) => {
    res.render('client/home');
}

//Get Products list page

const getProductsPage = async (req, res) => {
    res.render('client/products', {layout: 'layouts/products-page'});
}


module.exports={
    getHomePage,
    getProductsPage
}