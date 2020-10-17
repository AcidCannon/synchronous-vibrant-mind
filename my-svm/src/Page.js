import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';
import { Route, MemoryRouter } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';


import Home from './components/home';
import InvitationSent from './components/invitation_sent.js';
import InvitationReceived from './components/invitation_received';
import UpcomingEvent from './components/upcoming_event';
import History from './components/history';
import Notification from './components/notification';
import './Page.css';

function ListItemLink(props) {
    const { primary, to } = props;

    const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
        [to],
    );

    return (
        <li>
            <ListItem button component={renderLink}>
                <ListItemText primary={primary} />
            </ListItem>
        </li>
    );
}

ListItemLink.propTypes = {
    // icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

// const useStyles = makeStyles({
//     root: {
//         width: 180,
//     },
//     // right:{
//     //     width: 180,
//     // }
// });

export default function ListRouter() {
    // const classes = useStyles();


    return (
        <MemoryRouter initialEntries={['/user/home']} initialIndex={0}>
            <div className='page'>
                <div className='left'>
                    {/*<Route>*/}
                    {/*    {({ location }) => (*/}
                    {/*        <Typography gutterBottom>Current route: {location.pathname}</Typography>*/}
                    {/*    )}*/}
                    {/*</Route>*/}
                    <Route>
                        <Paper elevation={0}>
                            <List aria-label="sidebar">
                                <ListItemLink  to="/user/home" primary="Home"  />
                                <Divider />
                                <ListItemLink to='/user/invitation_received' primary="Invitation Received"  />
                                <Divider />
                                <ListItemLink to="/user/invitation_sent" primary="Invitation Sent"  />
                                <Divider />
                                <ListItemLink to="/user/upcoming_event"  primary="Upcoming Event"  />
                                <Divider />
                                <ListItemLink to="/user/history" primary="History"  />
                                <Divider />
                                <ListItemLink to="/user/notification" primary="Notification"  />
                                <Divider />
                            </List>
                        </Paper>
                    </Route>
                </div>

                <div className='right'>
                    {/* 父目录的动态写法：this.props.match.url 在此处=/user/ */}
                    {/*<Route exact path={`${this.props.match.url}/`} component={Home} />*/}
                    <Route path='/user/home' component={Home} />
                    <Route path='/user/invitation_sent' component={InvitationSent} />
                    <Route path='/user/invitation_received' component={InvitationReceived} />
                    <Route path='/user/upcoming_event' component={UpcomingEvent} />
                    <Route path='/user/history' component={History} />
                    <Route path='/user/notification' component={Notification} />
                </div>

            </div>


        </MemoryRouter>
    );
}



