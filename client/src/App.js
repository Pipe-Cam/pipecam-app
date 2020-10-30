import React, {useState} from 'react';
import Inspection from './pages/Inspection'
import Home from './pages/Home'
import Clients from './pages/Clients'
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

import Settings from './components/settings/SettingsHome'
import ActiveContext from './context/ActiveContext'

function App() {
  const [activeClientId, setActiveClientId] = useState(null)
  const [activeInspectionId, setActiveInspectionId] = useState(null)

  return (
    <Router>
      <div className="container pt-5">
        <Header />
        <div id="mainBody" className="container pt-5 mt-5">
            <Switch>
              <ActiveContext.Provider value={{activeClientId, setActiveClientId, activeInspectionId, setActiveInspectionId}}>
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/clients">
                  <Clients />
                </Route>
                <Route path="/inspection">
                  <Inspection />
                </Route>
                <Route path="/todo">
                  <Todo />
                </Route>
                <Route path="/settings">
                  <Settings />
                </Route>
              </ActiveContext.Provider>
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