var request = require("request");


function getWeather(lat,lng,callback){

request({
  url : "https://api.darksky.net/forecast/e8136a098a2cfd9c2d503345517bfdd4/"+lat+","+lng,
  json :true
},function(error , response ,body){
  if(!error&&response.statusCode === 200){
  callback(undefined,{
    temperature:body.currently.temperature,
    apparentTemp:body.currently.apparentTemperature
  });
}
  else{
    callback("Unable to fetch data...something is not right");
  }
})
}


module.exports = {
  getWeather
}
