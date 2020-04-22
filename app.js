const request = require('request');
const constant=require('./constant');
const url="http://api.weatherstack.com/current?access_key="+constant.weatherstack_accesskey+"&query=hurstville";
request({url:url,json:true}, (error,response)=>{
    if(error){
        console.log('Unable to connect weatherstack.com');
    }else if(response.body.error){
        console.log('Invalid address');
    }else{
        const temperature=response.body.current.temperature;
        const feelslike=response.body.current.feelslike;
        console.log('It is currently '+temperature+' degrees out. It feels like '+feelslike+' degrees out.');
    }
});