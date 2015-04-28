var http = require("http");
var url = require("url");
function init(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log('HTTPServer --> Petición ' + request.url);
    var data = "";
    //request.on("data", function(chunck) {
    //  data+=chunck;
    //});
    //request.on("end", function(){
      route(handle, pathname, data, response);
    //})
  }

    //var port=process.env.VCAP_APP_PORT || 8888;
    var port = process.env.PORT || 5000;
    http.createServer(onRequest).listen(port);
    console.log('HTTPServer --> Servidor iniciado en el puerto ' + port);

  //http.createServer(onRequest).listen(80);
}

exports.init = init;
