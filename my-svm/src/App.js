import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Link } from 'react-router-dom'; //引入路由模块
import ListRouter from './Page';
import Login from './Login';


function App() {
  return (
    <Router>
      <div>
        {/* <Route exact path="/" component={ListRouter} /> */}
        <Route exact path="/" component={Login} />
      </div>
    </Router>
  );
}

export default App;

