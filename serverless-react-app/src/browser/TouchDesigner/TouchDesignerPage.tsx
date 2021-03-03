import React from "react";
import { request, GraphQLClient } from 'graphql-request'
import "./TouchDesigner.css";


interface Props {
    publicPath: string
}
interface State {
    notes: boolean
}


export default class TouchDesignerPage extends React.Component<
    Props,
    State
    > {


    constructor(props: Props) {
        super(props);
        this.state = {
            notes: false
        };
    }


    handleNotes(mode: boolean) {

        this.setState({
            notes: mode
        })
    }
    renderNotes() {
        if (this.state.notes) {
            console.log("rendering notes: ", this.state.notes)
            return (
                <div className="notesContainer">
                    <button onClick={() => { this.handleNotes(false); }} > Close</button>
                    <div className="notesInfo">


                        <h1>Touch Designer Project</h1>

                        <p>Below you will find an image of the network and a video of the sample in action.

                        The project uses an image cache of the video stream to create a difference image between the current frame and a previous frame to identify which pixels have changed.
                        Using blob detection on the difference image the project can then identify areas that have movement limited to the size of a hand.


                        With some noise filtering a smooth output value is piped into the rotation of a 3D model.

                        As the user moves their hand left to right in the scene the model will rotate accordingly.
                    </p>
                    </div>
                </div>)

        } else {
            return
        }
    }
    public render(): JSX.Element {
        return (
            <div className="TouchDesignerPage">
                <h1>TouchDesigner Page</h1>

                <button onClick={() => { this.handleNotes(true); }}> Notes</button>
                {this.renderNotes()}

                <a href={this.props.publicPath + "/TDProject1.zip"} download>
                    <button> Download Touch Designer Project</button>
                </a>

                <div className="td-examples-container">
                    <img className="td-image" src={this.props.publicPath + "/TDHandTracker.png"} />

                    <video width="750" height="500" controls >
                        <source src={this.props.publicPath + "/TouchDesginerHandTracking.mp4"} type="video/mp4" />
                    </video>

                </div>
            </div>
        )
    }
}
