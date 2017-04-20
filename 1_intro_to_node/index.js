'use strict'

var http = require("http"), fs = require('fs'), qs = require("querystring");
let book = require("./book");

function serveStatic(res, path, contentType, responseCode){
  if(!responseCode) responseCode = 200;
  fs.readFile(__dirname + path, function(err, data){
      if(err){
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      }
      else{
        res.writeHead(responseCode, {'Content-Type': contentType});
        res.end(data);  }});}

http.createServer((req,res) => {
  let url = req.url.split("?");  // seperate route from query string
  let params = qs.parse(url[1]); // convert query string to object
  let path = url[0].toLowerCase();

  switch(path) {
    case '/': 
      serveStatic(res, '/public/home.html', 'text/html');
      break;
          
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('This is an about page. Please come back again soon for nothing.');
      break;
          
    case '/get':
      res.writeHead(200, {'Content-Type': 'text/plain'});
    let works = JSON.stringify(book.get(params.title));
      res.end('Results for your movie title search for ' + params.title + ":\n " + works);
        break;
  
    case '/delete':
      res.writeHead(200, {'Content-Type': 'text/plain'});
          
        let work = JSON.stringify(book.del(params.title));
      res.end('Your selection, ' + params.title + " has been deleted. The array count is now: " + work);
        break;
          
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404:Page not found.');
  }}).listen(process.env.PORT || 3000);
