import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Divider} from "@material-ui/core";
import IntegrationAutosuggest from './home_select_player';
import InlineTimePickerDemo from "./home_select_date";
import Button from "@material-ui/core/Button";

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
        <Grid item xs={12}>
            {/*<Paper className={classes.paper}>*/}
            <Paper style={styles.paper}>
                Send Invitation
                <Divider/>
                Add a player
                <Divider/>
                <IntegrationAutosuggest/>
                {/*<Divider/>*/}
                Select the start time
                <Divider/>
                <InlineTimePickerDemo/>
                <Divider/>
                <Button variant="contained" color="primary">Sent</Button>

            </Paper>
        </Grid>
    );
}