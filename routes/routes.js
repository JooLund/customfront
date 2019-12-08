const express = require('express');
const router = express.Router();

//Models
const rss = require('../models/rss');
const weather = require('../models/owmApi');

// @route   GET api/rss
// @desc    Get all news
// @access  Public

router.get('/rss', (req, res) => {

    //For testing purposes only
    let newslimit = 10;
    let url = ['https://feeds.yle.fi/uutiset/v1/recent.rss?publisherIds=YLE_UUTISET'];

    let rssReader = () => {

        rss.exportNews(url, newslimit, (err, news) => {

            try{
                res.json(news)
            }catch(err){
                res.status(500);
            }

        });

    }

    rssReader();

});

//@route    GET api/weather
//@desc     Get the current weather
//@access   Public

router.get('/weather', (req, res) => {

    let getWeather = async () => {

        try{

            let location = 'Mikkeli'
            let weatherObj;

            weatherObj = await weather.getWeather(location);
            res.status(200).send(weatherObj);

        }catch(err){
            res.status(500).send(err);
        }
        
    }

    getWeather();

});

//@route    GET api/forecast
//@desc     Get the forecast
//@access   Public

router.get('/forecast', (req, res) => {

    let getForecast = async () => {

        try{

            let location = 'Mikkeli';
            let forecastObj;

            forecastObj = await weather.getForecast(location);
            res.status(200).send(forecastObj);

        }catch(err){
            res.status(500).send(err);
        }
    }

    getForecast();

});



module.exports = router;