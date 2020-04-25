const request = require('request');  

const geocode = (address,callback) => {
    const url  = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoidml2ZWszMjEiLCJhIjoiY2s5Y2oxMDJmMDQ3NTNsdDZqZDd3MDBzbCJ9.NS6fJXhQ5xyp44M2BjdbVw&limit=1'

    request({ url,json:true }, (error, response) => {

        if(error){
            callback('unable to connect with mapbox service');
            // console.log('unable to connect with mapbox service')
        }else if(response.body.features.length == 0){
            callback('unable to match location',undefined);
        }else{
          callback(undefined,{
          latitude:response.body.features[0].center[1],    
          longitude:response.body.features[0].center[0],
          location:response.body.features[0].place_name
          })  
       
        }
    })


} 


module.exports = geocode