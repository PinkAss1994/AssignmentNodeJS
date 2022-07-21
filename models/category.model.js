const mongoose = require("mongoose");
const Joi = require("joi");


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: true
    },
    product_id:[{type: mongoose.Schema.Types.ObjectId}],
    status: {
        type: Number,
        default: 1
}
});

const Category = mongoose.model('Category', categorySchema);

// const validateCategory = (category) => {
//     const schema = {
//         name: Joi.string().min(2).max(20).required()
//     }
//     return Joi.validate(category, schema);
// }

module.exports.Category = Category;
// module.exports.validate = validateCategory;

