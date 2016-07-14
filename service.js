const restify = require('restify');

const PORT = process.env.PORT || 8083;
const server = restify.createServer();

const shorten = (url) => 'Error: Not implemented yet';

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  next();
});

server.get('/:url', (req, res) => {
  const url = req.params.url;
  res.json({
    original_url: url,
    short_url: shorten(url)
  });
});

server.listen(PORT, () => console.log('url-komprimator listening on ' + PORT));
