'use strict';

var http =require('http');
var express=require('express');
var morgan =require('morgan');
var fs=require('fs');

var app =express();

var data=fs.readFileSync("./express/index.html", "utf-8");


app.use(morgan('combined'));

app.get("/",function(req,res){

    return res.send(data);
});


var server = http.createServer(app);
server.listen(3000);


/*
const app = require('./express/server');

app.listen(3000, () => console.log('Local app listening on port 3000!'));*/
