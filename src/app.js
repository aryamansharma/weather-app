const hbs = require('hbs')
const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

const app = express()
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather',
        name : 'Aryaman'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About',
        name : 'Aryaman'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        message : 'The Help page',
        title : 'Help',
        name : 'Aryaman'
    })
})

app.get('/weather',(req,res) => {
    location_input = req.query.address
    if (!location_input){
        return res.send({
            error : 'Please provide an address.'
        })
    }

    geocode(location_input,(error,{latitude,longitude,location}={})=>{
        if (error){
            return res.send({
                error
            })
        }
    
        forecast(latitude, longitude, (error, dataForecast) => {
            if(error)
            {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast : dataForecast,
                address : location_input
            })
        })
    })
})

app.get('/help/*', (req, res) =>{
    res.render('error',{
        error : 'Help Article not found',
        name : 'Aryaman'
    })
})

app.get('*', (req,res) => {
    res.render('error',{
        error : '404 Not found.',
        name : 'Aryaman'
    })
})

app.listen(port,()=>{
    console.log(`Servers are up on ${port}`)
})