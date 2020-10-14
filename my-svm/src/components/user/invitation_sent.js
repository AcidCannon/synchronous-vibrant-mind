import React, { Component } from 'react';
import Table from './table_invitation_sent';

class InvitationSent extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render() {
      return (
        <div>
          This is Invitation Sent.
          <Table />
        </div>
      );
    }
  }
  export default InvitationSent;