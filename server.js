"use strict";

//assignment is in slack,
//two pieces are exactly like in class and one is a little bit trickier.

var http = require("http");

var server = http.createServer(function(req, res) {
   var pathArray = req.url.split("/");
   var enteredName = pathArray[pathArray.length - 1];

  if (req.url === "/greet") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    if (req.method === "POST") {
      req.on("data", function(data) {
        var body = JSON.parse(data.toString("utf-8"));
        res.write(JSON.stringify({ msg: "hello " + body.name }));
        res.end();
      });
    }

    // GREET BY NAME
  } else if (req.url === "/greet/" + enteredName) {
     res.writeHead(200, {
      "Content-Type": "application/json"
    });
     res.write(JSON.stringify({ msg: "hello " + enteredName }));
     res.end();

     // TIME GET REQUEST
   } else if (req.url === "/time") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });
    var date = new Date();
    var ISO = date.toISOString();
    res.end(JSON.stringify({ msg: ISO }));

   } else {
    res.writeHead(404, {
      "Content-Type": "application/json"
    });
    res.write(JSON.stringify({ msg: "404: Page not found." }));
    res.end();
  }
});

server.listen(3000, function() {
  console.log("server started");
});
