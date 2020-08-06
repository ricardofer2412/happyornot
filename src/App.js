import React from 'react'
import Faces from './Faces/Faces'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Dashboard from './Dashboard/Dashboard';

class App extends React.Component {
  render() {
    return (

      <Router>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/" component={Faces} />
      </Router>




    )
  }
}

export default App