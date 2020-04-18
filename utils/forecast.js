const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4e4fa94a5658e1e2acc89b663034481c&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, ' It is currently ' + body.current.temperature + ' degress out. Feels like ' + body.current.feelslike + ' .')
        }
    })
}

module.exports = forecast