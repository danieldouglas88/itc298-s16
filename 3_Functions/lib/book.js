'use strict'

var books = [
    {title: "dune", author:"frank herbert", pubdate:1969},
    {title: "it", author:"steven king", pubdate:1975},
    {title: "moby dick", author:"herman melville", pubdate:1869}, ];

exports.get = function (para) {
    
    for (var i in books) { 
    
        if (books[i].title == para) {
        
            return books[i]   }  } }


exports.del = function (para) {
    
    for (var i in books) { 
    
        if (books[i].title == para) {
        
            var index = books.indexOf(i);
            books.splice(index, 1);
            return books.length; }  } }
