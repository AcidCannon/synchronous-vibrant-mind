import React, { Component } from 'react';
import Table from './table_invitation_received';

class InvitationReceived extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render() {
      return (
        <div>
          This is InvitationReceived.
          <Table />
        </div>
      );
    }
  }
  export default InvitationReceived;