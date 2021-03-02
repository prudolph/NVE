import React from "react";
import { Helmet } from "react-helmet";
import "./WebARPage.css";
import { BrowserView, MobileView,isMobile, isAndroid, isIOS,  } from "react-device-detect";


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
         

            if(isMobile){

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
                <h3>Web AR Page</h3>
               
                <Helmet>
                    <script
                        type="module"
                        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
                    ></script>
                </Helmet>
                    <BrowserView>
                    <div className = "webARPage-mobileNotice" >
                        <h2>This experience is best viewed on mobile</h2>
                        <p>Use the QR Code above open on device</p>
                        <p>Or explore the model below</p>
                    </div>
                    </BrowserView>

                    <MobileView>
                    <div className = "webARPage-mobileNotice" >
                        <h3>Explore the model AR below</h3>
                        <p>Use the QR Code above open on device</p>
                        <p>Or explore the model below</p>
                    </div>
                    </MobileView>

                    {this.state.redirecting &&  
                <div className="webARPage-redirectBanner"> 
                    <h3>Launching Experience.....</h3>
                    <button onClick={()=>{this.handleRedirectCancel()}}>Stay Here</button>
                </div>}

                {(isAndroid || isIOS) && (
              <a
                href={
                  isAndroid
                    ? `intent://arvr.google.com/scene-viewer/1.0?file=${this.props.publicPath+"/beach.glb"}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`
                    : `${this.props.publicPath+"/beach.usdz"}`
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
                <model-viewer
                    className="webARPage-modelviewer"
                    src={this.props.publicPath+"/beach.glb"}
                    ios-src={this.props.publicPath+"/beach.usdz"}
                    alt="A 3D model of an beach scene"
                    loading="lazy"
                    camera-controls
                    
                    data-js-focus-visible //removes outline when dragging
                >

                </model-viewer>

            
            </div>
        ) 
        }
    }
