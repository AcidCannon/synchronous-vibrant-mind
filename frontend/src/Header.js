import React from 'react';
import logo from './logo.png';
import './Header.css';
import {Button, Grid} from "@material-ui/core";


export default function Header() {
    // const classes = useStyles();
    const results = document.cookie.match('(^|;) ?' + "User name" + '=([^;]*)(;|$)');
    const x = unescape(results[2])
    const y = x.slice(9,-2)


    return (
        <div className="Top">
            <header className="Top-header">
                <img src={logo} className="header_logo" alt="logo" />
                <Grid container justify="flex-end" direction="rows">
                <p className={"header_text1"}>Logged in as</p>
                <p className={"header_text2"}> {y}. </p>
                <Button className="header_button" >Log out</Button>
                </Grid>
            </header>

        </div>
    );
}