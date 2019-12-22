const weather = require('../models/owmApi');

exports.getWeather = (req, res) => {
    let getWeather = async () => {

        try{
            let settings = checkCookies(req, res);
            let location = settings.location;

            let weatherObj;

            weatherObj = await weather.getWeather(location);
            res.status(200).send(weatherObj);

        }catch(err){
            res.status(500).send(err);
        }

    }

    getWeather();
}


exports.getForecast = (req, res) => {
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
}

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
