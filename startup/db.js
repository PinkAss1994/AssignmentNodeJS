const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () => {
    mongoose.connect('mongodb://localhost/shop',{
        useNewUrlParser: true
    }).then(() => winston.info('MongoDB connected successfully'));
}