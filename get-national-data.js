const request = require("request");
const cheerio = require("cheerio");

db = [];


function getDistricts(state){
   
}

request("https://en.wikipedia.org/wiki/India", async (e, res, page) => {
  const $ = cheerio.load(page);
  const table = $(".wikitable");
  db = [];
  table.children().each((index, element) => {
    $(element)
      .find("tr > td > ul > li")
      .each((i, el) => {
        let state = $(el).text();
        state = state.substring(state.indexOf('.') + 1).trim()
        let districts = await getDistricts()
        db.push(state);
      });
  });
  console.log(db);
});


