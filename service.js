const express = require('express');

const PORT = process.env.PORT || 8083;
const server = express();

const httpRegexp = /^\/(http:\/\/www\.[\w]+\.com)$/;
const shortenedUrlRegexp = /^\/(\w+)$/;

const shorten = (url) => 'Error: Not implemented yet';

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

server.get(httpRegexp, (req, res) => {
  const url = req.params[0];
  res.json({
    original_url: url,
    short_url: shorten(url)
  });
});

server.get(shortenedUrlRegexp, (req, res) => {
  res.send('shortened urls soon coming to a location near you');
});

server.all('*', (req, res) => {
  res.send('invalid URL');
});

server.listen(PORT, () => console.log('url-komprimator listening on ' + PORT));
