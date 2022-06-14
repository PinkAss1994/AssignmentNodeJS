const express = require('express');
const app = express();
const UserRoute = require('./Routes/User.route');
const createError = require('http-errors');
require('dotenv').config();

app.get('/',(req, res, next) => {
    res.send("Home Page")
});

app.use('/user', UserRoute);
app.use((req, res ,next) => {
    next(createError.NotFound('this route does not exist.'))
});

app.use((err, req, res, next) => {
    res.json({ status: err.status || 500,
    message: err.message})
})

const PORT = process.env.PORT ||3001;

app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`);
});