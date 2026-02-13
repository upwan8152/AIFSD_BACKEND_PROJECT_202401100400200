const http  = require('http');
const server = http.createServer((req,res)=>{
console.log("This is my first server");
res.end("Welcome!");
}
);
const port = 3000;
server.listen(port,()=>{console.log("Server Start");});

