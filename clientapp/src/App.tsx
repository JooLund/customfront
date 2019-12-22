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
  });

  const [weatherData, setWeatherData] = useState<WeatherContext>({
    ...useContext(weatherContext)
  });

  const [appData, setAppData] = useState<AppContext>({
    ...useContext(appContext)
  });

  //TODO: Create a separate config for the fetch URIs, current version wont run when deployed https://stackoverflow.com/questions/46867494/%C3%97-react-fetch-wont-hit-index-route-in-express-router/46868034

  const checkResponse = async (res: Response) => {
    if (!res.ok) {
      let err = await res.json();
      //console.log(err.message);
      throw new Error(err);
    } else {
      let response = await res.json();
      return response;
    }
  };

  const getForecast = async () => {
    try {
      let res = await fetch('http://localhost:3005/api/forecast', {
        credentials: 'include'
      }).then(checkResponse);

      let forecast = res;

      setWeatherData((prevData: WeatherContext) => ({
        ...prevData,
        forecast: forecast,
        forecastLoaded: true,
        error: ''
      }));
    } catch (err) {
      setWeatherData({
        ...weatherData,
        forecastLoaded: false,
        error: err.message
      });
    }
  };

  const getWeather = async () => {
    try {
      let res = await fetch('http://localhost:3005/api/weather', {
        credentials: 'include'
      }).then(checkResponse);

      let weather = res;

      setWeatherData((prevData: WeatherContext) => ({
        ...prevData,
        weather: weather,
        weatherLoaded: true,
        error: ''
      }));
    } catch (err) {
      console.log(JSON.stringify(err.message));

      setWeatherData({
        ...weatherData,
        weatherLoaded: false,
        error: err.message
      });
    }
  };

  const getNews = async () => {
    try {
      let res = await fetch('http://localhost:3005/api/rss', {
        credentials: 'include'
      }).then(checkResponse);

      let news = res;

      setAppData({
        ...appData,
        news: news,
        filesReady: true,
        error: ''
      });
    } catch (err) {
      console.log(`Error with the news-fetch, ${err}`);
      setAppData({
        ...appData,
        filesReady: false,
        error: `Error: ${err}`
      });
    }
  };

  const updateSite = async () => {
    try {
      let cookies: any = Cookies.get('settings');
      let cSettings = JSON.parse(cookies);

      console.log(cookies);

      setSettingsData((prevData: SettingsContext) => ({
        ...prevData,
        settings: cSettings
      }));
    } catch (err) {
      setSettingsData({
        ...settingsData
      });
      console.log(err);
    }

    /* Doesnt work atm
    if(settingsData.settings.forecast === true){
      getForecast();
    }*/

    getNews();
    getWeather();
    getForecast();
  };

  useEffect(() => {
    updateSite();
    console.log('Loop-check just in case');
  }, []);

  return (
    <appContext.Provider value={appData}>
      <settingsContext.Provider value={settingsData}>
        <Router>
          <Container className='mt-3'>
            <Route exact path='/'>
              <Main>
                <Nav></Nav>
                <weatherContext.Provider value={weatherData}>
                  <WeatherCard></WeatherCard>
                </weatherContext.Provider>
                <News></News>
              </Main>
            </Route>

            <Route path='/settings'>
              <Settings updateSite={updateSite}></Settings>
            </Route>
          </Container>
        </Router>
      </settingsContext.Provider>
    </appContext.Provider>
  );
};

export default App;
