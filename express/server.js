'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

const router = express.Router();
router.get('/', (req, res) => {
    // ファイルを読み込んだら、コールバック関数を実行する。
   var data= fs.readFileSync('./index.html', 'utf-8'  );
    
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<p>aaa</p>");
        res.write(data);
        res.end();
  /*
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hello from Express.js!</h1>');
    res.end();
    */
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, './index.html')));

module.exports = app;
module.exports.handler = serverless(app);
