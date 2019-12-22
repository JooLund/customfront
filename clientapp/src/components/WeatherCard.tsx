import React from 'react';
import { Card, Alert } from 'react-bootstrap';
import Weather from './Weather';
import Forecast from './Forecast';

import settingsContext from '../context/settingsContext';
import weatherContext from '../context/weatherContext';

const WeatherCard : React.FC = () => {

  //Testing
  const settingsData = React.useContext(settingsContext);
  const weatherData = React.useContext(weatherContext);

  return (
      <React.Fragment>
        {(settingsData.settings.weather === false && settingsData.settings.forecast === false)
        ?
          <></>
        :
          <Card className='card text-white bg-dark mb-4 w-100'>

            {(weatherData.error)
            ?
              <Card.Body>
                <Alert variant='danger'>
                  <Alert.Heading>Error!</Alert.Heading>
                  <p style={{color:'#000'}}>Additional information: {weatherData.error}</p>
                </Alert>
              </Card.Body>
            :
            
              <Card.Body>
                {(settingsData.settings.weather === false)
                ?
                  <></>
                :
                  <Weather></Weather>
                } 
                {(settingsData.settings.forecast === false)
                ?
                  <></>
                :              
                  <Forecast></Forecast>
                }               
              </Card.Body>

            }
          </Card> 
        }
      </React.Fragment>

    )
}

export default WeatherCard;
