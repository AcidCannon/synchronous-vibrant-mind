import React, { Component } from 'react';
import './css/user.css';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';

import Home from './user/home';
import InvitationSent from './user/invitation_sent.js';
import InvitationReceived from './user/invitation_received';
import UpcomingEvent from './user/upcoming_event';
import History from './user/history';
import Notification from './user/notification';

class User extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render() {
      return (
        <Router>
        <div className='user'>
          <div className='left'>
            <Link to='/user/'>Home</Link><br/>
            <Link to='/user/invitation_sent'>Invitation Sent</Link><br/>
            <Link to='/user/invitation_received'>Invitation Received</Link><br/>
            <Link to='/user/upcoming_event'>Upcoming Event</Link><br/>
            <Link to='/user/history'>History</Link><br/>
            <Link to='/user/notification'>Notification</Link>
          </div>

          <div className='right'>
            {/* 父目录的动态写法：this.props.match.url 在此处=/user/ */}
            <Route exact path={`${this.props.match.url}/`} component={Home} />
            <Route path='/user/invitation_sent' component={InvitationSent} />
            <Route path='/user/invitation_received' component={InvitationReceived} />
            <Route path='/user/upcoming_event' component={UpcomingEvent} />
            <Route path='/user/history' component={History} />
            <Route path='/user/notification' component={Notification} />
          </div>
        </div>
      </Router>
      );
    }
  }
  export default User;