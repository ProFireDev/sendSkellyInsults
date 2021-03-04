const http = require("http");
const fs = require("fs");
const url = require("url");
const port = 8080

var sessions = {};

http.createServer((req, res) => {
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
