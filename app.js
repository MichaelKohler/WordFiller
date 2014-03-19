(function () {
  'use strict';

  var express = require('express');
  var server = express();

  server.configure(function () {
    server.set('port', 1337);
    server.set('publicfolder', 'public');
    server.use('/bootstrap', express.static(server.get('publicfolder') + '/bootstrap'));
    server.use('/css', express.static(server.get('publicfolder') + '/css'));
    server.use('/js', express.static(server.get('publicfolder') + '/js'));
    server.set('view engine', 'jade');
    server.set('views', __dirname + '/views');
    server.set('view options', { layout: false });
    server.use(express.bodyParser());
    server.use(express.cookieParser('' + require('crypto').randomBytes(64) + ''));
    server.use(express.session());
  });

  server.configure('development', function () {
    server.use(express.logger('dev'));
  });

  server.listen(server.get('port'), function () {
    console.log('Server started on Port ' + server.get('port'));
  });

  /** ROUTES **/
  var documentRoutes = require('./routes/document.js');
  server.post('/fillinDocument', documentRoutes.fillDocumentWithProperties);
  server.get('/documentOverview', documentRoutes.documentOverview);
  var mainsiteRoutes = require('./routes/mainsite.js');
  server.get('/', mainsiteRoutes.index);
}());