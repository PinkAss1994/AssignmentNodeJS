var express = require('express');
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000);

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://xuantieu1:oJTpqqX0j4EpIeC7@cluster0.6wcnx.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true}, function(err){
    if (err) {
        console.log("mongodb connect error: " + err);
    }else{
        console.log("mongodb connected successfully");
    }
});

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