import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header, Footer, UpdateNote } from '../pages'



function App() {
  return (
      <Router>
          <Switch>
              <Route
                  path="/notes/update/:id"
                  exact
                  component={UpdateNote}
              />
          </Switch>
          <Header />
          <Footer />
      </Router>
  )
}

export default App;