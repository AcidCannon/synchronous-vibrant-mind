import React, { Component }  from 'react';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Divider } from "@material-ui/core";
import IntegrationAutosuggest from './home_select_player';
import InlineTimePickerDemo from "./home_select_date";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import moment from 'moment';
import * as emailjs from 'emailjs-com';
import { Alert, AlertTitle } from '@material-ui/lab';
import '../css/home.css';

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

// async function sentNotification(inviter, invitee, clicked_status, id){
//     if (clicked_status == "PENDING"){
//       var inviter_content = "You have successfully sent your invitation to " + invitee;
//       var invitee_content = inviter + " send you an invitation";
//     }else if (clicked_status == "FAILED"){
//       var inviter_content = invitee + " is busy";
//     }

//     // Inviter will receive an notification
//     const response = await fetch("http://localhost/api/sendNotification", {
//       method: "POST",
//         headers: { 
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username: inviter, invitation_id: id, content: inviter_content})
//       }).then(async response => {
//         const data = await response.json();
//         console.log('sendNotification body',JSON.stringify({ username: inviter, invitation_id: id, content: inviter_content}));
//         // check for error response
//         if (!response.ok) {
//             // get error message from body or default to response status
//             const error = (data && data.message) || response.status;
//             return Promise.reject(error);
//         }

//         console.log("successful Notification", data);


//     }).catch(error => {
//         console.error('There was an error!', error);
//     });

//     // Invitee will receive an notification if the invitation is sent successfully
//     if (clicked_status == "PENDING"){
//         const response = await fetch("http://localhost/api/sendNotification", {
//         method: "POST",
//             headers: { 
//             'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ username: invitee, invitation_id: id, content: invitee_content})
//         }).then(async response => {
//             const data = await response.json();
//             console.log('sendNotification body',JSON.stringify({ username: invitee, invitation_id: id, content: invitee_content}));
//             // check for error response
//             if (!response.ok) {
//                 // get error message from body or default to response status
//                 const error = (data && data.message) || response.status;
//                 return Promise.reject(error);
//             }

//             console.log("successful Notification", data);


//         }).catch(error => {
//             console.error('There was an error!', error);
//         });
//     }

   
//   }
  
//   async function checkTimeConflict(player_name, player_email, game_start_time){
//           return await fetch("http://localhost/api/isTimeConflict", {
//               method: "POST",
//               headers: { 
//                   'Content-Type': 'application/json'
//               },
//               body: JSON.stringify({ name: player_name, email: player_email, start_time: game_start_time})
//           }).then(async response => {
//               const data = await response.json();
  
//               // check for error response
//               if (!response.ok) {
//                   // get error message from body or default to response status
//                   const error = (data && data.message) || response.status;
//                   return Promise.reject(error);
//               }
  
//               console.log("game_start_time", game_start_time);
//               console.log("isConflict", data);
//               return data.conflict
              
//           })
//           .catch(error => {
//               console.error('There was an error!', error);
//           });
          
//       }
  
//   async function addInvitation(my_email, my_name, player_name, player_email, invitation_status, game_start_time){
//           const response = await fetch("http://localhost/api/addInvitation", {
//               method: "POST",
//               headers: { 
//                   'Content-Type': 'application/json'
//               },
//               body: JSON.stringify({ inviter_email: my_email, invitee_email: player_email, status: invitation_status, start_time: game_start_time })
//           }).then(async response => {
//               const data = await response.json();
  
//               // check for error response
//               if (!response.ok) {
//                   // get error message from body or default to response status
//                   const error = (data && data.message) || response.status;
//                   return Promise.reject(error);
//               }
  
//               sentNotification(my_name, player_name, invitation_status, data.invitation_id);
//               console.log("successful addInvitation", data);
              
              
//           })
//           .catch(error => {
//               console.error('There was an error!', error);
//           });
          
//       }
  
//   async function checkPlayerExist(player_email){
//           return  await fetch("http://localhost/api/checkPlayerExist", {
//               method: "POST",
//               headers: { 
//                   'Content-Type': 'application/json'
//               },
//               body: JSON.stringify({ email : player_email })
//           }).then(async response => {
//               const data = await response.json();
  
//               // check for error response
//               if (!response.ok) {
//                   // get error message from body or default to response status
//                   const error = (data && data.message) || response.status;
//                   return Promise.reject(error);
//               }
  
//               var player_exist = data.exist;
//               var player_name = null;
//               if(player_exist){
//                   player_name = data.info.name;
//               }
  
//             return { exist : player_exist, name : player_name };
              
//           })
//           .catch(error => {
//               console.error('There was an error!', error);
//           });
          
//       }
  
  
//   async function sendInvitation(my_name, my_email, player_email, game_start_time){
      

//       const result = await checkPlayerExist(player_email);
//       console.log("result", result);
//       console.log("result.exist", result["exist"]);
//       console.log("result.name", result["name"]);
//       var gameDate = moment.utc(game_start_time).format('YYYY-MM-DD').toString();
//       var gameTime = moment.utc(game_start_time).format('hh:mm:ss').toString();
//       const game_date_time = gameDate + " " + gameTime;
//       console.log("gameDate", gameDate);
//       console.log("gameTime", gameTime);
//       console.log("game_date_time", game_date_time);
//       const my_timeConflict = await checkTimeConflict(my_name, my_email, game_start_time);
//       console.log("my_timeConflict", my_timeConflict);
//       console.log("!my_timeConflict", !my_timeConflict);
//       const player_timeConflict = await checkTimeConflict(result.name, player_email, game_start_time);
//       console.log("player_timeConflict", player_timeConflict);
//       console.log("!player_timeConflict", !player_timeConflict);
//       if(result["exist"]){
//           if( !my_timeConflict && !player_timeConflict ){
//               addInvitation(my_email, my_name, result["name"], player_email, "PENDING", game_start_time);
//           }
//           else{
//               //弹窗提醒
//               addInvitation(my_email, my_name, result["name"], player_email, "FAILED", game_start_time);
//           }
//       }
//       else{
//           //Send Error Emails
//           const serviceID = 'gmail';
//           const templateInviteeID = 'invitee_error_template';
//           const templateInviterID = 'inviter_error_template';
//         //   const form = ".contact_form_class";
//           const user_ID = "user_3KTCwCruCd7oJZeFiJ0RZ";
//           //给inviter发邮件
//           emailjs.send(serviceID,templateInviterID,{
//             to_email: "player_email",
//             invitee_name: "player_email",
//             }, user_ID);
          
//           //给invitee发邮件
//           emailjs.send(serviceID,templateInviteeID,{
//             to_email: "player_email",
//             Inviter_name: "my_name",
//             }, user_ID);

//           addInvitation(my_email, my_name, result["name"], player_email, "FAILED", game_start_time);
//       }
  
  
//       // const response = await fetch("http://localhost/api/addInvitation", {
//       //     method: "POST",
//       //     headers: { 
//       //         'Content-Type': 'application/json'
//       //     },
//       //     body: JSON.stringify({ inviter_email: my_email, invitee_email: player_email, status: "PENDING", start_time: game_start_time })
//       //     }).then(async response => {
//       //     const result = await response.json();
  
//       //     // check for error response
//       //     if (!response.ok) {
//       //         // get error message from body or default to response status
//       //         const error = (result && result.message) || response.status;
//       //             return Promise.reject(error);
//       //         }
      
              
//       //     console.log("login successful");
  
//       //     }).catch(error => {
//       //             console.error('There was an error!', error);
//       //     });
// }
const button = createMuiTheme({
    typography: {
        button: {
            fontSize: '1rem',
            textTransform: 'none',
            fontFamily: [
                'Comfortaa',
                'cursive',
            ].join(','),
        },
    },});
  

class Home extends Component {
    // const classes = useStyles();
    constructor() {
        super();
        this.state = {
            selectedDate:new Date(),
            single:'',
            timeConflict: false,
            invitation_sent: false,
            player_exist: true
        }
        this.username = document.cookie.match('(^|;) ?' + "User name" + '=([^;]*)(;|$)');
        this.x_username = unescape(this.username[2]);
        this.my_name = this.x_username.slice(9,-2);
        this.email = document.cookie.match('(^|;) ?' + "email" + '=([^;]*)(;|$)');
        this.x_email = unescape(this.email[2]);
        this.my_email = this.x_email.slice(10,-2);
    }
    

    dateCallback = (date) =>{
        this.setState({selectedDate:date})
    }

    newPlayerCallback = (name) =>{
        this.setState({single:name})
    }

    refreshPage() {
        window.location.reload(false);
      }

    async sentNotification(inviter, invitee, clicked_status, id){
        if (clicked_status == "PENDING"){
          var inviter_content = "You have successfully sent your invitation to " + invitee;
          var invitee_content = inviter + " send you an invitation";
        }else if (clicked_status == "FAILED"){
          var inviter_content = invitee + " is busy";
        }
    
        // Inviter will receive an notification
        const response = await fetch("http://localhost/api/sendNotification", {
          method: "POST",
            headers: { 
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: inviter, invitation_id: id, content: inviter_content})
          }).then(async response => {
            const data = await response.json();
            console.log('sendNotification body',JSON.stringify({ username: inviter, invitation_id: id, content: inviter_content}));
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
    
            console.log("successful Notification", data);
    
    
        }).catch(error => {
            console.error('There was an error!', error);
        });
    
        // Invitee will receive an notification if the invitation is sent successfully
        if (clicked_status == "PENDING"){
            const response = await fetch("http://localhost/api/sendNotification", {
            method: "POST",
                headers: { 
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: invitee, invitation_id: id, content: invitee_content})
            }).then(async response => {
                const data = await response.json();
                console.log('sendNotification body',JSON.stringify({ username: invitee, invitation_id: id, content: invitee_content}));
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
    
                console.log("successful Notification", data);
    
    
            }).catch(error => {
                console.error('There was an error!', error);
            });
        }
    
       
      }
      
      async checkTimeConflict(player_name, player_email, game_start_time){
              return await fetch("http://localhost/api/isTimeConflict", {
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
      
                  console.log("game_start_time", game_start_time);
                  console.log("isConflict", data);
                  return data.conflict
                  
              })
              .catch(error => {
                  console.error('There was an error!', error);
              });
              
          }
      
      async addInvitation(my_email, my_name, player_name, player_email, invitation_status, game_start_time){
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
      
                  await this.sentNotification(my_name, player_name, invitation_status, data.invitation_id);
                  console.log("successful addInvitation", data);
                  
                  
              })
              .catch(error => {
                  console.error('There was an error!', error);
              });
              
          }
      
      async checkPlayerExist(player_email){
              return  await fetch("http://localhost/api/checkPlayerExist", {
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

                return { exist : player_exist, name : player_name };
                  
              })
              .catch(error => {
                  console.error('There was an error!', error);
              });
              
          }
      
      
      async sendInvitation(my_name, my_email, player_email, game_start_time){

        console.log("this.state.selectedDate", this.state.selectedDate);
        console.log("game_start_time", game_start_time);
        var new_game_start_time = moment(game_start_time).format('YYYY-MM-DD hh:mm:ss')
        console.log("new_game_start_time", new_game_start_time);
    
          const result = await this.checkPlayerExist(player_email);
          console.log("result", result);
          console.log("result.exist", result["exist"]);
          console.log("result.name", result["name"]);
          var gameDate = moment(game_start_time).format('YYYY-MM-DD').toString();
          var gameTime = moment(game_start_time).format('HH:mm:ss').toString();
          const game_date_time = gameDate + " " + gameTime;
          console.log("gameDate", gameDate);
          console.log("gameTime", gameTime);
          console.log("game_date_time", game_date_time);
          const my_timeConflict = await this.checkTimeConflict(my_name, my_email, game_date_time);
          console.log("my_timeConflict", my_timeConflict);
          console.log("!my_timeConflict", !my_timeConflict);
          const player_timeConflict = await this.checkTimeConflict(result.name, player_email, game_date_time);
          console.log("player_timeConflict", player_timeConflict);
          console.log("!player_timeConflict", !player_timeConflict);
          if(result["exist"]){
              this.setState({player_exist: true});
              if( !my_timeConflict && !player_timeConflict ){
                  await this.addInvitation(my_email, my_name, result["name"], player_email, "PENDING", game_date_time);
                  await this.setState({invitation_sent: true});
              }
              else{
                  
                  await this.addInvitation(my_email, my_name, result["name"], player_email, "FAILED", game_date_time);
                  //弹窗提醒
                  await this.setState({timeConflict: true});
              }
          }
          else{
              await this.setState({player_exist: false});
              //Send Error Emails
              const serviceID = 'gmail';
              const templateInviteeID = 'invitee_error_template';
              const templateInviterID = 'inviter_error_template';
            //   const form = ".contact_form_class";
              const user_ID = "user_3KTCwCruCd7oJZeFiJ0RZ";
              //给inviter发邮件
              await emailjs.send(serviceID,templateInviterID,{
                to_email: my_email,
                invitee_name: player_email,
                }, user_ID);
              
              //给invitee发邮件
              await emailjs.send(serviceID,templateInviteeID,{
                to_email: player_email,
                Inviter_name: my_name,
                }, user_ID);
    
            //   this.addInvitation(my_email, my_name, result["name"], player_email, "FAILED", game_start_time);
          }
          setTimeout(this.refreshPage(), 80000);
          
      
      
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


    render(){
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
                                <IntegrationAutosuggest newPlayerCallback={this.newPlayerCallback} single={this.state.single}/>
                                <h3>Select the start time</h3>
                                <Divider/>
                                <InlineTimePickerDemo dateCallback={this.dateCallback} selectedDate={this.state.selectedDate}/>
                                
                                 
                            </div>
                        </Grid>
                    
                    <Grid container justify="flex-end">
                        <ThemeProvider theme={button}>
                        <Button className="button" variant="contained" onClick={()=> {this.sendInvitation(this.my_name, this.my_email, this.state.single, this.state.selectedDate)}}>Send</Button>
                            </ThemeProvider>
                        </Grid>

                    

                    {/* { (!this.state.player_exist) && 
                        <Alert severity="error">
                        <AlertTitle>No such a player</AlertTitle>
                        We do not have such a player — <strong>Please choose another player!</strong>
                        </Alert>
                    } */}

                    { this.state.timeConflict &&
                        <Alert severity="warning">
                        <AlertTitle>Time Conflict</AlertTitle>
                        This player is busy at this time — <strong>Please choose another time!</strong>
                        </Alert>
                    }

                    {
                        this.state.invitation_sent &&
                        <Alert severity="success">Your invitation has been sent successfully.</Alert>
                    }
                    
                    </Paper>
                    
                </Grid>
            
            </div>
            
        );
    }
}
export default Home;
