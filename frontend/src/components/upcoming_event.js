import React, { Component } from 'react';
// import Table from './table_upcoming_event';
import Table from '../tables/table_search_upcoming_event';
import { Grid } from '@material-ui/core';

class UpcomingEvent extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render() {
      return (
        <div>
          <Grid container justify="center" style={{color: "#3291ff" }}>
            <h1>Upcoming Events</h1>
          </Grid>
          <Table />
        </div>
      );
    }
  }
  export default UpcomingEvent;