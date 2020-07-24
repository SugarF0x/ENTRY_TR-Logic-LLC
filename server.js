// const http = require('http');
// const fs = require('fs');
// const httpPort = 80;
//
// http.createServer((req, res) => {
//   fs.readFile('./dist/' + req.url, (err, data) => {
//     if (!err) {
//       let dotoffset = req.url.lastIndexOf('.');
//       let mimetype = dotoffset === -1
//         ? 'text/plain'
//         : {
//           '.html' : 'text/html; charset=utf-8',
//           '.png'  : 'image/png',
//           '.css'  : 'text/css',
//           '.js'   : 'text/javascript'
//         }[ req.url.substr(dotoffset) ];
//       res.setHeader('Content-type' , mimetype);
//       res.end(data);
//     } else {
//       fs.readFile('./dist/index.html', 'utf-8', (err, content) => {
//         if (err) {
//           console.log('We cannot open "index.html" file.')
//         }
//         res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
//         res.end(content)
//       })
//     }
//   });
// }).listen(httpPort, () => {
//   console.log('Server listening on: http://localhost:%s', httpPort)
// });

let path = require('path');
let http = require('http');
let fs = require('fs');

let dir = path.join(__dirname, 'dist');

let mime = {
  html: 'text/html',
  css: 'text/css',
  png: 'image/png',
  js: 'application/javascript'
};

http.createServer((req, res) => {
  let reqpath = req.url.toString().split('?')[0];
  if (req.method !== 'GET') {
    res.statusCode = 501;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('Method not implemented');
  }
  let file = path.join(dir, reqpath.replace(/\/$/, '/index.html'));
  if (file.indexOf(dir + path.sep) !== 0) {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('Forbidden');
  }
  let type = mime[path.extname(file).slice(1)] || 'text/plain';
  let s = fs.createReadStream(file);
  s.on('open', () => {
    res.setHeader('Content-Type', type);
    s.pipe(res);
  });
  s.on('error', () => {
    fs.readFile('./dist/index.html', 'utf-8', (err, content) => {
      if (err) {
        console.log('We cannot open "index.html" file.')
      }
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(content)
    })
  });
}).listen(80, () => {

});