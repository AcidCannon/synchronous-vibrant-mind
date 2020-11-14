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

async function sentNotification(inviter, invitee, clicked_status, id){
  if (clicked_status == "PENDING"){
    var player_content = "You have successfully sent your invitation to " + invitee;
  }else if (clicked_status == "DECLINED"){
    var player_content = invitee + " is bussy";
  }
  const response = await fetch("http://localhost/api/sendNotification", {
    method: "POST",
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: inviter, invitation_id: id, content: player_content})
    }).then(async response => {
      const data = await response.json();
      console.log('sendNotification body',JSON.stringify({ username: inviter, invitation_id: id, content: player_content}));
      // check for error response
      if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
      }
  }).catch(error => {
      console.error('There was an error!', error);
  });
 
}

async function checkTimeConflict(player_name, player_email, game_start_time){
        const response = await fetch("http://localhost/api/isTimeConflict", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: player_name, email: player_email, start_time: game_start_time})
        }).then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            return data.conflict
            
            
            console.log("successful", data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
        
    }

async function addInvitation(my_email, my_name, player_name, player_email, invitation_status, game_start_time){
        const response = await fetch("http://localhost/api/addInvitation", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inviter_email: my_email, invitee_email: player_email, status: invitation_status, start_time: game_start_time })
        }).then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            sentNotification(my_name, player_name, invitation_status, data.id);
            
            console.log("successful", data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
        
    }

async function checkPlayerExist(player_email){
        const response = await fetch("http://localhost/api/checkPlayerExist", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email : player_email })
        }).then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            var player_exist = data.exist;
            var player_name = null;
            if(player_exist){
                player_name = data.info.name;
            }

            return JSON.stringify({ exist : player_exist, name : player_name });
            
            console.log("successful", data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
        
    }


async function sendInvitation(my_name, my_email, player_email, game_start_time){
    

    var result = checkPlayerExist(player_email);
    if(result.exist){
        if(!checkTimeConflict(my_name, my_email, game_start_time) && !checkTimeConflict(result.name, player_email, game_start_time)){
            addInvitation(my_email, my_name, result.name, player_email, "PENDING", game_start_time);
        }
        else{
            //弹窗提醒
            addInvitation(my_email, my_name, result.name, player_email, "FAILED", game_start_time);
        }
    }
    else{
        //给inviter发邮件
        //给invitee发邮件
        addInvitation(my_email, my_name, result.name, player_email, "FAILED", game_start_time);
    }


    // const response = await fetch("http://localhost/api/addInvitation", {
    //     method: "POST",
    //     headers: { 
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ inviter_email: my_email, invitee_email: player_email, status: "PENDING", start_time: game_start_time })
    //     }).then(async response => {
    //     const result = await response.json();

    //     // check for error response
    //     if (!response.ok) {
    //         // get error message from body or default to response status
    //         const error = (result && result.message) || response.status;
    //             return Promise.reject(error);
    //         }
    
            
    //     console.log("login successful");

    //     }).catch(error => {
    //             console.error('There was an error!', error);
    //     });
}

export default function Home() {
    // const classes = useStyles();
    const username = document.cookie.match('(^|;) ?' + "User name" + '=([^;]*)(;|$)');
    const x_username = unescape(username[2]);
    const my_name = x_username.slice(9,-2);
    const email = document.cookie.match('(^|;) ?' + "email" + '=([^;]*)(;|$)');
    const x_email = unescape(email[2]);
    const my_email = x_email.slice(10,-2);

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
                    <Button variant="contained" color="primary" onClick={()=> {sendInvitation(my_name, my_email, player_email, game_start_time)}}>Sent</Button>
                </Grid>
                
                </Paper>
                
            </Grid>
        
        </div>
        
    );
}