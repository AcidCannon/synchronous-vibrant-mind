import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
import {Divider} from "@material-ui/core";
import IntegrationAutosuggest from './home_select_player';
import InlineTimePickerDemo from "./home_select_date";
import Button from "@material-ui/core/Button";

import { AccountCircle, LockRounded } from "@material-ui/icons";
import { Grid, InputAdornment, TextField } from "@material-ui/core";

const styles = {
    paper:{
        marginTop:10,
        marginBottom:10,
        padding: 50,

    }
}

// const useStyles = makeStyles((theme) => ({
//
//     paper: {
//         padding: 300,
//         textAlign: 'center',
//         color: theme.palette.text.secondary,
//     },
// }));

async function sendInvitation(my_email, player_email, game_start_time){
    const response = await fetch("http://localhost/api/addInvitation", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inviter_email: my_email, invitee_email: player_email, status: "PENDING", start_time: game_start_time })
        }).then(async response => {
        const result = await response.json();

        // check for error response
        if (!response.ok) {
            // get error message from body or default to response status
            const error = (result && result.message) || response.status;
                return Promise.reject(error);
            }
    
            
        console.log("login successful");

        }).catch(error => {
                console.error('There was an error!', error);
        });
}

export default function Home() {
    // const classes = useStyles();
    return (
        <div>
            <Grid  
            justify="center" 
            item 
            xs={12} 
            alignItems="center" 
            direction="column" 
            >
            {/*<Paper className={classes.paper}>*/}
                <Paper 
                style={styles.paper}
                >
                    <Grid 
                    container
                    xs={12} 
                    sm={12}
                    alignItems="center" 
                    direction="column" 
                    justify="space-between"
                    style={{color: "#3291ff" }}
                    >
                        <div />
                        <div>
                            <Grid container justify="center">
                                <h1>Send Invitation</h1>
                            </Grid>
                            <div style={{height: 20}} />
                            <h3>Add a player</h3>
                            <Divider/>
                            <div style={{height: 20}} />
                            <IntegrationAutosuggest />
                            <h3>Select the start time</h3>
                            <Divider/>
                            <InlineTimePickerDemo/>
                             
                        </div>
                        
                        
                    </Grid>
                
                <Grid container justify="flex-end">
                    <Button variant="contained" color="primary" onClick={()=> {sendInvitation()}}>Sent</Button>
                </Grid>
                
                </Paper>
                
            </Grid>
        
        </div>
        
    );
}