import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './screens/Home';
import Repl from './screens/Repl';

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/">
          <Home />
        </Route>
        <Route path="/machines/:id">
          <Repl />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
