var express = require('express');
var app = express();
var media = __dirname + '/www';

app.configure(function() {
  app.use(express.logger({format: 'dev'}));
});

app.get('/', function (req, res) {
  // Simulate how github pages serves the static files.
  res.redirect('/chirpradio-owa/app.html');
});

// Serve static files such as /www/img/*, /www/manifest.webapp, etc.
app.configure(function() {
  app.use('/chirpradio-owa', express.static(media));
});


var host = process.env['HOST'] || '0.0.0.0';
var port = process.env['PORT'] || 3000;
app.listen(port, host);
console.log('Listening at ' + host + ':' + port);
