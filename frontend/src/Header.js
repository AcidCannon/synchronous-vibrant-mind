import React, { Component } from "react";
import logo from './logo.png';
import './Header.css';
import {BrowserRouter as Router, Redirect, Switch, Route, Link} from 'react-router-dom';
import {Button, Grid, TextField} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";


// function ListItemLink(props) {
//     return <ListItem button component="a" {...props} />;
// }

export default class Header extends Component{
    constructor() {
        super();
        this.state = {
            // navigate:false
        };
        this.results = document.cookie.match('(^|;) ?' + "User name" + '=([^;]*)(;|$)');
        this.x = unescape(this.results[2]);
        this.y = this.x.slice(9,-2);
    }

    logout=()=>{
    // async logout(){
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = "User name" + "=; expire=" + date.toGMTString() + ";path=/";
        document.cookie = "email" + "=; expire=" + date.toGMTString() + ";path=/";
        // this.setState({navigate:true});
        // console.log("logout successful");
    }

    render(){
        return (
            <Router>
            <div className="Top">
                <header className="Top-header">
                    <img src={logo} className="header_logo" alt="logo" />
                    <Grid container justify="flex-end" direction="rows">
                        <p className={"header_text1"}>Logged in as</p>
                        <p className={"header_text2"}> {this.y}</p>
                        <p className={"header_text3"}>. </p>
                        {/*<ListItemLink button className="header_button" onClick={()=> {this.logout()}} href="/login">Logout</ListItemLink>*/}
                        <Button className="header_button" onClick={()=> {this.logout()}} href="/login">Logout</Button>
                        {/*{this.state.navigate &&*/}
                        {/*    <Redirect to={"/login"} push={true} />*/}
                        {/*}*/}
                    </Grid>
                </header>
            </div>
            </Router>
        );
    }



}
