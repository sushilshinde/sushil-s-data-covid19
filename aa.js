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
  await res.forEach( async a => {

    const resonse = await axios.get('https://indian-cities-api-nocbegfhqg.now.sh/cities?State='+a)
    console.log('fetching cities for '+ a)
    db2.push({state:a,districts:resonse.data})
    
    /*.then((res) => {
      db2.push({state:a,districts:res.data})
    })*/
    //console.log(db2)
  })
  console.log(db2)
}).then(() => {
  console.log('last')
})


