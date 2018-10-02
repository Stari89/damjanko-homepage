import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

import { Home } from "./components/Home";
import { Experience } from "./components/Experience/Experience";
import { Skills } from "./components/Skills";
import { Navigation } from "./components/Navigation/Navigation";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<React.Fragment>
					<Navigation />
					<Home />
					<Experience />
					<Skills />
				</React.Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
