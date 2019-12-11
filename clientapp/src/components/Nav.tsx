import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Nav : React.FC = () => {

    //Could make this a global component with the button route and text changing based on the url

    return (

        <Row className='mt-3 mb-3'>
            <Col className='col-10'>
                <h1>Welcome</h1>
            </Col>
            <Col className='col-2'>
                <Button as={Link} to="/settings" variant="outline-info" className="mt-2">
                    Settings
                </Button>
            </Col>
        </Row>        


    )
}

export default Nav;
