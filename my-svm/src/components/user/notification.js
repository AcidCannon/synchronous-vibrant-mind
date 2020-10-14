import React, { Component } from 'react';
import Table from './Table';

class Notification extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render() {
      return (
        <div>
          This is Notification.
          <Table />
        </div>
      );
    }
  }
  export default Notification;