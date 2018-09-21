import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { Alert } from "reactstrap";

import { Home } from "./components/Home";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Alert>Reactstrap and bootstrap v4 are installed</Alert>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/experience">Experience</Link>
            </li>
            <li>
              <Link to="/skills">Skills</Link>
            </li>
          </ul>
          <Route exact path="/" component={Home} />
          <Route path="/experience" component={Experience} />
          <Route path="/skills" component={Skills} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
