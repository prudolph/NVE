import React from "react";
import { Helmet } from "react-helmet";
import "./WebARPage.css";
import { BrowserView, MobileView,isMobile, isAndroid, isIOS,  } from "react-device-detect";


interface Props {
    publicPath:string
}

interface State {
    redirecting:boolean,
    notes:boolean,
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
            this.state = { 
                redirecting:false,
                notes:false
            };
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

    handleNotes(mode:boolean){
        
        this.setState({
            notes :mode
        })
    }
    renderNotes(){
        if(this.state.notes){
            console.log("rendering notes: ", this.state.notes)
            return(
                <div className="notesContainer">
                    <button onClick={ ()=>{this.handleNotes(false);}} > Close</button>
                    <div className="notesInfo">
                        <p>This sample shows several ways to create a web based AR experience. Initially the user can interact with the model via mobile or desktop browser. Desktop provides the lowest level of interaction just allowing the user to pan and zoom, or find more information if hotspots are also included. If the user should visit the site on mobile, the “experience message” is not shown and the page automatically loads a WebAR experience built on 8th Wall. The user is also given the option of canceling the 8th Wall experience from loading. The user can open the model in a native AR mode by selecting the “View in AR” button which is only presented on mobile. If the user is on iOS a usdz is downloaded and automatically opens the QuickLook AR viewer. On Android the SceneViewer application is automatically displayed from a glb file. These views on both types of devices will place the model on a floor and allow the user to explore. </p>
                    </div>
                </div>)
                
         }else{
             return
         }

        
    }
    public render(): JSX.Element {

        return (
            <div className = "webARPage">
                <h3>Web AR Page</h3>
               <button onClick={ ()=>{this.handleNotes(true); }}> Notes</button>
        
                {this.renderNotes()}
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
                <button
                  className=""
                  slot="ar-button"
                >
                  VIEW IN AR
                </button>
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
