const fs = require("fs");

try {
    const data = fs.readFileSync("data.txt", "utf8");

    console.log("File content:");
    console.log(data); 

    // Optional debug
    console.log("Characters read:", data.length);
} catch (err) {
    console.log("Error:", err.message);
}

console.log("After file reading, this will run");
console.log("2nd this will run");
console.log("3rd this will run");