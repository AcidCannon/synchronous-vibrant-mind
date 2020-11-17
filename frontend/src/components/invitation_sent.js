import React, { Component } from 'react';
// import Table from './table_invitation_sent';
// import Table from './table_sort_invitation_sent';
import Table from './table_search_invitation_sent';
import { Grid } from '@material-ui/core';

class InvitationSent extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render() {
      return (
        <div>
          <Grid container justify="center" style={{color: "#3291ff" }}>
            <h1>Invitation Sent</h1>
          </Grid>
          <Table />
        </div>
      );
    }
  }
  export default InvitationSent;