import React from 'react';
import { Card } from 'react-bootstrap';

//Prototype, currently the functionality is in App.tsx

const WeatherCard : React.FC = () => {
    return (
        <React.Fragment>
        <Card className='card text-white bg-dark mb-4 w-100'>
            <Card.Body>
                weather block?
                forecast block?
            </Card.Body>
        </Card>
        </React.Fragment>

    )
}

export default WeatherCard;