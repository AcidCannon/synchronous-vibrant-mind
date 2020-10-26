import React, { Component } from 'react';
import './Page.css';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";

import Home from './components/home';
import InvitationSent from './components/invitation_sent.js';
import InvitationReceived from './components/invitation_received';
import UpcomingEvent from './components/upcoming_event';
import History from './components/history';
import Notification from './components/notification';
import Header from "./Header";

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

class Page extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render() {
        return (
            <Router>
                <Header />

                <div className='page'>
                    <div className='left'>
                        <ListItemLink href="/home/home">Home</ListItemLink>
                        <Divider />
                        <ListItemLink href='/home/invitation_sent'>Invitation Sent</ListItemLink>
                        <Divider />
                        <ListItemLink href='/home/invitation_received'>Invitation Received</ListItemLink>
                        <Divider />
                        <ListItemLink href='/home/upcoming_event'>Upcoming Event</ListItemLink>
                        <Divider />
                        <ListItemLink href='/home/history'>History</ListItemLink>
                        <Divider />
                        <ListItemLink href='/home/notification'>Notification</ListItemLink>
                        <Divider />
                    </div>
                    <div className='right'>
                        {/* 父目录的动态写法：this.props.match.url 在此处=/user/ */}
                        <Route path='/home/home' component={Home} />
                        <Route path='/home/invitation_sent' component={InvitationSent} />
                        <Route path='/home/invitation_received' component={InvitationReceived} />
                        <Route path='/home/upcoming_event' component={UpcomingEvent} />
                        <Route path='/home/history' component={History} />
                        <Route path='/home/notification' component={Notification} />
                    </div>
                </div>
            </Router>
        );
    }
}
export default Page;




