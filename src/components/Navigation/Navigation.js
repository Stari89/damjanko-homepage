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
import ReactGA from "react-ga";
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

    handleLogoClick() {
        ReactGA.event({ category: "nav", action: "logo-click" });
    }

    handleIntroductionClick() {
        ReactGA.event({
            category: "nav",
            action: "introduction-click"
        });
    }

    handleExperienceClick() {
        ReactGA.event({
            category: "nav",
            action: "experience-click"
        });
    }

    handleSkillsClick() {
        ReactGA.event({ category: "nav", action: "skills-click" });
    }

    handleSigninClick() {
        ReactGA.event({
            category: "nav",
            action: "signin-click"
        });
    }

    handleEmailClick() {
        ReactGA.event({ category: "nav", action: "email-click" });
    }

    handleLinkedInClick() {
        ReactGA.event({ category: "nav", action: "linkedin-click" });
    }

    handleFacebookClick() {
        ReactGA.event({ category: "nav", action: "facebook-click" });
    }

    handleGitHubClick() {
        ReactGA.event({ category: "nav", action: "github-click" });
    }

    handleGitLabClick() {
        ReactGA.event({ category: "nav", action: "gitlab-click" });
    }

    render() {
        return (
            <Navbar color="light" light expand="md" className="fixed-top">
                <Link
                    to="/"
                    className="navbar-brand"
                    onClick={this.handleLogoClick}
                >
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
                                onClick={this.handleIntroductionClick}
                            >
                                Introduction
                            </NavHashLink>
                        </NavItem>
                        <NavItem>
                            <NavHashLink
                                className="nav-link"
                                activeClassName="active"
                                to="/#experience"
                                onClick={this.handleExperienceClick}
                            >
                                Experience
                            </NavHashLink>
                        </NavItem>
                        <NavItem>
                            <NavHashLink
                                className="nav-link"
                                activeClassName="active"
                                to="/#skills"
                                onClick={this.handleSkillsClick}
                            >
                                Skills
                            </NavHashLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                href="http://career.damjanko.com"
                                target="_blank"
                                onClick={this.handleSigninClick}
                            >
                                Sign in
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink
                                href="mailto:letecnez@gmail.com"
                                className="p-1"
                                onClick={this.handleEmailClick}
                            >
                                <img
                                    src="/assets/images/ico-mail.svg"
                                    alt="E-mail"
                                />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                href="https://www.linkedin.com/in/damjanko/"
                                className="p-1"
                                target="_blank"
                                onClick={this.handleLinkedInClick}
                            >
                                <img
                                    src="/assets/images/ico-linkedin.svg"
                                    alt="LinkedIn"
                                />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                href="https://www.facebook.com/letecnez"
                                className="p-1"
                                target="_blank"
                                onClick={this.handleFacebookClick}
                            >
                                <img
                                    src="/assets/images/ico-facebook.svg"
                                    alt="Facebook"
                                />
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                href="https://gitlab.com/Stari89"
                                className="p-1"
                                target="_blank"
                                onClick={this.handleGitLabClick}
                            >
                                <img
                                    src="/assets/images/logo-gitlab.svg"
                                    alt="GitLab"
                                />
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}
