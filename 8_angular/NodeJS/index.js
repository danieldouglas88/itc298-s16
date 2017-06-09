'use strict'

let express = require("express");
let bodyParser = require("body-parser");
let Book = require("./models/datamodel"); // use database model

let app = express();

// configure Express app
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/../public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.log(err);
});

// set template engine
let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html', defaultLayout: 'main' }));
app.set("view engine", ".html");

app.get('/', (req,res) => {
    Book.find((err,books) => {
        if (err) return next(err);
        res.render('../home', {books: JSON.stringify(books), whichPG2: "Home", whichPG: "About", nav:'/about'}); 
    })
});

app.get('/api/books', (req, res) => {
	Book.getApi((err, books) => {
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.get('/api/books/delete/:id', (req,res) => {
    Book.remove({"_id":req.params.id }, (err, result) => {
        if (err) return next(err);
        // return # of items deleted
        res.json({"deleted": result.result.n});
    });
});

app.get('/api/books/:_id', (req, res) => {
	Book.getBookById(req.params._id, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.post('/api/books/create/', (req,res, next) => {
  if (!req.body._id) { // insert new document
        let book = new Book({title:req.body.title,author:req.body.author,pubdate:req.body.pubdate});
        book.save((err,newBook) => {
            if (err) return next(err);
            console.log(newBook)
            res.json({updated: 0, _id: newBook._id});
        });
    } else { // update existing document
        Book.updateOne({ _id: req.body._id}, {title:req.body.title, author: req.body.author, pubdate: req.body.pubdate }, (err, result) => {
            if (err) return next(err);
            res.json({updated: result.nModified, _id: req.body._id});
        });
    }
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