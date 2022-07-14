var express = require('express');
var app = express();
var path = require('path');
var cookieSession = require('cookie-session');
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "abc-session",
    secret: "COOKIE_SECRET",
    httpOnly: true
  })
);
app.listen(3000);

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://xuantieu1:X36gDxiO3Z9c0QPk@cluster0.6wcnx.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true}, function(err){
    if (err) {
        console.log("mongodb connect error: " + err);
    }else{
        console.log("mongodb connected successfully");
    }
});
const db = require("./models");
const Role = db.role;

app.get("/", function(req, res) {
    res.render("./client/home");
});
app.get("/admin", function(req, res) {
    res.render("./admin/login");
});
// const express = require('express');
// const app = express();
// const UserRoute = require('./Routes/User.route');
// const createError = require('http-errors');
// require('dotenv').config();

// app.get('/',(req, res, next) => {
//     res.send("Home Page")
// });

// app.use('/user', UserRoute);
// app.use((req, res ,next) => {
//     next(createError.NotFound('this route does not exist.'))
// });

// app.use((err, req, res, next) => {
//     res.json({ status: err.status || 500,
//     message: err.message})
// })

// const PORT = process.env.PORT ||3001;

// app.listen(PORT, ()=>{
//     console.log(`Server listening on ${PORT}`);
// });