const hbs = require('hbs')
const path = require('path')
const express = require('express')
const forecast = require('../utils/forecast')
const geocode = require('../utils/geocode')


const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')



app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
    res.render('Index', {
        title: 'Weather',
        name: 'Ofer'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ofer',
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help page title',
        help: 'This is the help message',
        name: 'Ofer'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'No Address - Address must be specified'
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {
        if (error){
            return res.send({
                error : 'error '+ error
            })
                
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({
                    error : 'error '+ error
                })
            }
            res.send({
                address: req.query.address,
                location,
                forecast: 'forecast is '+ forecastData
            })
            console.log('location is ' + req.query.address)
            console.log('Error', error)
            console.log('Data', forecastData)
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('message404',{
        message: 'Help page 404',
        name: 'ofer',
        title: 'Weather' 
    })
})
app.get('*', (req,res) => {
    res.render('message404',{
        message: 'Page not found - General 404 ',
        name: 'ofer',
        title: 'Weather'
    })
})

app.get('*', (req,res) => {
    res.render('help',{
        message: 'Help page title'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})