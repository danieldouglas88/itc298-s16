'use strict'

let books = [
    {title: "dune", author:"frank herbert", pubdate:1969},
    {title: "it", author:"steven king", pubdate:1975},
    {title: "moby dick", author:"herman melville", pubdate:1869}, ];

exports.get = function (para) {
    
    for (let i in books) { 
    
        if (books[i].title == para) {
        
            return books[i]   }  } }


exports.del = function (para) {
    
    for (let i in books) { 
    
        if (books[i].title == para) {
        
            let index = books.indexOf(i);
            books.splice(index, 1);
            return books.length; } 
    else {
        return books.length;
    }} }


exports.create = function(titl, auth, publ) {
  
    books.push({title: titl, author: auth, pubdate: publ}); 

        for (let i in books) { 
    
        if (books[i].title == titl) {
        
            return books[i]   }  } } 

