var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// console.log('Hello World');
app.use(function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  // res.send('Hello Express');
  res.sendFile(`${__dirname}/views/index.html`);
});
app.get('/json', function(req, res) {
  const text = "Hello json";
  res.json({"message": process.env.MESSAGE_STYLE == 'uppercase' ? text.toUpperCase() : text});
});
app.get('/now',
  function(req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function(req, res) {
    res.json({time: req.time});
});
app.get('/:word/echo', function(req, res) {
    res.json({echo: req.params.word});``
});
app.route('/name')
  .get(function(req, res) {
    res.json({
      name: `${req.query.first} ${req.query.last}`
    });
  })
  .post(function (req, res) {
    res.json({
      name: `${req.body.first} ${req.body.last}`
    });
  });



module.exports = app;
