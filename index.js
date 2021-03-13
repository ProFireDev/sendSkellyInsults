const http = require("http");
const fs = require("fs");
const socketio = require('socket.io');
const port = 8005


var server = http.createServer((req, res) => {
	if(req.method != "POST") {	
		responseCode = 200;
		content = fs.readFileSync("./index.html");
		res.writeHead(responseCode, {
			"content-type": "text/html;charset=utf-8",
		});
		res.write(content);
		res.end();
	} else {
		//console.log(req);
		if(req.url == "/sendNotification") {
			let body = "";
			req.on("data", chunk => {
				body += chunk.toString(); // convert Buffer to string
			});
			req.on("end", () => {
                let seperator = /\+/g
                console.log(body.split("=")[1].replace(seperator, " "));
				help(body.split("=")[1].replace(seperator, " "))
				res.end("sendNotification h");
			});
		}
		
		if(req.url == "/get") {
			
			let body = "";
			req.on("data", chunk => {
				body += chunk.toString(); // convert Buffer to string
			});
			req.on("end", () => {
                res.end("get h");
            });
		} else {
			//if statement here
		}
	}
})
.listen(port);
const io = socketio(server)
io.on("connection", function (socket) {
	console.log("Made socket connection");
	socket.on("help", function (data) {
		console.log(data)
	  });
});

function help(data) {
	io.emit("sendnotif", data)
}
  
