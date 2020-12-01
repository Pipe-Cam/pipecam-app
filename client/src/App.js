import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Inspection from './pages/Inspection'
import Home from './pages/Home'
import Report from './pages/Report'
import InspectionAccess from './components/worksheet_sections/InspectionAccess'
import Observations from './components/worksheet_sections/Observations'
import Clients from './pages/Clients'
import Header from './layout/Header'
import Footer from './layout/Footer'
import NewAccess from './components/inspection/NewAccess'
import Todo from './todo/Todo'
import Settings from './components/settings/SettingsHome'

import './components/form_elements/InputRadio.css'
import './App.css'

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
                <Route path="/access/:id">
                  <InspectionAccess />
                </Route>
                <Route path="/new-access/:id">
                  <NewAccess />
                </Route>
                <Route path="/observations">
                  <Observations />
                </Route>
                <Route path="/report">
                  <Report />
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