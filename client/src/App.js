import React from 'react';
import Inspection from './pages/Inspection'

import {
  BrowserRouter as Router,
  Routes,
  Link,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom'

function App() {
  return (
    <div>
      <div>
        <Inspection />
      </div>
    </div>
  );
}

export default App;
