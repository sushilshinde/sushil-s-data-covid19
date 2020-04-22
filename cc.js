const axios = require("axios");
const cheerio = require("cheerio");

db = [];

function getDistricts(state) {
  return [];
}

axios
  .get("https://en.wikipedia.org/wiki/India")
  .then((res) => {
    const $ = cheerio.load(res.data);
    const table = $(".wikitable");
    db = [];
    table.children().each((index, element) => {
      $(element)
        .find("tr > td > ul > li")
        .each((i, el) => {
          let state = $(el).text();
          state = state.substring(state.indexOf(".") + 1).trim();
          //let districts = getDistricts()
          db.push(state);
        });
    });
    //console.log(db);
    return db;
  })
  .then(async (res) => {
    db2 = [];
    res.forEach((a) => {
      db2.push(
        axios
          .get("https://en.wikipedia.org/wiki/List_of_districts_of_" + a)
          .catch((e) => {
            return null;
          })
      );
    });
    return axios.all(db2);
  })
  .then(
    axios.spread((...args) => {
      let states = [];
     // args.forEach((a) => {
        //console.log(a)
        let a = args[0]
        if (a && a.data) {
          let url = a.config.url
          let state = url.substring("https://en.wikipedia.org/wiki/List_of_districts_of_".length)
          const $ = cheerio.load(a.data);
          const table = $(".sortable");
          
          db = [];
          //console.log($.html())
          table.children().each((index, element) => {
            //console.log($(element).text())
            $(element)
              .find("tr")
              .each((i, el) => {
                const d = $(el).find('td')
                //let d = $(el).text();
                console.log(el)
                
                db.push(d);
              });
          });
        }
      //});
      //  console.log(JSON.stringify(states))
    })
  )
  .catch((e) => {
    console.error(e);
  });
