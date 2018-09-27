import React from "react";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import "./Navigation.css";

export const Navigation = () => {
	return (
		<Navbar>
			<Nav>
				<NavItem>
					<Link to="/">DamjanKo</Link>
				</NavItem>
			</Nav>
			<Nav>
				<NavItem>
					<Link className="nav-link" to="/experience">
						Experience
					</Link>
				</NavItem>
				<NavItem>
					<Link className="nav-link" to="/skills">
						Skills
					</Link>
				</NavItem>
			</Nav>
			<Nav>
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
		</Navbar>
	);
};
