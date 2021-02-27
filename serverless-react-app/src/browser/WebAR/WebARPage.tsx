import React from "react";
import { Helmet } from "react-helmet";
import "./WebARPage.css";
import { BrowserView, isMobile, isAndroid, isIOS } from "react-device-detect";


interface Props {
    publicPath:string
}

interface State {
    redirecting:boolean
}


declare global {
    namespace JSX {
        interface IntrinsicElements {
            "model-viewer": any;
        }
    }
}

export default class WebARPage extends React.Component<
    Props,
    State
    > {

        redirectTimer:any
        
        constructor(props:Props){
            super(props);
            this.state = { redirecting:false };
          }
        componentDidMount(){
         
            console.log("Checking if mobile....")
            if(isMobile){
                console.log("On mobile Redirecting.....")
                
                this.setState({
                    redirecting:true
                },()=>{
                    this.redirectTimer = setTimeout(()=>{ 
                        window.location.href = 'https://prudolph.8thwall.app/samplewebar/';
                    }, 5000);
                })
                
            }
            
        }

    handleRedirectCancel(){
        console.log("Canceling Redirect")
        clearTimeout( this.redirectTimer);
        this.setState({
            redirecting:false
        })

    }

    public render(): JSX.Element {

        return (
            <div className = "webARPage">
                <h1>Web AR Page</h1>
                {this.state.redirecting &&  
                <div className="webARPage-redirectBanner"> 
                    <h3>Redirecting....</h3>
                    <button onClick={()=>{this.handleRedirectCancel()}} >Stay Here</button>
                </div>}
                <Helmet>
                    <script
                        type="module"
                        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
                    ></script>
                </Helmet>

                <model-viewer
                    className="webARPage-modelviewer"
                    src={this.props.publicPath+"/Astronaut.glb"}
                    ios-src={this.props.publicPath+"/Astronaut.usdz"}
                    alt="A 3D model of an astronaut"
                    loading="lazy"
                    // reveal={isMobile ? "interaction" : "auto"}
                    camera-controls
                    // ref={(viewerRef) => (this.modelViewerReference = viewerRef)}
                    data-js-focus-visible //removes outline when dragging
                >


                </model-viewer>

                {(isAndroid || isIOS) && (
              <a
                href={
                  isAndroid
                    ? `intent://arvr.google.com/scene-viewer/1.0?file=${this.props.publicPath+"/Astronaut.glb"}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`
                    : `${this.props.publicPath+"/Astronaut.usdz"}`
                }
                rel="ar"
              >
                <div
                  className=""
                  slot="ar-button"
                >
                  VIEW IN AR
                </div>
              </a>
            )}
            </div>
        ) 
        }
    }
