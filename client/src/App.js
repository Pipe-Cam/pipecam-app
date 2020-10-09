import React from 'react';
import Inspection from './pages/Inspection'
import Dashboard from './pages/Dashboard'
import Header from './layout/Header'
import Footer from './layout/Footer'


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div id="mainBody" className="container">
            <Switch>
              <Route path="/" exact>
                <Dashboard />
              </Route>
              <Route path="/inspection/:mode">
                <Inspection />
              </Route>
            </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
