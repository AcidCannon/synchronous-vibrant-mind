import React from 'react';
import vmlogo from './vmlogo.png';
import './Top.css';

// import Home from './components/home';


function Top() {
  return (
    <div className="Top">
      <header className="Top-header">
        <img src={vmlogo} className="Top-logo" alt="vmlogo" />
        {/* <h2>Vibrant Minds Together</h2> */}
        {/* <p>
          Edit <code>src/Top.js</code> and save to reload.
        </p>
        <a
          className="Top-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );
}


export default Top;