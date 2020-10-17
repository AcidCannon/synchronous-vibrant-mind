import React, { Component } from 'react';
import Table from './table_notification';

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