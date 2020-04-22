const utils= require('./utils/utils');

utils.getGeocode('Macquarie Park',(error,data)=>{
    if(data){
        console.log(data);
        const address=data.longitude+','+data.latitude;
        utils.getWeather(address,(error,data)=>{
            if(data){
                console.log('It is currently '+data.temperature+' degrees out. It feels like '+data.feelslike+' degrees out.');
            }else{
                console.log(error);
            } 
        });
    }else{
        console.log(error);
    }
});


