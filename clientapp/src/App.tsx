import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

//Contexts
import appContext, { AppContext } from './context/appContext';
import weatherContext, { WeatherContext } from './context/weatherContext';
import settingsContext, { SettingsContext } from './context/settingsContext';

//Bootstrap
import { Container } from 'react-bootstrap';

//Components
import Main from './components/Main';
import Nav from './components/Nav';
import WeatherCard from './components/WeatherCard';
import News from './components/News';
import Settings from './components/Settings';


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

  
//TODO: Create a separate config for the fetch URIs, current version wont run when deployed https://stackoverflow.com/questions/46867494/%C3%97-react-fetch-wont-hit-index-route-in-express-router/46868034

//TODO Global error handling. Currently working prototype inside getWeather. Also error handling inside settings to prevent redirection?

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
      })
      .then(async (res) => {
        if (!res.ok) {
          let err = await res.json();
          throw new Error(err.message);

        }else{
          return res;

        }
      });

      try{

        let weather = await res.json();

        setWeatherData((prevData: WeatherContext) => ({
          ...prevData,
          weather : weather,
          weatherLoaded : true
        }));

      }catch(err){

        console.log(err);
        setWeatherData({
          ...weatherData,
          weatherLoaded : false,
          error : `API-error: ${err}`
        })
      }

    }catch(err){

      console.log('Fetch error')

      setWeatherData({
        ...weatherData,
        weatherLoaded : false,
        error : `${err}`
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

  const updateSite = async () => {

    try{

      let cookies : any = Cookies.get('settings');
      let cSettings = JSON.parse(cookies);

      console.log(cookies);

      setSettingsData((prevData: SettingsContext) => ({
        ...prevData,
        settings : cSettings
      }));

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

    updateSite();
    console.log('Loop-check just in case');

  }, []);

  
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
            <Settings updateSite = {updateSite}></Settings>
        </Route>
        
      </Container>

    </Router>

    </settingsContext.Provider>
    </appContext.Provider>
  );
}

export default App;
