const express = require('express');
const router = express.Router();

// Controllers
const newsController = require('../controllers/newsController');
const weatherController = require('../controllers/weatherController');
const settingsController = require('../controllers/settingsController');

// @route   GET api/rss
// @desc    Get all news
// @access  Public
router.get('/rss', newsController.getNews);

//@route    GET api/weather
//@desc     Get the current weather
//@access   Public
router.get('/weather', weatherController.getWeather);

//@route    GET api/forecast
//@desc     Get the forecast
//@access   Public
router.get('/forecast', weatherController.getForecast);

//@route    POST api/settings
//@desc     Set the user preferences
//@access   Public
router.post('/settings', settingsController.saveSettings);


module.exports = router;
