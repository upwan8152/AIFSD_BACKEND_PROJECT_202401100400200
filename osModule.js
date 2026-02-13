const os = require('os');

console.log("Operating System:", os.platform());
console.log("CPU Architecture:", os.arch());
console.log("Total Memory:", os.totalmem());
console.log("Free Memory:", os.freemem());
console.log("Home Directory:", os.homedir());
console.log("Uptime (seconds):", os.uptime());
console.log("Number of CPUs:", os.cpus().length);
