import React from 'react';
import Inspection from './pages/Inspection'
import Home from './pages/Home'
import Header from './layout/Header'
import Footer from './layout/Footer'

import './components/form_elements/InputRadio.css'
import './App.css'


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
      <div className="bg">
        <Header />
        <div id="mainBody" className="container">
            <Switch>
              <Route path="/" exact>
                <Home />
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
