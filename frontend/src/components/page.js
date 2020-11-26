import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import {Grid} from "@material-ui/core";
import Home from './home';
import InvitationSent from './invitation_sent.js';
import InvitationReceived from './invitation_received';
import UpcomingEvent from './upcoming_event';
import History from './history';
import Notification from './notification';
import Header from "./header";
import '../css/page.css';


import Webrtc from "./webrtc";

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
                        <Grid item>
                            <ListItemLink justify="center" href="/vibrant-minds-together/home">Home</ListItemLink>
                        </Grid>
                            <Divider />
                            <Grid item>
                                <ListItemLink href='/vibrant-minds-together/invitation_sent'>Invitations Sent</ListItemLink>
                            </Grid>
                            <Divider />
                            <Grid item>
                                <ListItemLink href='/vibrant-minds-together/invitation_received'>Invitations Received</ListItemLink>
                            </Grid>
                            <Divider />
                            <Grid item>
                                <ListItemLink href='/vibrant-minds-together/upcoming_event'>Upcoming Events</ListItemLink>
                            </Grid>
                            <Divider />
                            <Grid item >
                                <ListItemLink href='/vibrant-minds-together/history'>History</ListItemLink>
                            </Grid>
                            <Divider />
                            <Grid item>
                                <ListItemLink href='/vibrant-minds-together/notification'>Notifications</ListItemLink>
                        </Grid>
                        <Divider />
                        </Grid>
                    </div>
                    <div className='right'>
                        {/* 父目录的动态写法：this.props.match.url 在此处=/user/ */}
                        <Route path='/vibrant-minds-together/home' component={Home} />
                        <Route path='/vibrant-minds-together/invitation_sent' component={InvitationSent} />
                        <Route path='/vibrant-minds-together/invitation_received' component={InvitationReceived} />
                        <Route path='/vibrant-minds-together/upcoming_event' component={UpcomingEvent} />
                        <Route path='/vibrant-minds-together/history' component={History} />
                        <Route path='/vibrant-minds-together/notification' component={Notification} />
                    </div>
                </div>
            </Router>
        );
    }
}
export default Page;



