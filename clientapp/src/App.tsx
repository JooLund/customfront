import React, { useState, useContext, useEffect } from 'react';

//Contexts
import appContext, { AppContext } from './context/appContext';
import weatherContext, { WeatherContext } from './context/weatherContext';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Nav from './components/Nav';
import Weather from './components/Weather';
import News from './components/News';



const App: React.FC = () => {


  const [weatherData, setWeatherData] = useState<WeatherContext>({
    ...useContext(weatherContext)
  })



  const [appData, setAppData] = useState<AppContext>({
    ...useContext(appContext)
  })

  
  const requestForecast = async () => {

    try {
      let res = await fetch('http://localhost:3005/api/forecast');

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

  const requestWeather = async () => {

    try {
      let res = await fetch('http://localhost:3005/api/weather');

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


  const requestNews = async () => {

    try {
      
      let res = await fetch('http://localhost:3005/api/rss');

      try {

        let news = await res.json();

        setAppData({
          ...appData,
          news : news[0],
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



  useEffect(() => {
    
    requestWeather()
    requestNews()
    requestForecast()

  }, [])

  
  return (
    <appContext.Provider value={appData}>
    <Router>

      <Container className="mt-3">

        <Route exact path ="/">
          <Nav></Nav>
          <weatherContext.Provider value={weatherData}>
            <Weather></Weather>
          </weatherContext.Provider>
          <News></News>
        </Route>

      </Container>


    </Router>
    </appContext.Provider>
  );
}

export default App;
