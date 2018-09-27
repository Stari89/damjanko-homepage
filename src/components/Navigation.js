import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";

export const Navigation = () => {
	return (
		<Navbar>
			<NavbarBrand>
				<Link to="/">DamjanKo</Link>
			</NavbarBrand>
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
					<NavLink href="mailto:letecnez@gmail.com">Email</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="https://www.linkedin.com/in/damjanko/">
						LinkedIn
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="https://www.facebook.com/letecnez">Facebook</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="https://github.com/Stari89">GitHub</NavLink>
				</NavItem>
			</Nav>
		</Navbar>
	);
};
