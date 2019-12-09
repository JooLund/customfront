import React, { useState, useContext, useEffect } from 'react';

//Contexts
import appContext, { AppContext } from './context/appContext';
import weatherContext, { WeatherContext } from './context/weatherContext';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Card, Container } from 'react-bootstrap';


import Main from './components/Main';
import Nav from './components/Nav';
import Weather from './components/Weather';
import Forecast from './components/Forecast';
import News from './components/News';

import Settings from './components/Settings';




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
          <Main>
            <Nav></Nav>
            <weatherContext.Provider value={weatherData}>
              <Card className='card text-white bg-dark mb-4 w-100'>
                <Card.Body>
                  <Weather></Weather>
                  <Forecast></Forecast>
                </Card.Body>
              </Card>
            </weatherContext.Provider>
            <News></News>
          </Main>
        </Route>

        <Route path = '/settings'>
          <Settings></Settings>
        </Route>
        
      </Container>


    </Router>
    </appContext.Provider>
  );
}

export default App;
