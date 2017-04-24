var yargs = require("yargs");
var geocode = require("./geocode");
var weather = require("./weather");
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

geocode.getgeocode(argv.address,function(errMsg,results){
  if(errMsg){
    console.log(errMsg);
  }else {
    console.log(JSON.stringify(results,undefined,2));
    weather.getWeather(results.latitude,results.longitude, function(errorm , weatherResults){
      if(errorm){
        console.log(errorm);
      }else{
        console.log(JSON.stringify(weatherResults,undefined,2))
      }

    });
  }
});
