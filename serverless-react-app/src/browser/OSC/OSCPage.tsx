import React from "react";
import { request, GraphQLClient } from 'graphql-request'
import "./OSC.css";
interface Props {}
interface State {}

export default class OSCPage extends React.Component<
    Props,
    State
    > {


    public render(): JSX.Element {
        return (
            <div className="OSCPage">
                <h1>OSC Page</h1>
            </div>
        )
    }
}
