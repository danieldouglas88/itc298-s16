const x = 5;
const names = ['sara','joe','dave','ann'];
const newArray = names.map( function(item) {
    names.push(x);
    return item.toUpperCase();
 }); 
    newArray();
