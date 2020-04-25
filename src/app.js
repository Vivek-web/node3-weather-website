const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialpath =path.join(__dirname,"../templates/partials")
// setup handlebar engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialpath)

app.get('', (req, res) => {
    res.render('index',{
        title:'Weather ',
        name:'Andrew'
    })
})

app.get('/weather',(req,res)=>{
    console.log(req.query)
        if(!req.query.address){
        return res.send({
            error:'please fill the address'
        })
    }
         geocode(req.query.address,(error,data) => {
            if(error){
                return res.send({ error })
            }
            // console.log(data.location);
             forecast(data.latitude,data.longitude,(error, forecastdata) => {
               if(error){
                   return res.send({error})
               }
            //    console.log(forecastdata,data.location)
               res.send({
                forecast:forecastdata,
                location:data.location,
                address:req.query.address
                
            })

             })
                 


         })   
        
        
    })

app.get('/about', (req, res) => {
    res.render('about',{
        title:'about me',
        name:'Andrew'
    })
})



app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help',
        name:'Rohan babu' 
       
    })
})


app.get('/help/*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Rohan babu', 
        errorMessage:'Help artical  not found.'
    })

})


app.get('*',(req,res)=>{
    res.render('404',{
     title:'404',
     name:'andrew Mead',
     errorMessage:'page not found.'

     })


})











app.listen(3000,()=>{
console.log('port is running on 3000');

})