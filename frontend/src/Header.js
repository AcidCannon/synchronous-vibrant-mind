import React from 'react';
import logo from './logo.png';
import './Header.css';
import {Button} from "@material-ui/core";


export default function Header() {
    // const classes = useStyles();
    return (
        <div className="Top">
            <header className="Top-header">
                <img src={logo} className="header_logo" alt="logo" />
                <Button className="header_button">Log out</Button>
            </header>

        </div>
    );
}