import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route,Link } from 'react-router-dom'; //引入路由模块
import ListRouter from './Page';
import Login from './Login';
import Header from "./Header";


function App() {
  return (
    <Router>
      <div>
          <Route path="/" component={Login} />
         {/*<Route path="/" component={ListRouter} />*/}
      </div>
    </Router>
  );
}

export default App;

