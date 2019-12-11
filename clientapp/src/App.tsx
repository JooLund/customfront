import React, { useState, useContext, useEffect } from 'react';

//Contexts
import appContext, { AppContext } from './context/appContext';
import weatherContext, { WeatherContext } from './context/weatherContext';
import settingsContext, { SettingsContext } from './context/settingsContext';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import Main from './components/Main';
import Nav from './components/Nav';
import WeatherCard from './components/WeatherCard';
import News from './components/News';
import Settings from './components/Settings';


import Cookies from 'js-cookie';


const App: React.FC = () => {

  const [settingsData, setSettingsData] = useState<SettingsContext>({
    ...useContext(settingsContext)
  })

  const [weatherData, setWeatherData] = useState<WeatherContext>({
    ...useContext(weatherContext)
  })

  const [appData, setAppData] = useState<AppContext>({
    ...useContext(appContext)
  })

  
//TODO: Create a separate config for the fetch URIs, current version wont run when deployed
//TODO: Export get cookies somehow and run it with /settings post request IF changes happen https://stackoverflow.com/questions/46867494/%C3%97-react-fetch-wont-hit-index-route-in-express-router/46868034

  const getForecast = async () => {

    try {
      let res = await fetch('http://localhost:3005/api/forecast', {
        credentials: 'include'
      });

      try{

        let forecast = await res.json();

        setWeatherData((prevData: WeatherContext) => ({
          ...prevData,
          forecast : forecast,
          forecastLoaded : true
        }));

        /*
        setWeatherData({
          ...weatherData,
          forecast : forecast,
          forecastLoaded : true
        })*/
        
      }catch(err){
        setWeatherData({
          ...weatherData,
          forecastLoaded : false,
          error : `API-error: ${err}`
        })
      }

    }catch(err){
      setWeatherData({
        ...weatherData,
        forecastLoaded : false,
        error : `Error: ${err}`
      })
    }

  }

  const getWeather = async () => {

    try {
      let res = await fetch('http://localhost:3005/api/weather', {
        credentials: 'include'
      });


      try{

        let weather = await res.json();

        setWeatherData((prevData: WeatherContext) => ({
          ...prevData,
          weather : weather,
          weatherLoaded : true
        }));

      }catch(err){
        setWeatherData({
          ...weatherData,
          weatherLoaded : false,
          error : `API-error: ${err}`
        })
      }

    }catch(err){
      setWeatherData({
        ...weatherData,
        weatherLoaded : false,
        error : `Error: ${err}`
      })
    }

  }

  const getNews = async () => {

    try {
      
      let res = await fetch('http://localhost:3005/api/rss', {
        credentials: 'include'
      });


      try {

        let news = await res.json();

        setAppData({
          ...appData,
          news : news,
          filesReady : true
        })

      } catch (error) {
        setAppData({
          ...appData,
          filesReady : false,
          error : `API-error: ${error}`
        })
        console.log(error);
      }


    } catch (error) {
      setAppData({
        ...appData,
        filesReady : false,
        error : `Error: ${error}`
      })
      console.log(error);
    }

  }

  const getCookies = async () => {

    try{
      let cookies : any = Cookies.get('settings');
      console.log(cookies);
      let cSettings = JSON.parse(cookies);

      setSettingsData((prevData: SettingsContext) => ({
        ...prevData,
        settings : cSettings
      }));

      /*
      console.log(cSettings);
      console.log(settingsData);

      setSettingsData({
        ...settingsData,
        settings : cSettings
      })

      */

    }catch(error){
      setSettingsData({
        ...settingsData
      });
      console.log(error);
    }
  
    // Doesnt work atm
    if(settingsData.settings.forecast === true){
      getForecast()
    }

    if(settingsData.settings.weather === true){
      getWeather()
    }

    
    if(settingsData.settings.newsYle === true){
      getNews()
    }

  }


  useEffect(() => {

    getCookies();

  }, [])

  
  return (
    <appContext.Provider value={appData}>
    <settingsContext.Provider value={settingsData}>

    <Router>

      <Container className="mt-3">

        <Route exact path ="/">
          <Main>
            <Nav></Nav>
            <weatherContext.Provider value={weatherData}>
              <WeatherCard></WeatherCard>
            </weatherContext.Provider>
            <News></News>
          </Main>
        </Route>

        <Route path = '/settings'>
            <Settings></Settings>
        </Route>
        
      </Container>

    </Router>

    </settingsContext.Provider>
    </appContext.Provider>
  );
}

export default App;
