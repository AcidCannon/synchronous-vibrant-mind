import React, { Component } from 'react';
<<<<<<< HEAD
// import Table from './table_notification';
import Table from '../tables/table_search_notification';
=======
import Table from './table_notification';
>>>>>>> origin/stable
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
            <h1>Notifications</h1>
          </Grid>
          <Table />
        </div>
      );
    }
  }
  export default Notification;