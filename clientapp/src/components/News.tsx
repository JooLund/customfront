import React from 'react'
import appContext from '../context/appContext';

import no_image from '../static/no_image.png';

import { Newstype } from '../types/News';

import { Spinner, Alert, Card, CardColumns, Row, Col } from 'react-bootstrap';


const News: React.FC = () => {

    const appData = React.useContext(appContext);

    const showDefault = (e: any) : void => {
        e.target.src = no_image;
    }

    return (

        <React.Fragment>

            {(appData.filesReady === false)
            ? 
                <div className="row w-100 mt-3">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading</span> 
                    </Spinner>
                </div>                                       
            :
            <span>
            {(appData.error)
            ?
                <div>
                    <Alert variant="danger" className="mt-3">
                    <h4>Error</h4>
                    <p>{appData.error}</p>
                    </Alert>
                </div>
            :
                <Row className='mb-3'>
                    {appData.news.map((news: Newstype, idx: number) =>{
                        return(
                            
                            <Col className='col-3 p-1'>
                                <Card className="card text-white bg-dark mr-1 mb-1" style={{minHeight : '17rem'}}key={idx}>
                                    <Card.Body className='p-2'>

                                        <Card.Text>
                                            <p><a href={news.link} target="_blank" rel="noopener noreferrer" className='card-link'>{news.title}</a></p>
                                        </Card.Text>

                                        <Card.Subtitle className="card-subtitle mb-2 text-muted">
                                            <small>Published: {news.date} at {news.time}. Source: {news.source}</small>
                                        </Card.Subtitle>
                                        
                                        <Card.Img onError={(e: any) => {showDefault(e)}} src={news.img} style={{maxHeight : '15rem'}} className='mx-auto d-block w-75'  alt='No picture'></Card.Img>

                                    </Card.Body>
                                </Card>
                            </Col>
                        )

                    })}
                </Row>




            }
            </span>

        }
        </React.Fragment>

    )
}

export default News;
