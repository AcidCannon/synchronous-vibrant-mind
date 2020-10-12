import React, { Component } from 'react';
import Table from './Table';

class UpcomingEvent extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render() {
      return (
        <div>
          这里是UpcomingEvent
          <Table />
        </div>
      );
    }
  }
  export default UpcomingEvent;