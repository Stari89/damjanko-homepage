import React from "react";
import { Container, Row, Col } from "reactstrap";
import { HashLink } from "react-router-hash-link";

export const Footer = props => {
	return (
		<Container>
			<Row className="py-4">
				<Col xs="12" md="6">
					<h3>
						<small>About</small>
					</h3>
					<p>
						This site was built with React.js. It is hosted by an Apache server,
						running on my personal NAS device.
					</p>
					<p>
						<a
							href="https://github.com/Stari89/damjanko-homepage"
							className="text-light"
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
							<HashLink to="/#introduction" className="text-light">
								<u>Introduction</u>
							</HashLink>
						</li>
						<li>
							<HashLink to="/#experience" className="text-light">
								<u>Experience</u>
							</HashLink>
						</li>
						<li>
							<HashLink to="/#skills" className="text-light">
								<u>Skills</u>
							</HashLink>
						</li>
					</ul>
				</Col>
				<Col xs="6" md="3">
					<h3>
						<small>Contact me</small>
					</h3>
					<ul className="list-unstyled">
						<li>
							<a href="mailto:letecnez@gmail.com" className="text-light">
								<u>Email</u>
							</a>
						</li>
						<li>
							<a
								href="https://www.linkedin.com/in/damjanko/"
								className="text-light"
								target="_blank"
								rel="noopener noreferrer"
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
							>
								<u>Facebook</u>
							</a>
						</li>
						<li>
							<a
								href="https://github.com/Stari89"
								className="text-light"
								target="_blank"
								rel="noopener noreferrer"
							>
								<u>GitHub</u>
							</a>
						</li>
					</ul>
				</Col>
			</Row>
		</Container>
	);
};
