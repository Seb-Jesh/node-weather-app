const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = 3000

// Define paths for Express Config
const viewsPath = path.join(__dirname, '../templates/views');
const publicPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// Set up static directory to use
app.use(express.static(publicPath))

// Set up routing
app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        nav: 'Weather Service App',
        name: 'Created by: Sebastian Jeshurun Israel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        nav: 'Weather Service App',
        name: 'About the Weather Service App'
    })
})

app.get('/weather', (req, res) => {
    const city = req.query.city
    if(!city || city === undefined) {
        return res.send({
            Error: 'Please provide name of city'
        })
    }
    geocode(city, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        
        forecast(latitude, longitude, (error, {weather, temperature, feelslike} = {}) => {
            if(error) {
                return res.send({
                    Error: 'Something went wrong'
                })
            }

            res.send({
                city: location,
                weather: weather,
                temperature: temperature,
                feelslike: feelslike
            })
        })
    })

    
})

app.get('/products', (req, res) => {
    if(!req.query.product_id) {
        return res.send('Error: you must provide a product_id')
    }
    console.log(req.query);
    res.send([{
        product_id: 'Airtime',
        price: 18
    }, {
        product_id: 'Data',
        price: 20
    }])
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
})