var http_server = require("./http-server");
var router = require("./router");
var requestHandler = require("./requestHandler");

var handler = {};
handler["/noheaders"] = requestHandler.noHeaders;
handler["/headercachecontrol"] = requestHandler.headerCacheControl;
handler["/headerexpires"] = requestHandler.headerExpires;
handler["/headersurrogatecontrol"] = requestHandler.headerSurrogateControl;
handler["/longcache"] = requestHandler.longcache;
handler["/"] = requestHandler.info;

http_server.init(router.route, handler);
