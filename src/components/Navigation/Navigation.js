import React from "react";
import {
	Navbar,
	Nav,
	NavItem,
	NavLink,
	Collapse,
	NavbarToggler
} from "reactstrap";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import "./Navigation.css";

export class Navigation extends React.Component {
	constructor(props) {
		super(props);

		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.state = { collapsed: true };
	}

	toggleNavbar() {
		this.setState({ collapsed: !this.state.collapsed });
	}

	render() {
		return (
			<Navbar color="light" light expand="md" className="fixed-top">
				<Link to="/" className="navbar-brand">
					<img
						src="/assets/images/logo.svg"
						className="img-fluid logo mr-3"
						alt="logo"
					/>
					DamjanKo.com
				</Link>
				<NavbarToggler onClick={this.toggleNavbar} />
				<Collapse isOpen={!this.state.collapsed} navbar>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavHashLink
								className="nav-link"
								activeClassName="active"
								to="/#introduction"
								exact
							>
								Introduction
							</NavHashLink>
						</NavItem>
						<NavItem>
							<NavHashLink
								className="nav-link"
								activeClassName="active"
								to="/#experience"
							>
								Experience
							</NavHashLink>
						</NavItem>
						<NavItem>
							<NavHashLink
								className="nav-link"
								activeClassName="active"
								to="/#skills"
							>
								Skills
							</NavHashLink>
						</NavItem>
					</Nav>
					<Nav className="ml-auto" navbar>
						<NavItem>
							<NavLink href="mailto:letecnez@gmail.com" className="p-1">
								<img src="/assets/images/ico-mail.svg" alt="E-mail" />
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								href="https://www.linkedin.com/in/damjanko/"
								className="p-1"
								target="_blank"
							>
								<img src="/assets/images/ico-linkedin.svg" alt="LinkedIn" />
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								href="https://www.facebook.com/letecnez"
								className="p-1"
								target="_blank"
							>
								<img src="/assets/images/ico-facebook.svg" alt="Facebook" />
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								href="https://github.com/Stari89"
								className="p-1"
								target="_blank"
							>
								<img src="/assets/images/ico-github.svg" alt="GitHub" />
							</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		);
	}
}
