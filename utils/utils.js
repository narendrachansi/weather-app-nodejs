const request = require('request');
const constant=require('../constant');

/****** Get Geocode details of specified address */
const getGeocode= (address,callback) => {
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibmFyZW5kcmFjaGFuc2kiLCJhIjoiY2s5YXY2aWdrMGg3ZTNoczIwaWJtaWFraiJ9.qZ273pDYxtc2kFqZyQ0eGg";
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect the url',response);
        }else{
            const placename=response.body.features[0].place_name;
            const latitude=response.body.features[0].geometry.coordinates[0];
            const longitude=response.body.features[0].geometry.coordinates[1];
            callback(error,{placename:placename,longitude:longitude,latitude:latitude});
        }        
    });
}

/****** Get weather details of specified address */
const getWeather= (address,callback) => {
    const url="http://api.weatherstack.com/current?access_key="+constant.weatherstack_accesskey+"&query="+address;
    request({url:url,json:true}, (error,response)=>{
        if(error){
            callback('Unable to connect weatherstack.com',response);
        }else if(response.body.error){
            callback('Invalid address',response);
        }else{
            const temperature=response.body.current.temperature;
            const feelslike=response.body.current.feelslike;
            callback(error,{temperature:temperature,feelslike:feelslike});
        }
    });    
}

module.exports={
    getWeather,
    getGeocode
}
