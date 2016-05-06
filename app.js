var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
var payment = require('./routes/payment');

/** from www **/
var debug = require('debug')('untitled10:server');
var http = require('http');
/** from www **/

var app = express();

var cors = require('cors');

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/payment', routes);
app.use('/', payment);


/** WWW manual import  **/
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);



var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/** IO socket part **/
//var io = require('socket.io')(server);

var io = require('socket.io')(server, { origins: '*:*' });


io.on('connection', function(socket){
});



app.post('/successPage/:soid', function (req, res, next) {
  var result = req.body;
  result.merchant_id = "";
  result.signature = "";
  result.response_signature_string = "";

  io.sockets.in("/#" + req.params.soid).emit('servRespond', result); //it works

  res.render('payOverHandler', {title: JSON.stringify(result)});
});
/** IO socket part **/

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
/** WWW manual import  **/


