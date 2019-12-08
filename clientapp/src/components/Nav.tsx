import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Nav : React.FC = () => {

    return (

        <Row>
            <Col className='col-10'>
                <h1>Welcome</h1>
            </Col>
            <Col className='col-2'>
                <Button as={Link} to="/settings" variant="outline-primary" className="mt-2">
                    Settings
                </Button>
            </Col>
        </Row>        


    )
}

export default Nav;