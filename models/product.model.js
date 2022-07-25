const mongoose = require("mongoose");
const Joi = require("joi");


const productSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true
    },
    category_id:{
        type: String
    },
    description:{
        type: String,
        required: false,
        default: "Beryl Cook is one of Britains most talented and amusing artists .Beryls pictures feature women of all shapes and sizes enjoying themselves .Born between the two world wars, Beryl Cook eventually left Kendrick School in Reading at the age of 15, where she went to secretarial school and then into an insurance office. After moving to London and then Hampton, she eventually married her next door neighbour from Reading, John Cook. He was an officer in the Merchant Navy and after he left the sea in 1956, they bought a pub for a year before John took a job in Southern Rhodesia with a motor company. Beryl bought their young son a box of watercolours, and when showing him how to use it, she decided that she herself quite enjoyed painting. John subsequently bought her a childs painting set for her birthday and it was with this that she produced her first significant work, a half-length portrait of a dark-skinned lady with a vacant expression and large drooping breasts. It was aptly named Hangover by Beryls husband andIt is often frustrating to attempt to plan meals that are designed for one. Despite this fact, we are seeing more and more recipe books and Internet websites that are dedicated to the act of cooking for one. Divorce and the death of spouses or grown children leaving for college are all reasons that someone accustomed to cooking for more than one would suddenly need to learn how to adjust all the cooking practices utilized before into a streamlined plan of cooking that is more efficient for one person creating less"
    },
    details:{
        type: String,
        required: false,
        default: "Updating..."
    },
    stock:{
        type: Number,
        required: false,
        default: 0
    },
    price:{
        type: Number,
        required: false,
        default: 0
    },
    size:{
        type: [String],
        required: true
    },
    productType:{
        main: String,
        sub: String
    },
    color:{
        type: String,
        required: false
    },
    images:{
        type: [String],
        required: true
    },
    createAt:{
        type: Date,
        required: false,
        default: Date.now
    },
    label:{
        type: String,
        required: false,
        default: "updating"
    },
    sale:{
        type: Number,
        required: false,
        default: 0
    },
    buyCount:{
        type: Number,
        required: false,
        default: 0
    },
    status:{
        type: Number,
        default: 1
    }


});

const Product = mongoose.model('Product', productSchema);

// const validateProduct = (product) => {
//     const schema = {
//         name: Joi.string().required(),
//         size: Joi.array().items(Joi.string()).required(),
//         color: Joi.string(),
//         description: Joi.string(),
//         details: Joi.string(),
//         stock: Joi.number(),
//         price: Joi.number(),
//         size: Joi.array().items(Joi.string()).required(),
//         images: Joi.array().items(Joi.string()),
//         sale: Joi.number(),
//         label: Joi.string(),
//         selectCate: Joi.string()
        



//     }
//     return Joi.validate(product, schema);
// }

module.exports.Product = Product;
//module.exports.valid = validateProduct;