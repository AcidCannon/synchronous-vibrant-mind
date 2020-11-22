import React, { Component } from "react";
import { Grid, InputAdornment, TextField } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import logo from './logo.png';
import Button from '@material-ui/core/Button';
import { AccountCircle, LockRounded } from "@material-ui/icons";
import uofalogo from "./uofa.png";
import {Redirect} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import './css/Login.css';

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Comfortaa',
            'cursive',
        ].join(','),
    },});

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


export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            email: null,
            login: false,
            errorMessage: null,
            loginErrors: null
        };
    
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.keyPress = this.keyPress.bind(this);
      }
    
      handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }

      keyPress(e){
        if(e.keyCode == 13){
           // put the login here
           this.auth();
        }
     }

    async auth(){
        const response = await fetch("http://[2605:fd00:4:1001:f816:3eff:fe56:29db]/vibrantminds2/api/token_login", {
                method: "POST",
                headers: { 
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: this.state.username, password: this.state.password })
              }).then(async response => {
                const result = await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (result && result.message) || response.status;
                    this.setState({loginErrors:true});
                    return Promise.reject(error);
                }
                this.setState({ email: result.user.participant_info.email});
                this.addPlayer();
                console.log("login successful");
                console.log("login token", result.token);

                var exdate=new Date();
                exdate.setDate(exdate.getDate()+1);
                document.cookie='User name'+ "=" +escape(JSON.stringify({ name: result.user.username }))+ ";expires="+exdate.toGMTString()
                document.cookie='email'+ "=" +escape(JSON.stringify({ email: result.user.participant_info.email }))+ ";expires="+exdate.toGMTString()
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                this.setState({loginErrors:true});
                console.error('There was an error!', error);
            });
      }

    async addPlayer(){
        const response = await fetch("http://localhost/api/addPlayer", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: this.state.username, email: this.state.email })
        }).then(async response => {
            const data = await response.json();

            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                this.setState({loginErrors:true});
                return Promise.reject(error);
            }
            
            this.setState({login: true});
            console.log("successful addPlayer", data);
            console.log("state", this.state);
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            this.setState({loginErrors:true});
            console.error('There was an error!', error);
        });
        
    }

    displayError(props){
        const isLogin = props.isLogin
        if (!isLogin){
            return (
                <Grid>
                    <h3>Your username and password didn't match. Please try again.</h3>
                    <Alert severity="error">This is an error alert — check it out!</Alert>
                </Grid>
            );
        }
    }

    render(){
        return(
            <ThemeProvider theme={theme}>
            <div style={{ height: 'auto !important',  width: 'auto !important'}}>
                <Grid container style={{minHeight: "100vh"}}>
                    <Grid container item xs={6} sm={12} justify="center" style={{backgroundColor: 'white'}}>
                        <Grid  justify="center">
                        <img src={logo} className="header_logo"  style={{width: 680, height: 300}}  alt="logo" />
                        </Grid>
                    </Grid>
                    <Grid 
                    container 
                    item xs={6} 
                    sm={12} 
                    alignItems="center" 
                    direction="column" 
                    justify="space-between"
                    style={{padding: 10, backgroundColor: '#333'}}
                    >
                        <div />
                        <div>
                            <Grid container justify="center" style={{backgroundColor: 'white', width: 600, height:300}}>
                                <div 
                                style={{
                                display: "flex", 
                                flexDirection: "column", 
                                maxWidth: 400, 
                                minWidth: 300,
                                }}
                                >
                                    <Grid container justify="flex-start">
                                        <h2 className="login">Log in</h2>
                                    </Grid>

                                    <TextField 
                                        label="Username" 
                                        margin="normal" 
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle/>
                                            </InputAdornment>
                                            ),
                                         }}
                                        type="username"
                                        name="username"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                        required
                                    />
                                    <TextField 
                                        label="Password" 
                                        margin="normal" 
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <LockRounded/>
                                            </InputAdornment>
                                            ),
                                         }}

                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        onKeyDown={this.keyPress}
                                        required
                                    />
                                    <div style={{height: 20}} />

                                    <ThemeProvider theme={button}>
                                    <Button className="button" variant="contained" onClick={()=> {this.auth()}}>Log in</Button>
                                        </ThemeProvider>

                                    {this.state.login && <Redirect from='/login' to='/vibrant-minds-together/home'></Redirect>}

                                    <div style={{height: 20}} />

                                    { this.state.loginErrors &&
                                        <div>
                                            <Alert severity="error">Your username and password didn't match. Please try again. </Alert>
                                        </div>
                                        
                                    }
                                </div>
                            </Grid>
                        </div>
                        <Grid container justify="flex-end">
                                    <Grid item>
                                        <img src={uofalogo} className="uofa_logo"  width={200}  alt="uofa_logo" />
                                    </Grid>
                                </Grid>
                        <div />
                    </Grid>
                </Grid>
            </div>
                </ThemeProvider>

        );
    }
    
}

