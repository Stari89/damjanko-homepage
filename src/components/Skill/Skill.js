import React from "react";
import { Col } from "reactstrap";
import "./Skill.css";

export class Skill extends React.Component {
  constructor(props) {
    super(props);

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.state = { mouseOver: false };
  }

  handleMouseEnter() {
    console.log("mouseEnter");
    this.setState({ mouseOver: true });
  }

  handleMouseLeave() {
    console.log("mouseLeave");
    this.setState({ mouseOver: false });
  }

  render() {
    return (
      <Col
        xs="3"
        sm="2"
        lg="1"
        className={this.state.mouseOver ? "py-3 popout" : "py-3"}
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
