import React, { Component } from 'react';
import Table from './table_history';

class History extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render() {
      return (
        <div>
          This is History.
          <Table />
        </div>
      );
    }
  }
  export default History;