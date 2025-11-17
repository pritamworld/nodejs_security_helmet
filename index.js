const fs = require("fs");
const http = require("http");
const https = require("https");
const express = require("express")
const helmet = require("helmet")
const app = express();

app.use(helmet())

const HTTP_PORT = process.env.PORT || 3000;
const HTTPS_PORT = 4433;
const SECURE_ASSETS = "secure/";
//const SECURE2_ASSETS = "./secure/";
const SSL_KEY_FILE = SECURE_ASSETS + "server.key";
const SSL_CRT_FILE = SECURE_ASSETS + "server.crt";

console.log(__dirname + "/" + SSL_CRT_FILE, __dirname + "/" + SSL_KEY_FILE)

// read in the contents of the HTTPS certificate and key
const https_options = {
    key: fs.readFileSync(__dirname + "/" + SSL_KEY_FILE),
    cert: fs.readFileSync(__dirname + "/" + SSL_CRT_FILE)
};

// call this function after the https server starts listening for requests
function onHttpsStart() {
    console.log("Express https server listening on: " + HTTPS_PORT);
}

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.get("/", (req, res) => {
    res.send("<h1>Secure Website</h1>")
})

// listen on ports HTTP_PORT and HTTPS_PORT. The default port for http is 80, https is 443. We use 8080 and 4433 here
// because sometimes port 80 is in use by other applications on the machine and using port 443 requires admin access on osx
http.createServer(app).listen(HTTP_PORT, onHttpStart);
https.createServer(https_options, app).listen(HTTPS_PORT, onHttpsStart);