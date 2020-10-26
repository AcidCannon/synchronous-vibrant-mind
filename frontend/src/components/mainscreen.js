import React, { Component } from 'react';
import {Button} from "@material-ui/core";
import { Grid } from '@material-ui/core';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class Mainscreen extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render() {
      return (
        <div>
          <Grid container justify="center" style={{color: "#3291ff" }}>
            <h1>This is mainscreen.</h1>
            <Button component={Link} to='/'>Log out</Button>
          </Grid>
        </div>
      );
    }
  }
  export default Mainscreen;