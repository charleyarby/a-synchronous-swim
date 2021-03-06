const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = require('./messageQueue');
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  //console.log('Serving request type ' + req.method + ' for url ' + req.url);

  if (req.method === 'OPTIONS') {

    res.writeHead(200, headers);
    res.end();
    next();
  }
  if (req.method === 'GET') {
    if(req.path === '/'){
    res.writeHead(200, headers);
    res.end(messageQueue.dequeue());
    next();
    }else if (req.url === '/background.jpg') {
      fs.readFile('./background.jpg', (err,data)=> {
        if(err){
          res.writeHead(404, headers);
          res.write(data,binary);
          next();
        } else {
          res.writeHead(200, headers)
          res.end();
          next();
        }
      })

    }
  }

  // if (req.method === 'GET') {

  //   next(); // invoke next() at the end of a request to help with testing!
  // }
};

