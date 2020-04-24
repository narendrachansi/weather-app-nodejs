const request = require('request');
const constant=require('../constant');

/****** Get Geocode details of specified address */
const geocode= (address,callback) => {
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibmFyZW5kcmFjaGFuc2kiLCJhIjoiY2s5YXY2aWdrMGg3ZTNoczIwaWJtaWFraiJ9.qZ273pDYxtc2kFqZyQ0eGg";
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect the url',response);
        }else{
            const placename=body.features[0].place_name;
            const latitude=body.features[0].geometry.coordinates[1];
            const longitude=body.features[0].geometry.coordinates[0];
            callback(error,{placename,longitude,latitude});
        }        
    });
}


module.exports=geocode;
