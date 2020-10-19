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
          {/*<Route path='/home/home' component={Home} />*/}
          {/*<Route path='/home/invitation_sent' component={InvitationSent} />*/}
          {/*<Route path='/home/invitation_received' component={InvitationReceived} />*/}
          {/*<Route path='/home/upcoming_event' component={UpcomingEvent} />*/}
          {/*<Route path='/home/history' component={History} />*/}
          {/*<Route path='/home/notification' component={Notification} />*/}
      </div>
    </Router>
  );
}

export default App;

