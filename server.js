var express = require('express');

module.exports = function(){
  var app = express();

  app.get('/', function(req, res){
    res.send('Test');
  });

  app.get('/home', function(req, res){
    res.send('home');
  });

  return app;
};
