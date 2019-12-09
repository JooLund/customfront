import React from 'react'
import appContext from '../context/appContext';

import no_image from '../static/no_image.png';

import { Newstype } from '../types/News';

import { Spinner, Alert, Card, CardColumns } from 'react-bootstrap';


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
                <CardColumns>
                    {appData.news.map((news: Newstype, idx: number) =>{
                        return(
                            <Card className="card text-white bg-dark" key={idx}>
                                <Card.Body>
                                    <Card.Title>
                                        <p><small>{news.title} <a href={news.link} target="_blank" rel="noopener noreferrer" className='card-link'>Open</a></small></p>
                                    </Card.Title>

                                    <Card.Subtitle className="card-subtitle mb-2 text-muted">
                                        <small>Published: {news.date} Source: {news.source}</small>
                                    </Card.Subtitle>

                                    <Card.Img onError={(e: any) => {showDefault(e)}} src={news.img} className='mx-auto d-block w-75' alt='No picture'></Card.Img>
                                </Card.Body>
                            </Card>
                        )

                    })}


                </CardColumns>  


            }
            </span>

        }
        </React.Fragment>

    )
}

export default News;