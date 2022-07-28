const {Category} = require('../models/category.model');
const{Product} = require('../models/product.model');

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
    const data = req.body;
    let category = await new Category({
        name: data.name,
        status: data.status
    });

    category = await category.save();
    res.redirect('/admin/category-list')
}

// Manage Products

//Get all Products

const getAllProduct = async(req, res, next) => {
  let page = req.query.page || 1;
  let ITEM_PER_PAGE = 12;
    Product.find()
    .skip((page -1) * ITEM_PER_PAGE)
    .limit(ITEM_PER_PAGE)
    .exec((err, product) => {
      Product.countDocuments((err, count) => {
        totalItems = count;
        if (err) return next(err);
        res.render('admin/products', {
          product,
          currentPage: page,
          hasNextPage: ITEM_PER_PAGE * page < count,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: Math.ceil(count / ITEM_PER_PAGE),
          ITEM_PER_PAGE: ITEM_PER_PAGE,
        });
    });
  });
    // res.render('admin/products',{
    //     product: listProduct
    // });
}

//Get Add Product View

const getAddProductView = async(req, res, next) => {
   
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
//Get Update Product View

const getUpdateProductView = async(req, res, next) => {
     try{
        let model = {
            errors: null
          };
        
          model.category = await Category.find(
            {
              status:1
            }
          ).lean();
        const id = req.params.id;
          model.product = await Product.findById(id).exec();
        
          res.render('admin/updateProduct', model);
    }catch(error){
     res.status(400).send(error.message);
    }
// try{
//     const id = req.params.id;
//     const oneProduct = await Product.findById(id).exec();
//     const categoryList = await Category.find({
//         status:1
//     });
//     res.render('admin/updateProduct',{
//         prod : oneProduct,
//         cate: categoryList
//     });

// } catch(error){
//     res.status(400).send(error.message);
// }
}
//Create Product

const createProduct = async (req, res, next) => {
    
   
    //const{error} = valid(req.body);
   // if(error) return res.status(422).send(error.details[0].message);
    const pro = req.body;
    var product = new Product({
        name: pro.name,
        category_id: pro.selectCate,
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
    product.save();
    res.redirect('list-products');
    

}

//Update product

const updateProduct = async (req, res, next) => {
    let lstCategory = await Category.find(
        {
               status: 1
             }
           ).lean();
    const data = req.body;

    let dataBody = {
        name:data.name,
        category_id: data.selectCate,
        description:data.description,
        details:data.details,
        stock:data.stock,
        price:data.price,
        size: data.size,
        color: data.color,
        label: data.label,
        sale: data.sale,
        ...(typeof(req.file)!=="undefined" && {
            images: {
              url: req.file.path,
              filename: req.file.filename,
            }
          }),
      };
     
       let category = lstCategory;
      let newData = {
        ...dataBody
      }
      console.log(newData);
      const product = await Product.findByIdAndUpdate(
        req.params.id,           
        { $set: newData },
        { new: true }
      );
      try{
      console.log(product, "abcaaaaaaaaaa");
      res.redirect('/admin/list-products')
     // await producto.save()
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un Error");
    }
   

}
const deleteProduct =async (req, res, next) => {
  try{
    const id = req.params.id;
    const product = await Product.findByIdAndRemove(id);
    if(!product) return res.status(404).send('product with given id not found!');
  res.redirect('/admin/list-products');
  }catch(error){
    res.status(404).send(error.message);
  }
}

module.exports = {
    getDashBoard,
    getAllCategory,
    getAddCategoryView,
    createCate,
    createProduct,
    getAddProductView,
    getAllProduct,
    getUpdateProductView,
    updateProduct,
    deleteProduct
}
