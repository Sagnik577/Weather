const express= require("express");
const https = require("https");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
// var env; 
process.env['NODE_TLS_REJECT_UNAUTHORIZED']= 0;
// var sslRootCAs = require("ssl-root-cas");
// sslRootCAs.inject();
// var rootCas = require("ssl-root-cas").create();

// require("https").globalAgent.options.ca = rootCas;





app.get("/",function(req,res){
    
    res.sendFile(__dirname+"/index.html");    
  
    



    
});

app.post("/",function(req,res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+req.body.cityName+"&appid="+process.env.APPID+"&units=metric";
    
    https.get(url,function(response){
        
            
            
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const image=weatherData.weather[0].icon;
            const imageURL="http://openweathermap.org/img/wn/"+image+"@2x.png";
            
            res.write(
              "<h1>Temperature in "+req.body.cityName+" is " +
                weatherData.main.temp +
                "C and " +
                "Possibly there will be " +
                weatherData.weather[0].description+"</h1>");
           res.write("<img src="+imageURL+">");
           res.send();
        })
    });
});

app.listen(process.env.PORT||3000,function(){
    console.log("Server started at port 3000");
});
