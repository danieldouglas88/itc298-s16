'use strict'

let books = [
    {title: "Thus Spoke Zarathustra", author:"Friedrich Nietzsche", pubdate:1881},
    {title: "Sein und Zeit", author:"Martin Heidegger", pubdate:1933},
    {title: "Being and Nothingness", author:"Jean-Paul Sartre", pubdate:1845}, 
{title: "Logicus Tractatus", author:"Ludwig Wittgenstein", pubdate:1955},
{title: "Peoples History of the USA", author:"Howard Zinn", pubdate:1966},
 {title: "Hegemony or Survival", author:"Noam Chomsky", pubdate:1999}];


exports.get = function (para) {
    
    for (let i in books) { 
    
        if (books[i].title == para) {
        
            return books[i]   } 
    }
}


exports.del = function (para) {
    
    for (let i in books) { 
        if (books[i].title == para) { 
            delete books[i]; 
            return para + 'has been deleted'; }
            
    }
}


exports.create = function(titl, auth, publ) {
  
    books.push({title: titl, author: auth, pubdate: publ}); 

        for (let i in books) { 
    
            if (books[i].title == titl) {
            
                return books[i]   } 
        }
}



exports.retFun = function() {
    return books; }

