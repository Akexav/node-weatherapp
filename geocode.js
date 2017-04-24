var request = require("request");

var getgeocode = function(address,callBack){
  var addressBit=encodeURIComponent(address);
  var urlBit = "https://maps.googleapis.com/maps/api/geocode/json?address="+addressBit;

  request({
    url : urlBit,
    json : true
  },function(error,response,body){
  if(error){
    callBack("something is wrong with the server");
  }else if(body.status === "ZERO_RESULTS"){
    callBack("entered address is incorrect");
  }else if(body.status === "OK"){
    callBack(undefined,{
      address:body.results[0].formatted_address,
      latitude:body.results[0].geometry.location.lat,
      longitude:body.results[0].geometry.location.lng
    });
  }});
}

module.exports={
  getgeocode
}
