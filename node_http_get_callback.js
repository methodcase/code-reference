var express  =  require('express');
var app = express();	
var multer  = require('multer');
var router = require('./rest/router.js');

app.use(require('connect-livereload')());
app.use(express.static(__dirname));
app.use(multer({ dest: './uploads/'}))

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views'); //optional since express defaults to CWD/views

app.get('/', function(req, res){
	res.render('index.html')
});

app.get("/rest/show", function(req, res){

	var http = require('http');
	var options = {
	'hostname': 'api.reddit.com',
	'port': 80,
	'path': '/hot',
	'method': 'GET',
	'headers': {'user-agent': 'Mozilla/5.0'}
	}
	
	var callBack = function(d){
		d.data.children.map(function(a){
			res.send(a.data.title);
		});
	}

	http.get(options, function(res){
		console.log(res.statusCode)
		var body = '';
		res.on('data', function(chunk){
			body += chunk
		});
		res.on('end', function(){
			var info = JSON.parse(body);
			obj.callb(info)
		});
	}, callBack);
	
});

app.listen(3100); // express server
console.log("Server running at http://localhost:3100/");


	

	
	
