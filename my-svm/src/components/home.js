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
                    justify="space-between">
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
                    <Button variant="contained" color="primary">Sent</Button>
                </Grid>
                
                </Paper>
                
            </Grid>
        
        </div>
        
    );
}