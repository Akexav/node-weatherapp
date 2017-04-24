var yargs =require ("yargs");
var axios = require("axios");
var argv = yargs.option(
  {
    a:{
      demand:true,
      alias:"address",
      describe:"address to fetch wether for",
      string:true
    }
  }
)
.help()
.alias("help","h")
.argv;


var addressBit=encodeURIComponent(argv.address);
var urlBit = "https://maps.googleapis.com/maps/api/geocode/json?address="+addressBit;

axios.get(urlBit).then((response)=>{
  if(response.data.status === "ZERO_RESULTS"){
    throw new Error("unable to find the address");
  }

var lat = response.data.results[0].geometry.location.lat;
var lng = response.data.results[0].geometry.location.lng;
var weatherUrl = "https://api.darksky.net/forecast/e8136a098a2cfd9c2d503345517bfdd4/"+lat+","+lng;
console.log(response.data.results[0].formatted_address);
return axios.get(weatherUrl);


}).then((response)=>{
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(temperature);
  console.log(apparentTemperature);
})
.catch((e)=>{
  if(e.code==="ENOTFOUND"){
    console.log("cannot coonect to API servers");
  }else{
    console.log(e.message);
  }
})
