const url = require('url'),
      path = require('path');

const baseDirectory = process.cwd();

function urlPath(rawurl) {
  const {pathname} = url.parse(rawurl);
  console.log(pathname);
  const relPath = path.resolve(decodeURIComponent(pathname).slice(1));
  console.log(relPath);
  if(relPath != baseDirectory &&
      !relPath.startsWith(baseDirectory + path.sep)){
    throw {status: 403, body: "forbidden"}
  }
  return relPath
}

function pipeStream(from, to){
  return new Promise((resolve, reject)=>{
    from.on('error', reject);
    to.on("error", reject);
    to.on("finish", resolve);
    from.pipe(to);
  });
}

async function notAllowed(request){
  return {
    status: 405,
    body: `Method ${request.method} is not allowed\n`
  }
}

module.exports = {
  urlPath,
  pipeStream,
  notAllowed
}