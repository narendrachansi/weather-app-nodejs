const geocode= require('./utils/geocode');
const forecast= require('./utils/forecast');
const address=process.argv[2];
if(!address){
    console.log("Address should be entered!!!");
}else{
    geocode(address,(error,{latitude, longitude, placename})=>{
        if(error){
            console.log(error);
        }else{
            const address=latitude+','+longitude;
            forecast(address,(error,{temperature,feelslike})=>{
                if(error){
                   console.log(error);
                }else{
                    console.log(placename);
                    console.log('It is currently '+temperature+' degrees out. It feels like '+feelslike+' degrees out.');
                } 
            });
        }
    });
}


