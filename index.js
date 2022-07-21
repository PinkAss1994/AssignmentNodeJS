const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const config = require('./startup/config');
const winston = require('winston');
const err = require('./middleware/errors');
const adminRoutes = require('./routes/admin.route');
const app = express();


require('./startup/db')();
require('./startup/logging')();
require('./startup/validations')();

app.use(expressLayouts);
app.set('layout', './admin/layout.ejs');
app.set('view engine', 'ejs');
app.set("views", "./views");
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(adminRoutes.routes);
app.use(err);

app.listen(config.port, () => winston.info('App is listening on url http://localhost:'+ config.port));
