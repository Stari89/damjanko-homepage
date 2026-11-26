import React from "react";
import { Container, Row, Col, Badge } from "reactstrap";
import { Article } from "./../Article";
import "./Experience.css";
import data from "./../../data";

const renderContent = content => {
	return (
		<React.Fragment>
			{content.map(section => {
				if (section.type === "Row") {
					return <Row key={section.key}>{renderContent(section.content)}</Row>;
				}
				if (section.type === "EmploymentPanel") {
					return (
						<EmploymentPanel
							key={section.key}
							startedDate={section.startedDate}
							companyName={section.companyName}
							companyPosition={section.companyPosition}
							companyLogoSrc={section.companyLogoSrc}
						>
							{renderContent(section.content)}
						</EmploymentPanel>
					);
				}
				if (section.type === "EmploymentTag") {
					return <EmploymentTag key={section.key} content={section.content} />;
				}
				return <Article key={section.key} section={section} />;
			})}
		</React.Fragment>
	);
};

export const Experience = () => {
	return <Container>{renderContent(data.experience.content)}</Container>;
};

const EmploymentPanel = props => {
	return (
		<Row className="justify-content-center">
			<Col
				xs="6"
				md="3"
				className="my-3 my-md-1 text-center order-2 order-md-3"
			>
				<img
					className="img-fluid"
					src={props.companyLogoSrc}
					alt={props.companyName}
				/>
			</Col>
			<Col
				xs="12"
				md="7"
				className="text-md-left text-center employment order-3 order-md-2"
			>
				<h4>{props.companyPosition}</h4>
				<p>{props.companyName}</p>
				<p>{props.children}</p>
				<hr className="py-3" />
			</Col>
			<Col xs="12" md="2" className="text-md-right text-center order-1">
				{props.startedDate}
			</Col>
		</Row>
	);
};

const EmploymentTag = props => {
	return (
		<Badge color="info" className="mr-1">
			{props.content}
		</Badge>
	);
};
