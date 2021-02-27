import "./App.css";

import React from "react";
import {
  StaticRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



import useConfig from "../components/useConfig";
import WebARPage from "./WebAR/WebARPage"
import MainPage from "./MainPage"
import DBFormPage from "./DBFormPage"

/**
 * Our Web Application
 */
export default function App() {
  //const config = useConfig();
  const { app } = useConfig();
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">NVE Samples</h1>
          <div className = "app-nav">
          <Link className = "app-link"to="/">Home</Link>
          <Link className = "app-link"to="/webar">WebAR</Link>
          <Link className = "app-link"to="/dbform">DBFormPage</Link>
          </div>
      </header>

      
      <div>
        
          
   


        <Switch>
          <Route exact path="/">
            <MainPage/>
          </Route>
          <Route path="/webar">
          <WebARPage publicPath = {app.PUBLIC_URL}/>
          </Route>
          <Route path="/dbform">
          <DBFormPage />
          </Route>
        </Switch>
      </div>
    

     
    </div>
  );
}
