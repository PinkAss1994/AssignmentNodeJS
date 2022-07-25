const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const bodyParser = require('body-parser');
const config = require('./startup/config');
const winston = require('winston');
const err = require('./middleware/errors');
const adminRoutes = require('./routes/admin.route');
const clientRoutes = require('./routes/shop-route');
const Cart = require('./models/cart');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();


require('./startup/db')();
require('./startup/logging')();
require('./startup/validations')();

app.use(expressLayouts);
app.set('layout','layouts/client', 'layouts/products-page');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use((req, res, next) => {
//     var cart = new Cart(req.session.cart ? req.session.cart : {});
//     req.session.cart = cart;
//     res.locals.session = req.session;
//     next();
//   });

app.use(adminRoutes.routes);
app.use(clientRoutes.routes);
// error handler
// app.use(function(err, req, res, next) {
//     var cartProduct;
//     if (!req.session.cart) {
//       cartProduct = null;
//     } else {
//       var cart = new Cart(req.session.cart);
//       cartProduct = cart.generateArray();
//     }
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
  
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error', { cartProduct: cartProduct });
//   });
app.use(err);

app.listen(config.port, () => winston.info('App is listening on url http://localhost:'+ config.port));

module.exports = app;