import React, { Component } from 'react';
import Table from './table_upcoming_event';

class UpcomingEvent extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render() {
      return (
        <div>
          This is UpcomingEvent.
          <Table />
        </div>
      );
    }
  }
  export default UpcomingEvent;