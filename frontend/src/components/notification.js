import React, { Component } from 'react';
import Table from './table_notification';
import { Grid } from '@material-ui/core';

class Notification extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render() {
      return (
        <div>
          <Grid container justify="center" style={{color: "#3291ff" }}>
            <h1>Notification</h1>
          </Grid>
          <Table />
        </div>
      );
    }
  }
  export default Notification;