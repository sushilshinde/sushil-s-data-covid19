const express = require("express")
const app = express()
const bp = require("body-parser")
var path = require('path');

app.use(bp.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'html')));

app.use('/',(req,res) => {
    res.sendFile('index.html', { root: __dirname });
})


app.listen(5000,() => {
    console.log("server started...")
})