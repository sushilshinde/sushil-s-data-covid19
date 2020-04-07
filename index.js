const express = require("express")
const app = express()
const bp = require("body-parser")
var path = require('path');
var serveStatic = require('serve-static')

const request = require("request")
const cheerio = require("cheerio")
const mathjs = require("mathjs")


const axios = require('axios');

app.use(bp.urlencoded({ extended: false }));
app.use(serveStatic(path.join(__dirname)));

app.use('/v1/api/covid-data',(req,response) => {

    let db = []

    request('https://coronacount.in/',(e,res,page) =>{
        const $ = cheerio.load(page)
        const table = $("#statestable")
        table.children().each((index, element) => {
            $(element).find("tr").each((i, el) => {
                const state = $(el).find('td:nth-child(1)')
                const totalCases = $(el).find('td:nth-child(2)')
                const totalDeaths = $(el).find('td:nth-child(3)')
                const recovered = $(el).find('td:nth-child(4)')
                const acticeCases = $(el).find('td:nth-child(5)')
                db.push({
                    "state": $(state).text(),
                    "totalCases": $(totalCases).text(),
                    "totalDeaths":$(totalDeaths).text(),
                    "recovered":$(recovered).text(),
                    "acticeCases":$(acticeCases).text()
                })
            });

        });
        response.send(JSON.stringify(db));  
    })

})

app.use('/',(req,res) => {
    res.sendFile('index.html', { root: __dirname });
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});