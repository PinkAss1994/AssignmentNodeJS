const {Category} = require('../models/category.model');
const{Product} = require('../models/product.model');
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
    // Category.find(function(err, items) {
    //     if (err) {
    //         console.error(" category list error" + err);
    //         res.render("admin/home");

    //     }else{
    //         cats:items;
    //         res.render('admin/createProduct');
    //     }
    // })
    const model = {
        errors: null
      };
      
      model.category = await Category.find(
        {
          status: 1
        }
      ).lean();
    res.render('admin/createProduct', model);
}

//Create Product

const createProduct = async (req, res, next) => {
    
   
    //const{error} = valid(req.body);
   // if(error) return res.status(422).send(error.details[0].message);
    const pro = req.body;
    var product = new Product({
        name: pro.name,
        description: pro.description,
        details: pro.details,
        stock: pro.stock,
        price: pro.price,
        size: pro.size,
        color: pro.color,
        label: pro.label,
        sale: pro.sale,
        images: []
    });
    console.log(product);
    console.log(product._id);
    if (req.file && req.file.filename) {
        product.images = req.file.filename;
      }
      
      if (req.files && req.files.length > 0) {
        req.files.forEach(element => {
          product.images.push(element.filename);  
        });
        
      }
      console.log(product);
    product.save(function (err){
        if (err) {
            res.json({kq:0, "err": err});
        }else{
            
            //add category.product_id
            Category.findOneAndUpdate({_id: pro.selectCate}, {$push: {product_id:product._id}}, function (err){
                if (err) {
                    res.json({kq:0, "err": err});
                }else{
                    res.redirect('/admin/list-products');
                }
            });
        }
       
    });
    

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
