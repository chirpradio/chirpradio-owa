var express = require('express');
var app = express();

app.configure(function() {
  app.use(express.logger({format: 'dev'}));
});

// Serve static files such as /www/img/*, /www/manifest.webapp, etc.
app.configure(function() {
  app.use(express.static(__dirname));
});


var host = process.env['HOST'] || '0.0.0.0';
var port = process.env['PORT'] || 3000;
app.listen(port, host);
console.log('Listening at ' + host + ':' + port);
