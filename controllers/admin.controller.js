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
    // const lstCategory = await Category.find(
    //     {
    //       status: 1
    //     }
    //   ).lean();
    
    //   const docProduct = await Product.findOne(
    //     {
    //       id: req.params.id
    //     }
    //   ).lean();
    
    //   if (!docProduct || !docProduct.id) {
    //     return res.render('admin/updateProduct', {
    //       errors: [
    //         {
    //           msg: 'Ivalid Id'
    //         }
    //       ],
    //       category: lstCategory
    //     });
    //   }
    
    //   const errors = req.validationErrors();
    
    //   if (errors) {
    //     return res.render('admin/updateProduct', {
    //       errors,
    //       category: lstCategory,
    //       product: docProduct
    //     });
    //   }

    //   const updateData = {
    //     name: req.body.name,
    //     category_id: req.body.categoryId,
    //     description: req.body.description,
    //     price: req.body.price,
    //     sale: req.body.sale,
    //     size: req.body.size,
    //     details:req.body.details,
    //     stock: req.body.stock,
    //     label: req.body.label,
    //     color: req.body.color,
    //     images: []
    //   };
    
    //   if (!req.file || !req.file.filename) {
    //     updateData.images = docProduct.images;
    //   }
    //   else {
    //     updateData.images = req.file.filename;
    //   } 
      
    //   await Product.update(
    //     {
    //       id: docProduct.id
    //     },
    //     updateData
    //   );
    //   res.redirect('/admin/list-products');
// const id = req.params.id;
// const data = req.body;
// const lstCategory = await Category.find(
//         {
//           status: 1
//        }
//      ).lean();
//      category = lstCategory;
// var product = Product.findOneAndUpdate(id,{
// name:data.name,
// category_id: data.selectCate,
// description:data.description,
// details:data.details,
// stock:data.stock,
// price:data.price,
// size: data.size,
// color: data.color,
// label: data.label,
// sale: data.sale,
// ...(typeof(req.file)!=="undefined" && {
//     images: {
//       url: req.file.path,
//       filename: req.file.filename,
//     }
//   }),
// }, {new:true});

// if(!req.file || !req.file.filename){
//     data.images = product.images;
// }
// else{
//     data.images = req.file.filename;
// }
// if(!product) return res.status(404).send('product with the given id not found');
// res.redirect('/admin/list-products');
// console.log(product);

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
    updateProduct
}
