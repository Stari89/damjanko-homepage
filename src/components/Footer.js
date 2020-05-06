import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { HashLink } from 'react-router-hash-link';
import ReactGA from 'react-ga';

export class Footer extends React.Component {
    handleIntroductionClick() {
        ReactGA.event({ category: 'footer', action: 'introduction-click' });
    }

    handleExperienceClick() {
        ReactGA.event({ category: 'footer', action: 'experience-click' });
    }

    handleSkillsClick() {
        ReactGA.event({ category: 'footer', action: 'skills-click' });
    }

    handleEmailClick() {
        ReactGA.event({ category: 'footer', action: 'email-click' });
    }

    handleLinkedInClick() {
        ReactGA.event({ category: 'footer', action: 'linkedin-click' });
    }

    handleFacebookClick() {
        ReactGA.event({ category: 'footer', action: 'facebook-click' });
    }

    handleInstagramClick() {
        ReactGA.event({ category: 'footer', action: 'instagram-click' });
    }

    handleYoutubeClick() {
        ReactGA.event({ category: 'footer', action: 'youtube-click' });
    }

    handleGitHubClick() {
        ReactGA.event({ category: 'footer', action: 'github-click' });
    }

    render() {
        return (
            <Container>
                <Row className="py-4">
                    <Col xs="12" md="6">
                        <h3>
                            <small>About</small>
                        </h3>
                        <p>
                            This site was built with React.js. It is hosted by an Apache server, running on my personal
                            NAS device.
                        </p>
                        <p>
                            <a
                                href="https://github.com/Stari89/damjanko-homepage"
                                className="text-light"
                                onClick={this.handle}
                            >
                                <u>Pull this project from GitHub!</u>
                            </a>
                        </p>
                    </Col>
                    <Col xs="6" md="3">
                        <h3>
                            <small>Navigation</small>
                        </h3>
                        <ul className="list-unstyled">
                            <li>
                                <HashLink
                                    to="/#introduction"
                                    className="text-light"
                                    onClick={this.handleIntroductionClick}
                                >
                                    <u>Introduction</u>
                                </HashLink>
                            </li>
                            <li>
                                <HashLink to="/#experience" className="text-light" onClick={this.handleExperienceClick}>
                                    <u>Experience</u>
                                </HashLink>
                            </li>
                            <li>
                                <HashLink to="/#skills" className="text-light" onClick={this.handleSkillsClick}>
                                    <u>Skills</u>
                                </HashLink>
                            </li>
                        </ul>
                    </Col>
                    <Col xs="6" md="3">
                        <h3>
                            <small>Contact and social media</small>
                        </h3>
                        <ul className="list-unstyled">
                            <li>
                                <a
                                    href="mailto:letecnez@gmail.com"
                                    className="text-light"
                                    onClick={this.handleEmailClick}
                                >
                                    <u>Email</u>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/in/damjanko/"
                                    className="text-light"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={this.handleLinkedInClick}
                                >
                                    <u>LinkedIn</u>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.facebook.com/letecnez"
                                    className="text-light"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={this.handleFacebookClick}
                                >
                                    <u>Facebook</u>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.instagram.com/letecnez"
                                    className="text-light"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={this.handleInstagramClick}
                                >
                                    <u>Instagram</u>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.youtube.com/user/Stari89"
                                    className="text-light"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={this.handleYoutubeClick}
                                >
                                    <u>YouTube</u>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/Stari89"
                                    className="text-light"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={this.handleGitHubClick}
                                >
                                    <u>GitHub</u>
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        );
    }
}
