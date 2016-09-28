var express = require('express');
var mongo = require('mongodb');

var Server = mongo.Server;
var Db = mongo.Db;
var ObjectId = mongo.ObjectID;

var server = new Server('127.0.0.1', 27017, {auto_reconnect : true} );
var db = new Db('ecommercedb' , server);

db.open(function(err, db){
	if(!err) {
		console.log('connected');
	}
});

var product = db.collection('product');


var app = express();
var bodyParser = require('body-parser'); 

app.use(express.static(__dirname));
app.use(bodyParser.json());

app.post('/product', function(req, res) {
	
	product.insert(req.body , function(err , doc) {
		res.json(doc);
	});

});

app.get('/product', function(req, res) {
	console.log('req.body===');
	product.find({}).toArray(function(error, documents) { 
	    res.send(documents);
	});

});

app.delete('/product/:id', function(req, res) {
	var id = req.params.id;
	console.log('delete id======='+id);
	product.deleteOne({'_id' : ObjectId(id)}, function(err, doc) {
		console.log('delete success=='+doc);
		res.send(doc);
	});
});

app.listen(3000);
