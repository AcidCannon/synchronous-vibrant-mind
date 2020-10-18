import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Link } from 'react-router-dom'; //引入路由模块
import Page from './Page';
import Login from './Login';
import Header from "./Header";
import Home from "./components/home";
import InvitationSent from "./components/invitation_sent";
import InvitationReceived from "./components/invitation_received";
import UpcomingEvent from "./components/upcoming_event";
import History from "./components/history";
import Notification from "./components/notification";


function App() {
  return (
    <Router>
      <div>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Page} />
      </div>
    </Router>
  );
}

export default App;

