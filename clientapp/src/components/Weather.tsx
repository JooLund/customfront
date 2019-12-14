import React from 'react'
import { Card, ListGroup, ListGroupItem, Spinner, Image } from 'react-bootstrap'

//Context
import weatherContext from '../context/weatherContext';

const Weather : React.FC = () => {

    const weatherData = React.useContext(weatherContext);

    return (
        <React.Fragment>
        {(weatherData.weatherLoaded === false)
        ? 
            <div className="row w-100 mt-3">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading weather</span> 
                </Spinner>
            </div>                                       
        :            
            <Card className='card text-white bg-dark mb-2 p-1 border-0'>
                <Card.Title className='text-center'>
                    <h2>Weather in {weatherData.weather[0].location}</h2>
                    <small className="form-text text-muted p-0 m-0">
                        Latest update: {weatherData.weather[0].updated}
                    </small>
                </Card.Title>
                <Card.Body className='p-1'>
                    <ListGroup>
                        <ListGroupItem className='text-white bg-secondary text-center'>
                            Temperature: {weatherData.weather[0].temp}&#8451; |
                            <Image src={weatherData.weather[0].icon}></Image> |
                            Humidity: {weatherData.weather[0].humidity}% |
                            Wind speed: {weatherData.weather[0].wind} m/s |
                            Sunrise: {weatherData.weather[0].sunrise} |
                            Sunset: {weatherData.weather[0].sunset}
                        </ListGroupItem>
                    </ListGroup>
                </Card.Body>
            </Card>
        }

        </React.Fragment>
    )
}

export default Weather;
