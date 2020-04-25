const request  = require('request');

const forecast = (latitude,longitude,callback) => {

const url = 'http://api.weatherstack.com/current?access_key=03992ce81646bbf3647c44ed5465ce21&query=' + latitude + ',' + longitude 

request({  url,json:true }, (error, {body}) => {
    // console.log(response.body)
    if(error){
        callback('unable to connect to weather service',undefined);
    } else if(body.error){
        callback('unable to find location',undefined);
    }
    else{
         callback(undefined,body.current.weather_descriptions[0]  + ". It is currently "+ body.current.temperature +" degrees out.There is a " + body.current.precip + "% chance of rain."        

        )
    }
})    
}


module.exports = forecast
