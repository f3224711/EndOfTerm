var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var app = express();
var partials = require('express-partials');

app.set('port', process.env.PORT || 3000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser('123456789'));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/u/:user', routes.user);
app.post('/post', routes.post);
app.get('/reg', routes.reg);
app.post('/reg', routes.doReg);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/page2', routes.page2 );
app.get('/page3', routes.page3 );
app.get('/page4', routes.page4 );
app.get('/page5', routes.page5 );
app.get('/page6', routes.page6 );
app.get('/page7', routes.page7 );
app.get('/logout', routes.logout );

http.createServer(app).listen(app.get('port'), function( req, res ){ 
	console.log('Express server listening on port ' + app.get('port'));
});
