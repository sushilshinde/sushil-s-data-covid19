const express = require("express")
const app = express()
const bp = require("body-parser")
var path = require('path');
var serveStatic = require('serve-static')

app.use(bp.urlencoded({ extended: false }));
app.use(serveStatic(path.join(__dirname)));

app.use('/',(req,res) => {
    res.sendFile('index.html', { root: __dirname });
})


app.listen(3000,() => {
    console.log("server started...")
})