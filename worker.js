const request = require("request")
const cheerio = require("cheerio")
const mathjs = require("mathjs")
let db = []

request('https://coronacount.in/',(e,res,page) =>{
    const $ = cheerio.load(page)
    const table = $("#statestable")
    
    table.children().each((index, element) => {
        //console.log("***");
        $(element).find("tr").each((i, el) => {
            //console.log("---");
            const state = $(el).find('td:nth-child(1)')
            const totalCases = $(el).find('td:nth-child(2)')
            const totalDeaths = $(el).find('td:nth-child(3)')
            const recovered = $(el).find('td:nth-child(4)')
            const acticeCases = $(el).find('td:nth-child(5)')
           
            //console.log($(one).text(),$(two).text(),$(three).text(),$(four).text(),$(five).text())//,two,three)

            db.push({
                "state": $(state).text(),
                "totalCases": $(totalCases).text(),
                "totalDeaths":$(totalDeaths).text(),
                "recovered":$(recovered).text(),
                "acticeCases":$(acticeCases).text()
            })
        });
        
      });
      console.log(db)
})