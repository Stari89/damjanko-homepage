import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Home } from "./components/Home";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Navigation } from "./components/Navigation/Navigation";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<Navigation />
					<Route exact path="/" component={Home} />
					<Route path="/experience" component={Experience} />
					<Route path="/skills" component={Skills} />
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
