import React, { useLayoutEffect, useState, Component} from 'react';
import './css/app.css';
import { BrowserRouter as Router, Route,Link } from 'react-router-dom'; //引入路由模块
import Page from './components/page';
import Login from './components/login';
// import ReactResizeDetector from 'react-resize-detector'
import Webrtc from "./components/webrtc";

export default class App extends Component{
  constructor() {
    super();
    this.state = {
        username: null,
        password: null,
        email: null,
        login: false,
        errorMessage: null,
        clicked: null
        // loginErrors: null
    };
  }
    
  render(){
    return (
      <Router style={{ height: 'auto !important',  width: 'auto !important'}}>
        <div>
            <Route exact path="/" component={Login} />
            <Route path="/vibrant-minds-together" component={Page} />
            <Route path="/webrtc" component={Webrtc} />
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
}


