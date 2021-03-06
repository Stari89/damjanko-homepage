import React from "react";
import { Col } from "reactstrap";
import ReactGA from "react-ga";
import "./Skill.css";

export class Skill extends React.Component {
	constructor(props) {
		super(props);

		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.state = { mouseOver: false };
	}

	handleMouseEnter() {
		this.setState({ mouseOver: true });
		ReactGA.event({
			category: "skill",
			action: "mouse-enter",
			label: this.props.content
		});
	}

	handleMouseLeave() {
		this.setState({ mouseOver: false });
		ReactGA.event({
			category: "skill",
			action: "mouse-leave",
			label: this.props.content
		});
	}

	render() {
		const skillClass = "skill py-3 rounded skill-" + this.props.skillValue;
		return (
			<Col
				xs="3"
				sm="2"
				lg="1"
				className={
					this.state.mouseOver ? skillClass + " popout shadow" : skillClass
				}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
			>
				<div className="skill-image mb-2">
					<img
						src={this.props.logoSrc}
						className="img-fluid"
						alt={this.props.content}
					/>
				</div>
				<div className="text-center font-weight-bold">{this.props.content}</div>
			</Col>
		);
	}
}
