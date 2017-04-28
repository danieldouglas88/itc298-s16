'use strict'

let book = require("./lib/book.js");

const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views')); // allows direct navigation to static files
app.use(require("body-parser").urlencoded({extended: true})); // parse form submissions

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");

// send static file as response
app.get('/', function(req,res){
 res.type('text/html');
 res.sendFile(__dirname + '/public/home.html', {title: req.query.title});
});

// handle GET
app.get('/delete', function(req,res){
    let result = book.del(req.query.title); // delete book object
    res.render('delete', {title: req.query.title, result: result});
});

// handle POST
app.get('/get', function(req,res){
 let result = book.get(req.query.title);
 res.render('details', {title: req.query.title, result: result });
});

// handle CREATE
app.get('/create', function(req,res){
 let result = book.create(req.query.title, req.query.author, req.query.pubdate);
 res.render('create', {title: req.query.title, result: result, length: book.del("")});
});

// send plain text response
app.get('/about', function(req,res){
 res.type('text/plain');
 res .send('About page blah blah blah.');
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