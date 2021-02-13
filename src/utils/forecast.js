const { builtinModules } = require('module')
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=058e0eab1c470dd554aebb8890777970&query=' + latitude + ',' + longitude + ',&units=m'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('unable to connect to the weather service', undefined)
        }
        else if (body.error) {
            callback('Unable to find location. ' + body.error.info, undefined)
        }
        else {
            callback(undefined, {
                temprature: body.current.temperature,
                FeelsLike: body.current.feelslike,
                description: body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast
