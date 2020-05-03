'use strict';
const https = require('https');
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const displayFile = async (file) => {
  try{
    const buff = await fs.readFile(file, "utf-8");
    return buff;
  }
  catch(e){
    console.log(e.message);
  }
};


const data= displayFile(path.join(__dirname, './index.html'));


const router = express.Router();
app.get('/', (req, res) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        console.log("typeof::",typeof data);
        var lines=data.toString();
  Object.keys(data).forEach(function (key) {
  lines +=key + "::" + obj[key] + "<bt>";
});

        res.write(lines);
        res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));
/*
app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

*/

var server = https.createServer(app);
module.exports = server;
//module.exports.handler = serverless(app);
