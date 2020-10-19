const express = require('express');
const app = express();
app.set("view engine","ejs");


app.use(express.static(__dirname+'/public'));
app.get('/',(req,res,next) => {
    res.render('index')
})
app.use('/chat',(req,res,next) => {
    res.render('chat',{ room: req.query.room,name:req.query.name })
})


module.exports = app;