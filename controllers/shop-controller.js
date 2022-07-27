const mongoose = require('mongoose');
const{Category} = require('../models/category.model');
const{Product} = require('../models/product.model');
const Cart = require('../models/cart');

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
    var cartProduct;
    if (!req.session.cart) {
      cartProduct = null;
    } else {
      var cart = new Cart(req.session.cart);
      cartProduct = cart.generateArray();
    }
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
              cartProduct: cartProduct
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
    var cartProduct;
    if (!req.session.cart) {
      cartProduct = null;
    } else {
      var cart = new Cart(req.session.cart);
      cartProduct = cart.generateArray();
    }
    
    var sale = {sale: -1};
    _id: new mongoose.Types.ObjectId();
    const id = req.params.id;
    Product.findById(id).then(product => {
      Product.find({ "category_id": product.category_id }).limit(9).sort(sale).then(
        relatedProducts => {
          res.render("client/product-details", {
            prod: product,
            relatedProducts: relatedProducts,
            cartProduct: cartProduct
          });
          console.log(product);
        }
      );
    });
  };

//Get Products list page


exports.getProducts = (req, res, next) => {
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  let productType = req.params.productType;
  let productChild = req.params.productChild;
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

  let childType;
  if (productType == undefined) {
    productType = "";
  } else {
    Category.findOne({ name: `${productType}` }, (err, data) => {
      if (err) console.log(err);
     if(data) {
      childType = data.name || "";
      //console.log(childType);
     }else{
      childType = "";
     }
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
        categoriesChild: childType,
        categories: catName,
        currentCat: productType, 
        categoriesChild: childType,
        hasNextPage: ITEM_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEM_PER_PAGE),
        ITEM_PER_PAGE: ITEM_PER_PAGE,
        sort_value: sort_value,
        cartProduct: cartProduct
        
      });
    })
    .catch(err => {
      console.log(err);
    });
    
};
exports.postNumItems = (req, res, next) => {
  ITEM_PER_PAGE = parseInt(req.body.numItems);
  res.redirect("back");
};

exports.getSearch = (req, res, next) => {
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  searchText =
    req.query.searchText !== undefined ? req.query.searchText : searchText;
  const page = +req.query.page || 1;

  Product.createIndexes({}).catch(err => {
    console.log(err);
  });
  Product.find({
    $text: { $search: searchText }
  })
    .countDocuments()
    .then(numProduct => {
      totalItems = numProduct;
      return Product.find({
        $text: { $search: searchText }
      })
        .skip((page - 1) * 12)
        .limit(12);
    })
    .then(products => {
      res.render("client/search-result", {
        title: "Search Result " + searchText,
        
        searchProducts: products,
        searchT: searchText,
        currentPage: page,
        hasNextPage: 12 * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / 12),
        cartProduct: cartProduct
        
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getCart = (req, res, next) => {
  var cartProduct;
  if (!req.session.cart) {
    cartProduct = null;
  } else {
    var cart = new Cart(req.session.cart);
    cartProduct = cart.generateArray();
  }
  res.render("client/cart", {
    title: "Shopping Cart",
    cartProduct: cartProduct
  });
};

exports.addToCart = (req, res, next) => {
  var prodId = req.params.productId;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(prodId, (err, product) => {
    if (err) {
      return res.redirect("back");
    }
    cart.add(product, prodId);
    req.session.cart = cart;
    // if (req.user) {
    //   req.user.cart = cart;
    //   req.user.save();
    // }
    res.redirect("back");
  });
};

exports.modifyCart = (req, res, next) => {
  var prodId = req.query.id;
  var qty = req.query.qty;
  if (qty == 0) {
    return res.redirect("back");
  }
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(prodId, (err, product) => {
    if (err) {
      return res.redirect("back");
    }
    cart.changeQty(product, prodId, qty);
    req.session.cart = cart;
    // if (req.user) {
    //   req.user.cart = cart;
    //   req.user.save();
    // }
    res.redirect("back");
  });
};

exports.getDeleteCart = (req, res, next) => {
  req.session.cart = null;
  // if (req.user) {
  //   req.user.cart = {};
  //   req.user.save();
  // }
  res.redirect("back");
};

exports.getDeleteItem = (req, res, next) => {
  var prodId = req.params.productId;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(prodId, (err, product) => {
    if (err) {
      return res.redirect("back");
    }
    cart.deleteItem(prodId);
    req.session.cart = cart;
    // if (req.user) {
    //   req.user.cart = cart;
    //   req.user.save();
    // }
    console.log(req.session.cart);
    res.redirect("back");
  });
};