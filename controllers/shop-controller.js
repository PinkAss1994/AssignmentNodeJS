const{Category} = require('../models/category.model');
const{Product} = require('../models/product.model');
const {Cart} = require('../models/cart');

var ITEM_PER_PAGE = 12;
var SORT_ITEM;
var sort_value = "Giá thấp tới cao";
var ptype;
var ptypesub;
var pprice = 999999;
var psize;
var plabel;
var plowerprice;
var price;
var searchText;

//Get home page
exports.getHomePage = (req, res, next) => {
    // var cartProduct;
    // if (!req.session.cart) {
    //   cartProduct = null;
    // } else {
    //   var cart = new Cart(req.session.cart);
    //   cartProduct = cart.generateArray();
    // }
  var sale = {sale: -1};
  var buyCount = {buyCount: -1};
  var slide = {createAt: -1};
    Product.find()
      .limit(8)
      .sort(buyCount)
      .then(products => {
        Product.find()
          .limit(8)
          .sort(sale)
          .then(products2 => {
            Product.find()
            .limit(8)
            .sort(slide)
            .then(products3 => {
            res.render("client/home", {
              title: "HomePage",
              trendings: products,
              sale: products2,
              slide: products3,
              
            //   cartProduct: cartProduct
                });
            });
          });
      })
      .catch(err => {
        console.log(err);
      });
  };
  
  //Get product details

  exports.getProductDetails = (req, res, next) => {
    // var cartProduct;
    // if (!req.session.cart) {
    //   cartProduct = null;
    // } else {
    //   var cart = new Cart(req.session.cart);
    //   cartProduct = cart.generateArray();
    // }
    
    const id = req.params.id;
    Product.findById(id).then(product => {
      Product.find({ "category_id": product.category_id }).then(
        relatedProducts => {
          res.render("client/product-details", {
            prod: product,
            relatedProducts: relatedProducts
          });
          product.save();
        }
      );
    });
  };

//Get Products list page

// const getProductsPage = async (req, res) => {
//     res.render('client/products', {layout: 'layouts/products-page'});
// }
