import React, { Component } from 'react';
import Table from './table_history';
import { Grid } from '@material-ui/core';

class History extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render() {
      return (
        <div>
          <Grid container justify="center" style={{color: "#3291ff" }}>
            <h1>History</h1>
          </Grid>
          <Table />
        </div>
      );
    }
  }
  export default History;