import React from 'react'

import { Card, ListGroup, ListGroupItem, Spinner, Image, CardDeck } from 'react-bootstrap'

//Context
import weatherContext from '../context/weatherContext';


const Forecast : React.FC = () => {

    const weatherData = React.useContext(weatherContext);

    return (
        <React.Fragment>
        {(weatherData.forecastLoaded === false)
        ? 
            <div className="row w-100 mt-3">
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading weather</span> 
                </Spinner>
            </div>                                       
        :
            <CardDeck>
                {weatherData.forecast.map((weather: any, idx: number) =>{
                    return(
                        <Card className = 'text-white bg-dark m-0 border-0' key = {idx}>
                            <Card.Body className='p-1'>
                                <Card.Title className='text-center'>
                                    {weather.date}
                                </Card.Title>
                                <ListGroup className='list-group-flush'>
                                    <ListGroupItem className='text-white bg-dark'>
                                        <small>Temperature: {weather.temp}&#8451;</small>
                                    </ListGroupItem>
                                    <ListGroupItem className='text-white bg-dark'>
                                        <small><Image src={weather.icon}></Image> {weather.desc}</small>
                                    </ListGroupItem>
                                    <ListGroupItem className='text-white bg-dark'>
                                        <small>Humidity: {weather.humidity}%</small>
                                    </ListGroupItem>
                                    <ListGroupItem className='text-white bg-dark'>
                                        <small>Wind speed: {weather.wind} m/s</small>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    )
                })}
            </CardDeck>
        }
        </React.Fragment>
    )
}

export default Forecast;