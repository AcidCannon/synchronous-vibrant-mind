import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
// import Table from './table_invitation_received';
import Table from './table_search_invitation_received';

class InvitationReceived extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render() {
      return (
        <div>
          <Grid container justify="center" style={{color: "#3291ff" }}>
            <h1>Invitation Received</h1>
          </Grid>
          <Table />
        </div>
      );
    }
  }
  export default InvitationReceived;