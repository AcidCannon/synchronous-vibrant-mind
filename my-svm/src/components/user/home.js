import React, { Component } from 'react';
import Table from './Table';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={}
    }

    render() {
      return (
        <div>
          This is Home.
          <Table />
        </div>
      );
    }
  }
  export default Home;