const axios = require("axios");
const cheerio = require("cheerio");

db = [];


function getDistricts(state){
   return []
}

axios.get("https://en.wikipedia.org/wiki/India").
then( (res) => {
  const $ = cheerio.load(res.data);
  const table = $(".wikitable");
  db = [];
  table.children().each((index, element) => {
    $(element)
      .find("tr > td > ul > li")
      .each((i, el) => {
        let state = $(el).text();
        state = state.substring(state.indexOf('.') + 1).trim()
        //let districts = getDistricts()
        db.push(state);
      });
  });
  //console.log(db);
  return db
}).then(async res => {
  db2 = []
  res.forEach( a => {
    db2.push(axios.get('https://indian-cities-api-nocbegfhqg.now.sh/cities?State='+a))
  })
  return axios.all(db2)
}).then(axios.spread((...args) => {
  let states = []
  args.forEach((a) => {
    let url = a.config.url;
    const state = url.substring(url.indexOf("=") + 1)
    states.push({state:state,districts:a.data})
  })
  console.log(JSON.stringify(states))
}))


