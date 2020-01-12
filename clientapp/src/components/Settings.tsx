import React, { useState } from 'react';
import { Row, Card, Button, Col, CardDeck, ListGroup, ListGroupItem, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';


import settingsContext from '../context/settingsContext';
import { SettingsType } from '../types/Settings';

import './toggle.css';



interface Props{
    updateSite : () => void
}

const Settings : React.FC<Props> = (props:Props) => {

    const history = useHistory();
    
    //Probably the wrong way of doing things
    const settingsData = React.useContext(settingsContext);
    const [settings, setSettings] = useState<SettingsType>({
        ...settingsData.settings
    })


    const postSettings = () : void => {

        try {
            fetch('api/settings', {
                method : 'POST',
                credentials : 'include',
                headers: { 'Content-Type': 'application/json' },            
                body : JSON.stringify(settings)
            })
            .then((res) => {
                if( res.status === 200){
                    props.updateSite();
                    history.push('/');

                }else{
                    console.log(res.status);
                }
            });

        } catch (error) {
            console.log(error);            
        }
        
    }


    const createOptions = () => {
        let options = [];

        for(let i =  0; i < 51; i +=5){
            //If any issues pop up with this later, selected value is currently passed inside the select html-element: https://stackoverflow.com/questions/44786669/warning-use-the-defaultvalue-or-value-props-on-select-instead-of-setting
            options.push(<option key={i} value={i}>{i}</option>)
        }
        return options
    }


    return (
        <React.Fragment>
            
            <Row className='mt-3 mb-3'>
                <Col></Col>
                <Col className='col-8 text-center'>
                    <h1>Settings</h1>
                </Col>
                <Col>
                    <Button as={Link} to="/" variant="outline-light" className="mt-2 btn-block">
                        Return
                    </Button>
                </Col>
            </Row>

            <Form onSubmit={
                (e:any) => {
                    e.preventDefault();
                    postSettings();
                } 
            }>

                <Card className='card text-white bg-dark mb-4 w-100'>

                    <Card.Body className='w-75 mx-auto'>
                        <h3 className='text-center mb-3'>Weather location</h3>
                        <input className='form-control text-white bg-dark border-1' type='text' name='tba' defaultValue={settingsData.settings.location} onChange={ (e : any) => { setSettings({...settings, location : e.target.value}) }} placeholder='Use this input-field to choose a location for the weather service.'/>
                    </Card.Body>

                    <CardDeck className='w-75 mx-auto'>
                        <Card className = 'text-white bg-dark m-0 border-0'>
                            <Card.Body className='p-1'>
                                <Card.Title className='text-center'>
                                        <h3>Weather</h3>
                                </Card.Title>
                                <ListGroup className='list-group-flush'>
                                    <ListGroupItem className='text-white bg-dark'>
                                        <Form.Check type="switch" id="custom-switch1" defaultChecked={settingsData.settings.weather} onChange={ (e : any) => { setSettings({...settings, weather : e.target.checked}) }} className='my-custom-switch' label="Show weather" name='TBA1'/>
                                    </ListGroupItem>
                                    <ListGroupItem className='text-white bg-dark'>
                                        <Form.Check type="switch" id="custom-switch2" defaultChecked={settingsData.settings.forecast} onChange={ (e : any) => { setSettings({...settings, forecast : e.target.checked}) }} className='my-custom-switch' label="Show forecasts" name='TBA2'/>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card.Body>
                        </Card>

                        <Card className = 'text-white bg-dark m-0 border-0'>
                            <Card.Body className='p-1'>
                                <Card.Title className='text-center'>
                                        <h3>News</h3>
                                </Card.Title>
                                <ListGroup className='list-group-flush'>
                                    <ListGroupItem className='text-white bg-dark'>
                                        <Form.Check type="switch" id="custom-switch4" defaultChecked={settingsData.settings.newsYle} onChange={ (e : any) => { setSettings({...settings, newsYle : e.target.checked}) }} className='my-custom-switch' label="Yle-uutiset" name='TBA4'/>
                                    </ListGroupItem>
                                    <ListGroupItem className='text-white bg-dark'>
                                        <Form.Check type="switch" id="custom-switch5" defaultChecked={settingsData.settings.newsHs} onChange={ (e : any) => { setSettings({...settings, newsHs : e.target.checked}) }} className='my-custom-switch' label="Helsingin sanomat" name='TBA5'/>
                                    </ListGroupItem>
                                    <ListGroupItem className='text-white bg-dark'>
                                        <Form.Check type="switch" id="custom-switch6" defaultChecked={settingsData.settings.newsIl} onChange={ (e : any) => { setSettings({...settings, newsIl : e.target.checked}) }} className='my-custom-switch' label="Iltalehti" name='TBA6'/>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card.Body>
                        </Card>                    
                    </CardDeck>

                    <Card.Body className='w-75 mx-auto'>
                        
                        <Row>

                        <label className="form-check-label text-white mt-1 mb-1 w-50">Limit the number of news:</label>

                        <Form.Group className='form-check form-check-inline w-25 ml-4' controlId="exampleForm.ControlSelect1">
                            <Form.Control as="select" className='text-white bg-secondary border-0' defaultValue={settingsData.settings.limit} onChange={ (e : any) => { setSettings({...settings, limit : e.target.value}) }}>
                                {createOptions()}
                            </Form.Control>
                        </Form.Group>

                        </Row>

                    </Card.Body>

                    <Card.Body className='mx-auto'>
                        <Button variant='outline-light' className='btn-lg' type='submit'>Save settings</Button>
                    </Card.Body>

                </Card>

            </Form>

        </React.Fragment>


    )
}

export default Settings;
