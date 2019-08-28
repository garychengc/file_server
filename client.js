const net = require("net");
const fs = require("fs");
const stdin = process.stdin;

const client = net.createConnection({
  host: "Localhost",
  port: 3000
});

client.setEncoding("utf8");

stdin.on("data", function(data) {
  client.write(data);
  let filename = data;
  
  client.on("data", function(data) {
    fs.writeFile(filename, data, err => {
      if (err) console.log(err);
      console.log("Successfully Written to File.");
    });
  });
});

client.on("data", function(data) {
  console.log(data);
});
