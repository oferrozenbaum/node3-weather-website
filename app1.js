const express = require('express')

const app = express()

app.get('', (req,res) => {
    res.send('Hello Express')
})

app.get('/help', (req,res) => {
    res.send('reached Help page')
})

app.get('/about',(req,res) => {
    res.send('<h1> About </h1>')
})

app.get('/weather', (req,res) => {
    res.send({
        location: 'New York',
        forecast: 'the forecast'
    })
})

app.listen(3000, () =>{
    console.log('server is up and running')
})