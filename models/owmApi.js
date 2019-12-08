const restify = require('restify-clients');

const api = 'https://api.openweathermap.org';

//This is your personal key, not included in the repository
const apikey = require('../keys/owmAPI').APIKEY;

    client = restify.createJsonClient({
        'url' : api,
        retry: {
            'retries' : 0
        },
        agent : false
    })

module.exports = {

    'getWeather' : (location) => {

        return new Promise((resolve, reject) => {

            client.get(`/data/2.5/weather?q=${location}&units=metric&lang=en&APPID=${apikey}`, (err, _req, _res, data) =>  {

                if(err){
                    reject(err);
                    console.log(err);
                }else{

                    let result = data;
                    let weatherObj = [];

                    let updated = result.dt*1000;
                    let sunrise = result.sys.sunrise*1000;
                    let sunset = result.sys.sunset*1000;

                    let formatTime = (timestamp) => {

                        let time = new Date(timestamp);
                            hh = time.getHours();
                            min = ('0' + time.getMinutes()).slice(-2);
                            newTime = `${hh}:${min}`;
                        return newTime;

                    }

                    let weather = {
                        'icon' : `http://openweathermap.org/img/w/${result.weather[0].icon}.png`,
                        'desc' : result.weather[0].description,
                        'temp' : result.main.temp,
                        'pressure' : result.main.pressure,
                        'humidity' : result.main.humidity,
                        'wind' : result.wind.speed,
                        'updated' : formatTime(updated),
                        'sunrise' : formatTime(sunrise),
                        'sunset' : formatTime(sunset),
                        'location' : result.name                        
                    }

                    weatherObj.push(weather);
                    resolve(weatherObj);

                }
            });
        });
    },

    'getForecast' : (location) => {

        return new Promise((resolve, reject) => {

            client.get(`/data/2.5/forecast?q=${location}&units=metric&lang=en&APPID=${apikey}`, (err, _req, _res, data) =>  {

                if(err){
                    reject(err);
                    console.log(err);
                }else{

                    let results = [];
                    results.push(data);
                    let copyResults = [];
                    let forecastObj = [];

                    let i;
                    for(i = 0; i < results[0].cnt; i++){
                        if(results[0].list[i].dt_txt.match(/12:00:00/)){
                            copyResults.push(results[0].list[i]);
                        }
                    }

                    let j;
                    for(j = 0; j < copyResults.length; j++){

                        let formatDate = (timestamp) => {

                            let date = new Date(timestamp*1000);
                                yyyy = date.getFullYear();
                                mm = ('0' + (date.getMonth() + 1)).slice(-2);
                                dd = ('0' + date.getDate()).slice(-2);         
                                hh = date.getHours();
                                min = ('0' + date.getMinutes()).slice(-2);                         

                            date = `${dd}.${mm}.${yyyy} ${hh}.${min}`;
                            return date;

                        }


                        let forecast = {
                            'icon' : `http://openweathermap.org/img/w/${copyResults[j].weather[0].icon}.png`,
                            'desc' : copyResults[j].weather[0].description,
                            'temp' : copyResults[j].main.temp,
                            'pressure' : copyResults[j].main.pressure,
                            'humidity' : copyResults[j].main.humidity,
                            'wind' : copyResults[j].wind.speed,
                            'date' : formatDate(copyResults[j].dt)
                        }

                        forecastObj.push(forecast);

                    }

                    resolve(forecastObj);

                }

            });

        });
    }
}