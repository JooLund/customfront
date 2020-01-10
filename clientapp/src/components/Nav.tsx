import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Nav : React.FC = () => {

    const createGreeting = () : string => {

        let time : Date = new Date();
        let greeting : string = '';
        let tod : string = '';

        let hours = time.getHours();

        if(hours < 12){
            tod = 'Good Morning!'
        }else if(hours < 18){
            tod = 'Good Afternoon!'
        }else{
            tod = 'Good Evening!'
        }

        greeting = tod//`${tod} Today is ${weekday}, ${dd}.${mm}.${yyyy}`;

        return greeting;
    }


    const createFiller = () : string => {

        let time : Date = new Date();
        let greeting : string = '';

        let yyyy = time.getFullYear(),
            day = time.getDay(),
            mm = ('0' + (time.getMonth() + 1)).slice(-2),
            dd = ('0' + time.getDate()).slice(-2);

        let weekday : string = '';

        switch (day) {
            case 0:
              weekday = "Sunday";
              break;
            case 1:
              weekday = "Monday";
              break;
            case 2:
               weekday = "Tuesday";
              break;
            case 3:
              weekday = "Wednesday";
              break;
            case 4:
              weekday = "Thursday";
              break;
            case 5:
              weekday = "Friday";
              break;
            case 6:
              weekday = "Saturday";
          }
        
        greeting = `Today is ${weekday}, ${dd}.${mm}.${yyyy}`;

        return greeting;
    }


    return (

        <Row className='mt-3 mb-3'>
            <Col></Col>
            <Col className='col-8 text-center'>
                <h1>{createGreeting()}</h1>
                <h4>{createFiller()}</h4>
            </Col>
            <Col>
                <Button as={Link} to="/settings" variant="outline-info" className="mt-2">
                    Settings
                </Button>
            </Col>
        </Row>        


    )
}

export default Nav;
