const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.use(express.json())

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Jelena"
    }); 
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name: "Jelena"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: "This is some helpful message printing.",
        title: "Help",
        name: "Andrew"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({
                error
            })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jelena',
        errorMessage: 'Help article not found'
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: "You must provide a search term."
        })
    }
    console.log(req.query)
    res.send({
        products: [] 
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jelena',
        errorMessage: 'Page not found'
    })
})


// app.post('/zbir', (req, res) => {
//     console.log("jedan")
//     const x = req.body.x;

//     console.log(x);
//     const y = req.body.y;
//     const zbir = x +y;

//     res.json({
//         zbir
//     })
// })

// app.post('/ime', (req, res) => {
//     const ime = req.body.ime;
//     const pozdrav = `Zdravo, ${ime}!`
//     res.json({
//         pozdrav
//     })
// })


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})