import React from 'react';
import Inspection from './pages/Inspection'
import Home from './pages/Home'
import Clients from './pages/Clients'
import InspectionHome from './components/inspection/InspectionHome'
import Header from './layout/Header'
import Footer from './layout/Footer'

import './components/form_elements/InputRadio.css'
import './App.css'

import Todo from './todo/Todo'

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
      <div className="container pt-5">
        <Header />
        <div id="mainBody" className="container pt-5 mt-5">
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/clients">
                <Clients />
              </Route>
              <Route path="/inspection/:mode">
                <Inspection />
              </Route>
              <Route path="/todo">
                <Todo />
              </Route>
            </Switch>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;



/*
  Nav tree after login                           

  - Clients
  -> New Client
  -> Update Client

  - Inspections
    -> Select Client
    ---> Add new client
*/