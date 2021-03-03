import React from "react";
import { Helmet } from "react-helmet";

interface Props {
    publicPath: string
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
                <a href={this.props.publicPath + "/AllProjects.zip"} download>
                    <button>AllProjects Download</button>
                </a>
                <div className="notesInfo">
                <p>
                    This application hosts several of the NVE Samples. The application itself is hosted on AWS services using the severless.com platform. Serverless allows a clean way to define all the resources needed for an application making it easier to edit and document the system.
                    The application is served by a lambda function which renders a React application and serves assets from a S3 Bucket.
                    The entire project repo can be downloaded by clicking the button above.
                </p>
                </div>
            </div>
        )
    }
}
