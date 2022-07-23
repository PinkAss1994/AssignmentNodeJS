const{Category} = require('../models/category.model');
const{Product} = require('../models/product.model');

const getHomePage = async (req, res) => {
    res.render('client/home');
}



module.exports={
    getHomePage
}