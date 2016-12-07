var http = require("http");
var url = require("url");
var mu   = require('mu2');
var fs = require("fs");
var noticiasService = require('./services/noticias');
var server = http.createServer();

mu.root = __dirname + '/templates';

var page = {};

server.on("request", function(req, res) {
   var urlData = url.parse(req.url, true);
   var path = urlData.pathname;
   var pathInformation = path.split('.');
   
   if(path === '/' || pathInformation[pathInformation.length-1].length >= 4){
     //Work with mustache
      mu.clearCache();

      page.title = 'Curso - Dinamico';
      page.description = '';
      if(path === '/'){
        path = 'index';
      }
      if(path[0] == '/'){
        path = path.substr(1, path.length-1);
      }
      
      fs.exists('templates/'+path+'.html', function(exists) {
        if (exists) {
          
          var stream = mu.compileAndRender(path+'.html', {page: page, noticias: noticiasService.get()});
          stream.pipe(res);
        }else{
          res.writeHead(404);
          res.end("No existe!");
        }
      });
   }else{
     //Serve from /public
     var filePath = "public" + path;
      fs.exists(filePath, function(exists) {
        if (exists) {
          fs.readFile("public" + path, function(err, data) {
            if (err) {
              res.writeHead(500);
              res.end("Ha ocurrido algo malo");
            } else {
              res.end(data);
            }
          });
        } else {
          res.writeHead(404);
          res.end("No existe!");
        }
      });
   }

  
});

server.listen(process.env.PORT || 3001);
