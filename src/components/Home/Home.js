import React from 'react';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import { HashLink } from 'react-router-hash-link';
import './Home.css';

export const Home = () => {
    return (
        <Jumbotron className="jumbotron-home text-white m-0">
            <Container>
                <Row className="justify-content-center">
                    <Col xs="4" md="3" lg="2">
                        <img src="/assets/images/portrait.jpg" alt="portrait" className="img-fluid rounded-circle" />
                    </Col>
                    <Col xs="12" md="9" lg="10" className="text-md-left text-center">
                        <h1>
                            <small>
                                <span>Damjan Kovačič</span>
                            </small>
                        </h1>
                        <h2>
                            <small>
                                <span>Software Engineer | Metalhead | LEGO fan | Slav</span>
                            </small>
                        </h2>
                        <p>
                            <span>
                                Since my introduction to programming in school I realized I want to do this for the rest
                                of my life. Since then, I have broadened my knowledge and experience to a wide spectrum
                                of technologies (see{' '}
                                <HashLink to="/#skills" className="text-light">
                                    <u>Skills</u>
                                </HashLink>
                                ) with emphasis on Web development.
                            </span>
                        </p>
                        <p>
                            <span>Feel free to contact me with your proposal!</span>
                        </p>
                        <p>
                            <span>Cheers!</span>
                        </p>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    );
};
