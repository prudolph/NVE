import React from "react";
import { request, GraphQLClient } from 'graphql-request'
import "./TouchDesigner.css";


interface Props {}
interface State {}


export default class TouchDesignerPage extends React.Component<
    Props,
    State
    > {
    
    public render(): JSX.Element {
        return (
            <div className="TouchDesignerPage">
                <h1>TouchDesigner Page</h1>
            </div>
        )
    }
}
