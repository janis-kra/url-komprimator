/* MongoDB Stuff */
const MongoClient = require('mongodb').MongoClient;
const randomstring = require('randomstring');

const mongoUrl = 'mongodb://localhost:27017/myproject';
let urls;

MongoClient.connect(mongoUrl, function(err, db) {
  if (!err) {
    console.log("Connected correctly to the MongoDB server");
    urls = db.collection('urls');
  }
});

/* Webservice Stuff */
const express = require('express');
const PORT = process.env.PORT || 8083;
const server = express();

const httpRegexp = /^\/(http:\/\/www\.[\w]+\.com)$/;
const shortenedUrlRegexp = /^\/(\w+)$/;

const shorten = () => randomstring.generate(6);

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

server.get(httpRegexp, (req, res) => {
  const url = {
    original_url: req.params[0],
    short_url: shorten()
  };
  urls.insert(url, function (err, result) {
    if (err) {
      res.error(err);
    } else {
      res.json(url);
    }
  });
});

server.get(shortenedUrlRegexp, (req, res) => {
  urls.find({ short_url: req.params[0] }).toArray((err, docs) => {
    if (docs && typeof docs[0] === 'object') {
      res.redirect(docs[0].original_url);
    } else {
      res.error(err || 'unknown error');
    }
  });
});

server.all('*', (req, res) => {
  res.send('invalid URL');
});

server.listen(PORT, () => console.log('url-komprimator listening on ' + PORT));
