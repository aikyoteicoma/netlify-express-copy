'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const displayFile = async (file) => {
  try{
    const buff = await fs.readfilesync(file, "utf-8");
    console.log(buff);
  }
  catch(e){
    console.log(e.message);
  }
};
const data= displayFile(path.join(__dirname, 'index.html'));
const router = express.Router();
router.get('/', (req, res) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        console.log("typeof::",typeof data);
        var lines = data.toString();
        console.log("typeof::",typeof lines);
        res.write(lines);
        res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
