import React from "react";
import { Helmet } from "react-helmet";

interface Props {
  
}
interface State {
}



export default class MainPage extends React.Component<
    Props,
    State
    > {



    public render(): JSX.Element {


        return (
            <div>
               <h3>Welcome: </h3>
               <p>This application hosts several of the NVE Samples</p>

                <p>The application is hosted on AWS services using the severless platform.</p>
                <p>The application is served by a lambda function which renders a React application and serves assets from a S3 Bucket</p>
                
            </div>
        ) 
        }
    }
