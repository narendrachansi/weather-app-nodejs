const path= require('path');
const express = require('express');
const hbs=require('hbs');
const request=require('request');
const app=express();

const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');
//Define paths for express configs
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialPath=path.join(__dirname,'../templates/partials');

//setup handlebars engine and views location(NOTE: by default handlebar will look for templates files in views directory)
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

// app.get('',(req,res)=>{
//     res.send('<h1>Home page</h1>');
// });


// app.get('/about',(req,res)=>{
//     res.send('<h1>About page</h1>');
// });

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Narendra'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name: 'Narendra'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name: 'Narendra'
    });
});

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'You must provide an address!'});
    }
    geocode(req.query.address,(error,{latitude, longitude, placename}={})=>{
        if(error){
            res.send({error});
        }else{
            const address=latitude+','+longitude;
            forecast(address,(error,{temperature,feelslike})=>{
                if(error){
                    res.send({error});
                }else{
                    //res.send({placename,temperature,feelslike});
                    res.send({
                        placename,
                        forecast: "Today's temperature is "+temperature+"degree celcius. But it feels like "+feelslike+" degree celsius."
                    });
                } 
            });
        }
    });
});

app.get('/help/*',(req,res)=>{
    res.render('404error',{error:'Help article not found',name: 'Narendra'});
});

app.get('*',(req,res)=>{
    res.render('404error',{error:'Page not found.',name: 'Narendra'});
});

app.listen(3000,()=>{
    console.log('Web server started on port 3000!!!');
});