import React from 'react'
import { Form, Row, Col, Card } from 'react-bootstrap'


const Search = () => {
    return (

        <React.Fragment>

            <Card className='card text-white bg-dark mb-4 w-100'>

                <Card.Body className='m-1 p-1'>
                <Form action='https://www.google.com/search' method='get'>
                    <Row>
                        <Col className='col-9'>
                            <input className='form-control text-white bg-dark border-light' type='text' name='q' placeholder='Google search'/>
                        </Col>
                        <Col className='col-3'>
                            <input className='btn btn-outline-light btn-block' type='submit' value='Search'/>
                        </Col>
                    </Row>
                </Form>
                </Card.Body>

            </Card>
        </React.Fragment>
    )
}

export default Search;
