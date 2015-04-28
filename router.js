function route(handle, pathname, request, response) {
	console.log("Router --> Petición para " + pathname + " recibida.");
	if(typeof handle[pathname] === 'function') {
		//return 
		setTimeout(function() {handle[pathname](request, response);}, 500);
	} else {
		console.log("Router --> No se encontro manipulador para " + pathname);
		response.writeHead(404, {"Content-Type": "text/html"});
    	response.write("404 No Encontrado");
    	response.end();
	}
}

exports.route = route;