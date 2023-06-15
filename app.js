const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
res.sendFile(__dirname + "/index.html")
   
}); 

app.post("/", function(req, res){
    const query = req.body.cityName;
const appKey ="eb9a86e691f8148bd98fa8360bfe473e";
const unit = "metric";

const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appKey+"&units="+unit;

https.get(url , function(response){
    console.log(response.statusCode)

    response.on("data", function(data){
       const weatherData= JSON.parse(data)
      const temp = weatherData.main.temp
      const description =weatherData.weather[0].description
    const icon = weatherData.weather[0].icon
    console.log(icon)
    const imageUrl = "http://openweathermap.org/img/wn/"+icon +"@2x.png"

     res.write("<h1> Temperature in "+query+" is "+temp+ "degree celcius")
     res.write("<h3>Weather Description  in "+query+" is "+description)
     res.write("<img src=" +imageUrl+ ">")

 
      res.send()
    })
})

})

app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000")
})