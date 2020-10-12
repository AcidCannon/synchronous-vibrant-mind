import React, { Component } from 'react';
import Table from './Table';

class History extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render() {
      return (
        <div>
          这里是History
          <Table />
        </div>
      );
    }
  }
  export default History;