import React, { Component } from "react";
import logo from '../logo.png';
import {BrowserRouter as Router} from 'react-router-dom';
import {Button, Grid} from "@material-ui/core";
import Link from '@material-ui/core/Link';
import '../css/Header.css';

// function refreshPage() {
//     window.location.reload(false);
// }
// setTimeout(refreshPage(), 80000);



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
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = "User name" + "=; expire=" + date.toGMTString() + ";path=/";
        document.cookie = "email" + "=; expire=" + date.toGMTString() + ";path=/";
    }

    render(){
        return (
            <Router>
            <div className="Top" direction="rows">
                <header className="Top-header" direction="rows">
                    <img src={logo} className="header_logo" alt="logo" />
                    <Grid container justify="flex-end" direction="row">
                        <p className={"header_text1"}>Logged in as</p>
                        <p className={"header_text2"}> {this.y}</p>
                        <p className={"header_text3"}>. </p>
                        <p >" " </p>
                        <p>
                        <Link className="header_link" onClick={()=> {this.logout()}} href="/">  Logout</Link>
                        </p>
                        <p className={"header_text3"}>. </p>
                    </Grid>
                </header>
            </div>
            </Router>
        );
    }



}
