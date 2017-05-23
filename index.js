'use strict'

let book = require("./lib/book.js");

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars")
.create({ defaultLayout: "main"});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// send static file as response
app.get('/', function(req, res) { 
  res.render('home', {ret: book.retFun(), nav: '/about', whichPG: "About", whichPG2: "Home"  } ); 
});

// handle GET
app.get('/delete', function(req,res){
    let result = book.del(req.query.title); // delete book object
    res.render('delete', {title: req.query.title, result: result, nav: '/' , whichPG: "Home", whichPG2: "Delete" });
});

// handle POST
app.get('/get', function(req,res){
 let result = book.get(req.query.title);
 res.render('details', {title: req.query.title, result: result, nav: '/', whichPG: "Home", whichPG2: "Details" });
});

// handle CREATE
app.get('/create', function(req,res){
 let result = book.create(req.query.title, req.query.author, req.query.pubdate);
 res.render('create', {title: req.query.title, result: result, length: book.del(""), nav: '/', whichPG: "Home", whichPG2: "Create" });
});

// send about
app.get('/about', function(req,res){
 res.render('about', {nav: '/', whichPG: "Home", whichPG2: "About"});
});

// define 404 handler
app.use(function(req,res) {
 res.type('text/plain');
 res.status(404);
 res.send('404 - Not found');
});

app.listen(app.get('port'), function() {
 console.log('Express started');
});