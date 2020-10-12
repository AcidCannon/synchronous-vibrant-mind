import React, { Component } from 'react';
import Table from './Table';

class InvitationReceived extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render() {
      return (
        <div>
          这里是InvitationReceived
          <Table />
        </div>
      );
    }
  }
  export default InvitationReceived;