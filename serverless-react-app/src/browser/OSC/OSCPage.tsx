import React from "react";
import { request, GraphQLClient } from 'graphql-request'
import "./OSC.css";
interface Props {
    publicPath: string
}
interface State {
    notes: boolean
}

export default class OSCPage extends React.Component<
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
            return (
                <div className="notesContainer">
                    <button onClick={() => { this.handleNotes(false); }} > Close</button>
                    <div className="notesInfo">
                        <h1>OSC Project</h1>
                        <p>This project was built as a command line tool using node.js. It should be able to run without needing to compile the project by running “./bin/osc-sample”within the project directory.</p>
                        <p>The tool presents the user with options to control whether the instance acts as a sender or receiver.  Normally the program defaults to port 5300 but can be overridden using a command line argument. This allows easy configuration if the user would like to test the application using a single computer. When running on seperate machines the ports can be ignored. </p>
                        <p>The project page shows a few screen shots of two instances running communicating.</p>
                    </div>
                </div>)

        } else {
            return
        }
    }

    public render(): JSX.Element {
        return (
            <div className="OSCPage">
                <h1>OSC Page</h1>
                <button onClick={() => { this.handleNotes(true); }}> Notes</button>
                {this.renderNotes()}

                <a href={this.props.publicPath + "/OSCProject.zip"} download>
                    <button> OSC Project</button>
                    <div className="examples-container">
                        <img className="example-image" src={this.props.publicPath + "/OSC-1.png"} />
                        <img className="example-image" src={this.props.publicPath + "/OSC-2.png"} />
                        <img className="example-image" src={this.props.publicPath + "/OSC-3.png"} />
                    </div>
                </a>
            </div>
        )
    }
}
