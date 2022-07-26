const mongoose = require('mongoose');
const{Category} = require('../models/category.model');
const{Product} = require('../models/product.model');
const {Cart} = require('../models/cart');

var ITEM_PER_PAGE = 12;
var SORT_ITEM;
var sort_value = "sorting";
// var ptype;
// var ptypesub;
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
    
    var sale = {sale: -1};
    _id: new mongoose.Types.ObjectId();
    const id = req.params.id;
    Product.findById(id).then(product => {
      Product.find({ "category_id": product.category_id }).limit(9).sort(sale).then(
        relatedProducts => {
          res.render("client/product-details", {
            prod: product,
            relatedProducts: relatedProducts
          });
          console.log(product);
        }
      );
    });
  };

//Get Products list page


exports.getProducts = (req, res, next) => {
  let productType = req.params.productType;
  let productChild = req.params.productChild;

  // ptype = req.query.type !== undefined ? req.query.type : ptype;
  // ptypesub = req.query.type !== undefined ? req.query.type : ptypesub;
  pprice = req.query.price !== undefined ? req.query.price : 999999;
  psize = req.query.size !== undefined ? req.query.size : psize;
  plabel = req.query.label !== undefined ? req.query.label : plabel;
  plowerprice = pprice !== 999999 ? pprice - 50 : 0;
  plowerprice = pprice == 1000000 ? 200 : plowerprice;
  SORT_ITEM = req.query.orderby;

  if (SORT_ITEM == -1) {
    sort_value = "price increase";
    price = "-1";
  }
  if (SORT_ITEM == 1) {
    sort_value = "price derease";
    price = "1";
  }

  if (Object.entries(req.query).length == 0) {
    psize = "";
    plabel = "";
  }

  var page = +req.query.page || 1;
  let totalItems;
  let catName = [];
  Category.find({}, (err, cats) => {
    cats.forEach(cat => {
      catName.push(cat.name);
    });
  });


  if (productType == undefined) {
    productType = "";
  } else {
    Category.findOne({ name: `${productType}` }, (err) => {
      if (err) console.log(err);
     
    });
  }
  if (productChild == undefined) {
    productChild = "";
  }
  Product.find({
    category_id: new RegExp(productChild, "i"),
    size: new RegExp(psize, "i"),
    price: { $gt: plowerprice, $lt: pprice },
    label: new RegExp(plabel, "i")
  })
    .countDocuments()
    .then(numProduct => {
      totalItems = numProduct;
      return Product.find({
        category_id: new RegExp(productChild, "i"),
        size: new RegExp(psize, "i"),
        price: { $gt: plowerprice, $lt: pprice },
        label: new RegExp(plabel, "i")
      })
        .skip((page - 1) * ITEM_PER_PAGE)
        .limit(ITEM_PER_PAGE)
        .sort({
          price
        });
    })
    .then(products => {
      res.render("client/products", {
        title: "Products List",

        allProducts: products,
        currentPage: page,
        currentChild: productChild,
        categories: catName,
        currentCat: productType,
        
        // categoriesChild: childType,
        hasNextPage: ITEM_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEM_PER_PAGE),
        ITEM_PER_PAGE: ITEM_PER_PAGE,
        sort_value: sort_value,
        
      });
    })
    .catch(err => {
      console.log(err);
    });
};