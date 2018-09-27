import React from "react";
import { Col } from "reactstrap";
import "./Skill.css";
export const Skill = props => {
	return (
		<Col xs="3" sm="2" lg="1" className="py-3">
			<div className="skill-image mb-2">
				<img src={props.logoSrc} className="img-fluid" alt={props.content} />
			</div>
			<div className="text-center font-weight-bold">{props.content}</div>
		</Col>
	);
};
