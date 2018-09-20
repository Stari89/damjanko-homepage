import React, { Component } from "react";
import Alert from "react-bootstrap/lib/Alert";

class App extends Component {
	render() {
		return (
			<div className="App">
				<p>Damjan Kovačič</p>
				<Alert bsSize="danger">Test</Alert>
			</div>
		);
	}
}

export default App;
