import React, { Component } from "react";
import { Grid, InputAdornment, TextField } from "@material-ui/core";
import logo from './logo.png';
import Button from '@material-ui/core/Button';
import { AccountCircle, LockRounded } from "@material-ui/icons";
import uofalogo from "./uofa.png";
import {BrowserRouter as Router, Redirect, Switch, Route, Link} from 'react-router-dom';
import Home from "./components/home";
import { render } from "@testing-library/react";
import axios from "axios";
import { AUTH_LOGIN } from 'react-admin';
import Alert from '@material-ui/lab/Alert';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            email: null,
            login: false,
            errorMessage: null,
            clicked: false
            // loginErrors: null
        };
    
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
    
      handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }
    
      // handleSubmit(event) {
      //   const { username, password } = this.state;
      // }
    
    // This is the old version
    // auth(){
    //   fetch("http://[2605:fd00:4:1001:f816:3eff:fe56:29db]/vibrantminds2/api/token_login", {
    //     method: "POST",
    //     headers: { 
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ username: this.state.username, password: this.state.password })
    //   }).then((response) => {
    //     response.json().then((result) => {
    //         this.setState({clicked: true});
    //         console.warn("result", result);
    //         localStorage.setItem('login', JSON.stringify({
    //         login: true,
    //         token: result.token,
    //         email: this.state.email
    //       }));
    //       if(response.status == 200){
    //         this.setState({login: true, email: result.user.participant_info.email});
    //         this.addPlayer();
    //         console.log("state", this.state);
    //       }
    //     })
    //   })
    // }

    // addPlayer(){
    //     fetch("http://localhost/api/addPlayer", {
    //           method: "POST",
    //           headers: { 
    //             'Content-Type': 'application/json'
    //           },
    //           body: JSON.stringify({ name: this.state.username, email: this.state.email })
    //         }).then((response) => {
    //             console.log("This is body", JSON.stringify({ name: this.state.username, email: this.state.email }));
    //             response.json().then((result) => {
    //                 if(response.status == 200){
    //                     console.log("successful", response)
    //                 }
                    
    //             })
    //         })  
    // }


    // This is async await version
    async auth(){
        const response = await fetch("http://[2605:fd00:4:1001:f816:3eff:fe56:29db]/vibrantminds2/api/token_login", {
                method: "POST",
                headers: { 
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: this.state.username, password: this.state.password })
              }).then(async response => {
                const data = await response.json();
    
                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    this.setState({clicked:true});
                    return Promise.reject(error);
                }
                this.setState({ email: data.user.participant_info.email});
                this.addPlayer();
                console.log("login successful");
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                this.setState({clicked:true});
                console.error('There was an error!', error);
            });

        var exdate=new Date();
        exdate.setDate(exdate.getDate()+1);
        document.cookie='User name'+ "=" +escape(JSON.stringify({ name: result.user.username }))+
            ((1==null) ? "" : ";expires="+exdate.toGMTString())
        document.cookie='email'+ "=" +escape(JSON.stringify({ email: result.user.participant_info.email }))+
            ((1==null) ? "" : ";expires="+exdate.toGMTString())


        // const json = await response.json();
        // await new Promise((resolve, reject) => setTimeout(resolve, 3000));
        // if (response.ok){
        //     this.setState({login: true, email: json.user.participant_info.email});
        //     this.addPlayer();
        //     console.log("state", this.state);
        // }
      }

    async addPlayer(){
        this.setState({clicked:true});
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
                return Promise.reject(error);
            }
            
            this.setState({login: true});
            console.log("successful addPlayer", data);
            console.log("state", this.state);
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });


        // const json = await response.json();
        // await new Promise((resolve, reject) => setTimeout(resolve, 5000));
        // if (response.ok){
        //     console.log("successful", json);
        //     console.log("state", this.state);
        // }
        
    }

    // // This is the promise version
    // async auth() {
    //     // read our JSON
    //     let response = await fetch("http://[2605:fd00:4:1001:f816:3eff:fe56:29db]/vibrantminds2/api/token_login", {
    //         method: "POST",
    //         headers: { 
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ username: this.state.username, password: this.state.password })
    //         })
    //     let result = await response.json();
    //     // this.setState({login: true, email: result.user.participant_info.email, clicked: true});
    //     console.log("successful result", result);
    //     // read addPlayer
    //     let addPlayerResponse = await fetch("http://localhost/api/addPlayer", {
    //         method: "POST",
    //         headers: { 
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ name: result.user.username, email: result.user.participant_info.email })
    //         })


    //     let addPlayerresult = await addPlayerResponse.json();

    //     // let addPlayer = await response.json();
    //     if (addPlayerresult.status == "success"){
    //         console.log("successful addPlayer");
    //     }
        

    //     // show the avatar
    //     // this.setState({login: true, email: result.user.participant_info.email, clicked: true});
      
    //     // wait 3 seconds
    //     await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    //     this.setState({login: true, email: result.user.participant_info.email, clicked: true});
      
    //   }



    

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
                                        <h2>Log in</h2>
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
                                        required
                                    />
                                    <div style={{height: 20}} />

                                    <Button color="primary" variant="contained" onClick={()=> {this.auth()}}>Log in</Button>

                                    {this.state.login && <Redirect from='/' to='/vibrant-minds-together/home'></Redirect>}
                                    
                                    
                                    <div style={{height: 20}} />

                                    { !this.state.login && this.state.clicked &&
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

        );
    }
    
}

