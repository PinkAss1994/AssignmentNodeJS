const express = require('express');
const route = express.Router();
route.post('/register', (req, res, next)=>{
    res.send('function register')
})
route.post('/refresh-token', (req, res, next)=>{
    res.send('function refreshToken')
})

route.post('/login', (req, res, next)=>{
    res.send('function login')
})

route.post('/logout', (req, res, next) =>{
    res.send('function logout')
})
module.exports = route;