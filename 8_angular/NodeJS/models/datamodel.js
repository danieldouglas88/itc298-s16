var mongoose = require('mongoose');

//var connectionString = PLEASE SEE CANVAS FOR VALUE. 

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } } };
mongoose.connect(connectionString, options);

var mySchema = mongoose.Schema({
 title: { type: String, required: true },
 author: String,
 pubdate: Date
}); 

var apiVar = module.exports = mongoose.model('Books', mySchema);

module.exports.getApi = (callback, limit) => {
	apiVar.find(callback).limit(limit); 
}

module.exports.getBookById = (id, callback) => {
	apiVar.findById(id, callback);
}



