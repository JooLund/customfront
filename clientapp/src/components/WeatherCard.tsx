import React from 'react';
import { Card } from 'react-bootstrap';
import Weather from './Weather';
import Forecast from './Forecast';

import settingsContext from '../context/settingsContext';

const WeatherCard : React.FC = () => {

  //Testing
  const settingsData = React.useContext(settingsContext);

  return (
      <React.Fragment>
        {(settingsData.settings.weather === false && settingsData.settings.forecast === false)
        ?
          <></>
        :
            
          <Card className='card text-white bg-dark mb-4 w-100'>
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
          </Card>
          
        }
      </React.Fragment>

    )
}

export default WeatherCard;
