const request = require('request')

const forecast = (latitude, longitude, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=5e743c438ae9a1effd951eb634733a07&query='+latitude+','+longitude+'&units=f'

    request({url , json : true},(error,{body}) => {
        if(error)
        {
            callback('Please connect tot an internet connection.',undefined)
        }
        else if(body.error)
        {
            callback('unable to find location.',undefined)
        }
        else
        {
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees`)
        }
    })
}

module.exports = forecast