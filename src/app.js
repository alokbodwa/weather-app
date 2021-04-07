const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const weatherInfo = require('./utils/weatherInfo');


const app = express();
const port = process.env.PORT || 3000;

// Finding the path
// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));
// console.log(__filename);

const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');


// Setting handlebars 
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirPath));

app.get('',(req,res) => {
    res.render('index', {
        title: 'weather App',
        author: 'Alok Kumar'
    });
})

// app.get('/', (req, res) => {
//     res.send('<h1>This is brand new website</h1>');
// })

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'something useful will be printed later',
        title: 'This is help section',
        author: 'Alok kumar'
    });
})
app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About the Author',
        author: 'Alok kumar'
    });
})
app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide address to get weather details'
        })
    }

    const address = req.query.address;
    geocode(address,(error, data) => {
        if(error){
            return res.send({
                error: 'Some error occured while connecting to the server'
            })
        }
        weatherInfo(data, (error, report) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                Temperature: report.temperature,
                condition: report.weather_descriptions[0],
                address: address
            })
        })
    })

    // res.send({
    //     forecast: 'It is raining',
    //     address: req.query.address
    // });
})

app.get('/items', (req,res) => {
    // http://localhost:3000/items?rating=5&new=true           -- write it in browser
    // console.log(req.query);

    if(!req.query.search){
        return res.send({
            error: 'You should provide search term'
        })
    }
    
    res.send({
        products: []
    });
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        message: 'may be you are searching for help. Please do not search anything along with help',
        title: 'Error',
        author: 'Alok kumar'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        message: 'Error not found',
        title: '404! ',
        author: 'Alok kumar'
    })
})


app.listen(port, () => {
    console.log('Server running at ' + port);
});


