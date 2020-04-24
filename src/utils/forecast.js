const request = require('request');
const constant=require('../constant');

/****** Get weather details of specified address */
const forecast= (address,callback) => {
    const url="http://api.weatherstack.com/current?access_key="+constant.weatherstack_accesskey+"&query="+address;
    request({url,json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect weatherstack.com',response);
        }else if(body.error){
            callback('Invalid address',response);
        }else{
            const temperature=body.current.temperature;
            const feelslike=body.current.feelslike;
            callback(error,{temperature,feelslike});
        }
    });    
}

module.exports=forecast;
