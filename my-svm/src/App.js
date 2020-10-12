import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route,Link } from 'react-router-dom'; //引入路由模块
// import Home from './components/home';
import User from './components/user';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <h2>CMPUT401</h2>
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

function App() {
  return (
    <Router>
      <div>
                  
        {/* <Route exact path="/" component={Home} /> */}
        <Route path="/user" component={User} />
      </div>
    </Router>
  );
}

export default App;

