const fsp = require('fs').promises,
      fs = require('fs'),
      mime = require('mime'),
      {urlPath, pipeStream} = require('./helpers'),
      methods = Object.create(null);

methods.GET = async function(request){
  let path = urlPath(request.url);
  let stats;
  try {
    stats = await fsp.stat(path);
  } catch (error) {
    if (error.code != "ENOENT") throw error;
    else return {status: 404, body: 'File Not Found'}
  }
  if(stats.isDirectory()){
    return {body: await (fsp.readdir(path)).join("\n")};
  } else {
    return {body: fs.createReadStream(path),
            type: mime}
  }
}

methods.DELETE = async function(request){
  let path = urlPath(request.url);
  let stats;
  try {
    stats = await fsp.stat(path);
  } catch (error) {
    if (error.code != "ENOENT") throw error;
    else return {status: 204}
  }
  if(stats.isDirectory()) await fsp.rmdir(path)
  else await fsp.unlink(path);
  return {status: 204};
}

methods.PUT = async function(request){
  let path = urlPath(request.url);
  await pipeStream(request, fs.createWriteStream(path))
  return {status: 204};
}

module.exports = methods;