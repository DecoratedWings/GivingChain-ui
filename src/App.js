import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import Driver from './components/pages/Driver';
import Donor from './components/pages/Donor';
import NGO from './components/pages/NGO';
import Recipient from './components/pages/Recipient';
import Admin from './components/pages/Admin';


function App() {
  // document.bgColor='#F5F0EF'
  return (
    <div className="App">

      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/donor" exact component={Donor}/>
          <Route path="/driver" exact component={Driver}/>
          <Route path="/ngo" exact component={NGO}/>
          <Route path="/recipient" exact component={Recipient}/>
          <Route path="/admin" exact component={Admin}/>
        </Switch>
      </Router>
    </div>
    
  );
}

export default App;
