import React from "react";
import { Grid, InputAdornment, TextField } from "@material-ui/core";
import logo from './logo.png';
import Button from '@material-ui/core/Button';
import { AccountCircle, LockRounded } from "@material-ui/icons";
import uofalogo from "./uofa.png";


export default function Login() {
    return(
        <div>
            <Grid container style={{minHeight: "100vh"}}>
                <Grid container item xs={6} sm={12} justify="center" style={{backgroundColor: 'white'}}>
                    <Grid container justify="center">
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
                style={{padding: 10, backgroundColor: 'grey'}}
                >
                    <div />
                    <div>
                        <Grid container justify="center" style={{backgroundColor: 'yellow', width: 600, height:300}}>
                            <div 
                            style={{
                            display: "flex", 
                            flexDirection: "column", 
                            maxWidth: 400, 
                            minWidth: 300,
                            }}
                            >
                                <Grid container justify="center">
                                    <h2>Log in</h2>
                                </Grid>
                                <TextField 
                                    label="Username" 
                                    margin="normal" 
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle/>
                                        </InputAdornment>
                                        ),
                                     }}
                                />
                                <TextField 
                                    label="Passward" 
                                    margin="normal" 
                                    InputProps={{
                                        startAdornment: (
                                        <InputAdornment position="start">
                                            <LockRounded/>
                                        </InputAdornment>
                                        ),
                                     }}
                                />
                                <div style={{height: 20}} />
                                <Button color="primary" variant="contained">
                                    Log in
                                </Button>
                                <div style={{height: 20}} />
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

