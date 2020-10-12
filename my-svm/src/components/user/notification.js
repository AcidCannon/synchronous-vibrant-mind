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
          这里是Notification
          <Table />
        </div>
      );
    }
  }
  export default Notification;