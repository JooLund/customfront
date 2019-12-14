const express = require('express');
const router = express.Router();

//Models
const rss = require('../models/rss');
const weather = require('../models/owmApi');


const checkCookies = (req, res) => {

    if(req.cookies.settings){

        settings = JSON.parse(req.cookies.settings);
        return settings;

    }else{

        settings = {
            'location': 'Mikkeli',
            'weather': true,
            'forecast': true,
            'newsYle': true,
            'newsIl': false,
            'newsHs': false,
            'limit': 10
        }

        res.cookie('settings', JSON.stringify(settings), {maxAge: 5000000000});
        return settings;
    }

}


// @route   GET api/rss
// @desc    Get all news
// @access  Public
router.get('/rss', (req, res) => {

    //console.log('Fetched RSS');

    let settings = checkCookies(req, res);


    rss.exportNews(settings, (err,news) => {

        try{

            if(news === false){
                res.status(200).json([]);
            }else{
                res.json(news);
            }

        }catch(error){
            res.status(200).send(err);
        }
        
    })

});

//@route    GET api/weather
//@desc     Get the current weather
//@access   Public
router.get('/weather', (req, res) => {

    //console.log('Fetched weather');

    let getWeather = async () => {

        try{
            let settings = checkCookies(req, res);
            let location = settings.location;

            let weatherObj;

            weatherObj = await weather.getWeather(location);
            res.status(200).send(weatherObj);

        }catch(err){
            res.status(500).send(JSON.stringify(err));
        }

    }

    getWeather();

});

//@route    GET api/forecast
//@desc     Get the forecast
//@access   Public
router.get('/forecast', (req, res) => {

    //console.log('Fetched forecast');

    let getForecast = async () => {

        try{
            let settings = checkCookies(req, res);
            let location = settings.location;
            let forecastObj;

            forecastObj = await weather.getForecast(location);
            res.status(200).send(forecastObj);

        }catch(err){
            res.status(500).send(err);
        }
    }

    getForecast();

});

//@route    POST api/settings
//@desc     Set the user preferences
//@access   Public
router.post('/settings', (req, res) => {

    //Try-catch here

    console.log('Saved settings as cookies');

    let settings = req.body;

    res.cookie('settings', JSON.stringify(settings), {maxAge: 5000000000});
    
    res.status(200).send('Settings saved!');

});


module.exports = router;
