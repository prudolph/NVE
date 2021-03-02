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
import DBFormPage from "./DBForm/DBFormPage"
import OSCPage from "./OSC/OSCPage"
import TouchDesignerPage from "./TouchDesigner/TouchDesignerPage"
import { BrowserView, isMobile, isAndroid, isIOS } from "react-device-detect";

/**
 * Our Web Application
 */
export default function App() {
  const { app } = useConfig();
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">NVE Samples</h1>

        <div className="app-qrContainer">
            Open in mobile:
            <img className = "app-qr" src ={app.PUBLIC_URL+"/nveQRLink.png"} />
          </div>

          <div className = "app-nav">
          <Link className = "app-link"to="/">Home</Link>
          <Link className = "app-link"to="/webar">WebAR</Link>
          <Link className = "app-link"to="/dbform">DBFormPage</Link>
          <Link className = "app-link"to="/osc">OSCPage</Link>
          <Link className = "app-link"to="/touch">TouchDesignerPage</Link>
          <BrowserView>
          
          </BrowserView>
          </div>
      </header>

      
      <div>
        
          
   


        <Switch>
          <Route exact path="/">
            <MainPage publicPath = {app.PUBLIC_URL}/>
          </Route>
          <Route path="/webar">
          <WebARPage publicPath = {app.PUBLIC_URL}/>
          </Route>
          <Route path="/dbform">
          <DBFormPage />
          </Route>
          
          <Route path="/osc">
          <OSCPage publicPath = {app.PUBLIC_URL}/>
          </Route>
          
          <Route path="/touch">
          <TouchDesignerPage publicPath = {app.PUBLIC_URL}/>
          </Route>
        </Switch>
      </div>
    

     
    </div>
  );
}
