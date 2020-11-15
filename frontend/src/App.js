import React, { useLayoutEffect, useState, Component} from 'react';
import './css/App.css';
import { BrowserRouter as Router, Route,Link } from 'react-router-dom'; //引入路由模块
import Page from './Page';
import Login from './Login';
// import ReactResizeDetector from 'react-resize-detector'


export default class App extends Component{
  constructor() {
    super();
    this.state = {
        username: null,
        password: null,
        email: null,
        login: false,
        errorMessage: null,
        clicked: null
        // loginErrors: null
    };
  }
    
  render(){
    return (
      <Router style={{ height: 'auto !important',  width: 'auto !important'}}>
        <div>
            <Route exact path="/" component={Login} />
            <Route path="/vibrant-minds-together" component={Page} />
        </div>
      </Router>
      );
    }
}


