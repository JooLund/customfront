import React, { useState, useContext, useEffect } from 'react';
import appContext, { AppContext } from './context/appContext';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import News from './components/News';
import Nav from './components/Nav';


const App: React.FC = () => {
  
  const [appData, setAppData] = useState<AppContext>({
    ...useContext(appContext)
  })

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

        console.log(news);

      } catch (error) {
        setAppData({
          ...appData,
          filesReady : false,
          error : `API-error: {error}`
        })
        console.log(error);
      }


    } catch (error) {
      setAppData({
        ...appData,
        filesReady : false,
        error : `Error: {error}`
      })
      console.log(error);
    }

  }



  useEffect(() => {
    
    requestNews()

  }, [])

  
  return (
    <appContext.Provider value={appData}>
    <Router>

      <Container className="mt-3">

        <Route exact path ="/">
          <Nav></Nav>
          <News></News>
        </Route>

      </Container>


    </Router>
    </appContext.Provider>
  );
}

export default App;
