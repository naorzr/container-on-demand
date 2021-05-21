import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <div>
            <h1>Hello</h1>

          </div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
