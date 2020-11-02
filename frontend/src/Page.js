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

import {Grid} from "@material-ui/core";

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
            <Router style={{ height: 'auto !important',  width: 'auto !important'}}>
                <Header />

                <div className='page'>
                    <div className='left'>
                        <Grid 
                        container 
                        justify="center"   
                        style={{width: "180px"}}
                        direction="column" 
                        >
                        <Grid item >
                        <ListItemLink justify="center" href="/home/home">Home</ListItemLink>
                        </Grid>
                        <Divider />
                        <Grid item>
                            <ListItemLink href='/home/invitation_sent'>Invitation Sent</ListItemLink>
                        </Grid>
                        <Divider />
                        <Grid item justify="center">
                        <ListItemLink href='/home/invitation_received'>Invitation Received</ListItemLink>
                        </Grid>
                        <Divider />
                        <Grid item justify="center">
                        <ListItemLink href='/home/upcoming_event'>Upcoming Event</ListItemLink>
                        </Grid>
                        <Divider />
                        <Grid item justify="center">
                        <ListItemLink href='/home/history'>History</ListItemLink>
                        </Grid>
                        <Divider />
                        <Grid item justify="center">
                        <ListItemLink href='/home/notification'>Notification</ListItemLink>
                        </Grid>
                        <Divider />
                        </Grid>
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




