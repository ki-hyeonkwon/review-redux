import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Detail from "../routes/detail";
import Home from "../routes/home";

const App = props => {
  return (
    <Router>
      <Route path="/" exact component={Home}></Route>
      <Route path="/:id" component={Detail}></Route>
    </Router>
  );
};

export default App;
