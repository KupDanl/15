var http = require("http");
var fs = require("fs");

/*var file=fs.createWriteStream("demo.txt");
for(var i=0; i<=10; i++) {
    file.write("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis reiciendis recusandae, alias velit voluptate quis unde, vero rem repellat dicta, quae aliquid quod excepturi est nulla animi saepe asperiores! Fugit.");
};
file.end();*/

function fileWeight() {
	var stat = fs.statSync("demo.txt");
	var fileWeightMb = Math.floor(stat.size/1000000);
	return fileWeightMb;
}
var fileWeightV = fileWeight();
console.log("Weight of file: " + fileWeightV + "Mb");

http.createServer( function(req, res) {
	if (req.url === "/") {
	  fs.readFile("demo.txt", function(err, data) {
        res.write(data);
        res.end();
      });
	} else if (req.url === "/stream") {
        var stream=fs.createReadStream("demo.txt")
        stream.pipe(res);
    } else if (req.url === "/file") {
    	if (fileWeightV > 10) {
          console.log("It`s to much");
          res.end();
    	} else {
	      fs.readFile("demo.txt", function(err, data) {
            res.write(data);
            res.end();
          });
	    }
    }
}).listen(3000, function() {
    console.log("Server on localhost:3000");
});
