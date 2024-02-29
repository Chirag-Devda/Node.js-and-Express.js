// this is basic way to create server
/*
const http = require("node:http"); // require is used to import the server module to create server

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html"); //Content-Type decide white type of output will show in these html output will shows
  res.end("<h1>Hello World </h1>");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/

// Type in pacakage.json
// there Two types module system in node.js (common.js and module)

// Node.js uses the CommonJS module system by default, which means you can import and export modules using the require() and module.exports
// And
// ES modules use the import and export keywords to load and export modules3. You can enable ES modules in Node.js by adding "type": "module" to your package.json file.
