const http = require('http');
const port = 8000;
const hostname = '127.0.0.1';
const whoami = 'root';

const server = http.createServer((req,res) => {
    res.end(`$ whoami\n$ ${whoami}`);
}) ;

server.listen(port, hostname, () => {
    console.log(`Currently listening on ${hostname}:${port}`);
})

