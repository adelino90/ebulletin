var http = require('http');
const fileUpload = require('express-fileupload');
var  iniparser = require('iniparser');
var path = require('path');
var bodyParser = require('body-parser');
var sql = require('mssql'); 
var session = require('express-session');
var routes = require('./routes/index');
var fs = require('fs');
 var express= require('express');
 var app = express();
 app.setMaxListeners(0);
 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(fileUpload());
app.use(session({secret: 'ssshhhhh'}));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// dynamically include routes (Controller)

fs.readdirSync('./routes').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./routes/' + file);
      route.controller(app);
  }
});
/*
app.post('/delete_post',routes.post_delete);//
app.post('/login', routes.login);//
app.post('/upload',routes.upload);//
app.get('/get_dashboard',routes.get_dashboard);//

app.get('/logout', routes.logout);//
app.get('/file', routes.file);//
app.get('/', routes.index);//
app.get('/getsession', routes.session);//
app.get('/getadminsession',routes.adminsession);//
app.get('/getnav',routes.getnav);//
app.get('/contacts',routes.contact);//
app.get('/manage_posts',routes.get_admin_post);//
*/



var server = http.createServer(app).listen(3000, function() {
	console.log('App started on port ' + 3000);
});
//added a comment