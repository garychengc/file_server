const net = require("net");
const fs = require("fs");
const server = net.createServer();

server.listen(3000, () => {
  console.log("Server listening on port 3000!");
});

server.on("connection", client => {
  console.log("New client connected!");
  client.setEncoding("UTF8"); // interpret data as text
  client.write("Hello there!\nWhich file are you looking for?");

  client.on("data", data => {
    const filePath = data.slice(0, -1);

    fs.access(filePath, fs, err => {
      if (!err) {
        fs.readFile(filePath, (err, data) => {
          if (err) console.log(err);
          client.write(data);
        })
      } else {
        client.write("File Not Existing");
        return;
      }
    });
  });
});
