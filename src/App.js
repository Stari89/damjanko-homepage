import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactGA from "react-ga";
import config from "react-global-configuration";
import "./App.css";
import "./config/index";

import { Home } from "./components/Home/Home";
import { Experience } from "./components/Experience/Experience";
import { Skills } from "./components/Skills";
import { Navigation } from "./components/Navigation/Navigation";
import { Footer } from "./components/Footer";

ReactGA.initialize(config.get("gaKey"));

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<React.Fragment>
					<header>
						<Navigation />
					</header>
					<section className="page-section" id="introduction">
						<Home />
					</section>
					<section className="page-section" id="experience">
						<Experience />
					</section>
					<section className="page-section" id="skills">
						<Skills />
					</section>
					<footer className="bg-dark text-light">
						<Footer />
						<p className="text-center text-secondary m-0 mx-2">
							{config.get("appVer")}
						</p>
					</footer>
				</React.Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
