var mongoose = require('mongoose');

//var connectionString = PLEASE SEE /credentials.js SUBMITTED VIA CANVAS, FOR VALUE. 
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
mongoose.connect(connectionString, options);

var mySchema = mongoose.Schema({
 title: { type: String, required: true },
 author: String,
 pubdate: Date,
}); 


module.exports = mongoose.model('Books', mySchema);



