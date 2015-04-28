var ip = require("ip");
var requestNumber = 0;

// Sin configuración de caché en la cabecera
function noHeaders(request, response)  {
	response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8"});
    var respuesta = { header: jsonHeader("noHeaders", request), categories: service()};
    response.write(JSON.stringify(respuesta));
    response.end();
}

// Se añade a la cabecera "Cache-Control": "public, max-age=60, s-maxage=60"
function headerCacheControl(request, response) {
    response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8", "Cache-Control": "public, max-age=60, s-maxage=60"});
    var respuesta = { header: jsonHeader("Cache-Control", request), categories: service()};
    response.write(JSON.stringify(respuesta));
    response.end();
}

// Se añade a la cabecera: "Expires": fecha actual + 1 minuto.
function headerExpires(request, response) {
    var expires = new Date();
    expires.setTime(expires.getTime()+1000*60); // Chapu para añadir una hora
    response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8", "Expires": expires.toUTCString()});
    var respuesta = { header: jsonHeader("Expires", request), categories: service()};
    response.write(JSON.stringify(respuesta));
    response.end();
}

// Se añade a la cabecera "Surrogate-Control": "max-age=60"
function headerSurrogateControl(request, response) {
    response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8", "Surrogate-Control": "max-age=60"});
    var respuesta = { header: jsonHeader("Surrogate-Control", request), categories: service()};
    response.write(JSON.stringify(respuesta));
    response.end();
}

// Se añade a la cabecera "Surrogate-Control": "max-age=1800"
function longcache(request, response) {
    response.writeHead(200, {"Content-Type": "application/json;charset=UTF-8", "Surrogate-Control": "max-age=1800"});
    var respuesta = { header: jsonHeader("Surrogate-Control", request), categories: service()};
    response.write(JSON.stringify(respuesta));
    response.end();
}

function info(request, response) {
	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />'+
    '<title>Categories</title>'+
    '</head>'+
    '<body>'+
    '<h3>Aplicació de prova, per comprovar el funcionament de la memòria cau de l\'API UMBRELLA</h3>'+
    '<ul>'+
    '<li><a href="noheaders">Sense capçalera</a></li>'+
    '<li><a href="headercachecontrol">Capçalera amb Cache-Control</a></li>'+
    '<li><a href="headerexpires">Capçalera amb Expires</a></li>'+
    '<li><a href="headersurrogatecontrol">Capçalera amb Surrogate-Control</a></li>'+
    '<li><a href="longcache">Capçalera amb Surrogate-Control de 30 minuts</a></li>'+
    '</ul>'+
    '</body>'+
    '</html>';
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}
function jsonHeader(type, request) {
    return {host: ip.address(), type: type, time: new Date(), hit: requestNumber++};
}

function service() {
	var categories = [];
	categories.push({categoryId: "BIRDS", description: "Birds", name: "Birds"});
    categories.push({categoryId: "CATS", description: "Cats", name: "Cats"});
    categories.push({categoryId: "DOGS", description: "Dogs", name: "Dogs"});
    categories.push({categoryId: "FISH", description: "Fish", name: "Fish"});
    categories.push({categoryId: "REPTILES", description: "Reptiles", name: "Reptiles"});
	return categories;
}

exports.noHeaders = noHeaders;
exports.headerCacheControl = headerCacheControl;
exports.headerExpires = headerExpires;
exports.headerSurrogateControl = headerSurrogateControl;
exports.longcache = longcache;
exports.info = info;