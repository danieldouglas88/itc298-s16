'use strict'
var test = require('./test');
var express = require("express");
var app = express();
var Book = require("./models/datamodel"); // use database model

// configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + './views'));
app.use(require("body-parser").urlencoded({extended: true}));

// set template engine
let handlebars =  require("express-handlebars");
app.engine("handlebars", handlebars({extname: 'handlebars', defaultLayout: 'main' }));
app.set("view engine", "handlebars");

app.get('/', (req,res) => {
    Book.find((err,books) => {
        if (err) return next(err);
        res.render('home', {books: books, nav: '/about', whichPG: "About", whichPG2: "Home" }); 
    })
});

app.get('/about', (req,res) => {
    res.type('text/html');
    res.render('about',  {nav: '/', whichPG: "Home", whichPG2: "About"});
});

app.get('/get', (req,res) => {
    Book.findOne({ title:req.query.title}, (err, books) => {
        if (err) return next(err);
        res.type('text/html');
        res.render('details', {books: books, nav: '/', whichPG: "Home", whichPG2: "Details"} ); 
    });
});

app.get('/create', (req,res) => {
        Book.find((err,books) => {
    new Book({title:req.query.title, author: req.query.author, pubdate: req.query.pubdate}).save();
            res.type('text/html');
        res.render('create', {title: req.query.title, author: req.query.author, nav: '/', whichPG: "Home", whichPG2: "Create"} ); 
        });
});


app.get('/delete', (req,res) => {
    Book.remove({ title:req.query.title }, (err, result) => {
        if (err) return next(err);
        let deleted = result.result.n !== 0; // n will be 0 if no docs deleted
        Book.count((err, total) => {
            res.type('text/html');
            res.render('delete', {books: result, title: req.query.title, deleted: result.result.n !== 0, total: total, nav: '/', whichPG: "Home", whichPG2: "Deletion" } );    
        });
    });
});

app.use((req,res) => {
    res.type('text/plain'); 
    res.status(404);
    res.send('404 - Not found');
});

app.listen(app.get('port'), () => {
    console.log('Express started');    
});