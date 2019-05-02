const http = require('http'),
      {notAllowed} = require('./helpers'),
      methods = require('./methods');

http.createServer((request, response) => {
  let handler = methods[request.method] || notAllowed;
  handler(request)
    .catch(error => {
      if (error.status != null) return error;
      return {body: String(error), status: 500};
    })
    .then(({body, status = 200, type = "text/plain"})=>{
      response.writeHead(status, {"Content-type": type})
      if (body && body.pipe) body.pipe(response);
      else response.end(body);
    })
}).listen(8000);
