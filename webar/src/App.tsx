import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Helmet } from 'react-helmet';
import {AFrameScene} from './lib/aframe-components'

declare global {
  namespace JSX {
      interface IntrinisicElements {
          'a-scene': any
      }
  }
}


function App() {
  return (
    <div className="App">

      <Helmet>
        {/* <script src="//cdn.8thwall.com/web/aframe/8frame-0.8.2.min.js"></script>
    <script src="//cdn.8thwall.com/web/aframe/aframe-animation-component-5.1.2.min.js"></script> */}
        <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
        <script src="//cdn.8thwall.com/web/xrextras/xrextras.js"></script>
        <script async src="//apps.8thwall.com/xrweb?appKey=euNKJZrv8Y5gyAFCIKfo5RdSIRbUM3upjJVPaRRmmXGnw9OwxH6F6GmCMBfpOWuvaDg3Cw"></script>
      </Helmet>


      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      <div>
      
      <AFrameScene sceneHtml={  // Use an HTML template, swapping its color for the color of this page.
      require('./cube.html')}
    />
      </div>

    </div>
  );
}

export default App;
