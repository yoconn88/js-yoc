// either const or var can be used:
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

console.log('__dirname (the directory of the script file): ', __dirname);
console.log('process.cwd() (the directory from which the script file was called): ', process.cwd());

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

