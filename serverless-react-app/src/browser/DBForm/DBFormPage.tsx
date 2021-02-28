import React from "react";
import { request, GraphQLClient } from 'graphql-request'
import "./DBForm.css";
interface Props {

}

interface Shirt {
    design: string,
    id: number,
    large: number,
    medium: number,
    small: number
}
interface State {
    name: string,
    email: string,
    design: string,
    size: string,
    qty: number
    shirts: Shirt[]
}



export default class DBFormPage extends React.Component<
    Props,
    State
    > {

    client: any

    constructor(props: Props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            design: "",
            size: "",
            qty: 0,
            shirts: []

        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchShirts = this.fetchShirts.bind(this);


        const endpoint = 'https://tqujwiybik.execute-api.us-west-1.amazonaws.com/dev/graphql'
        this.client = new GraphQLClient(endpoint, { headers: {} })
    }

    componentDidMount() {
        this.fetchShirts()
    }

    fetchShirts() {
        console.log("Fetching Shirts..")
        const query = `
        query GetTestMessage {
            getAll{
                id,design,small,medium,large
            }
        }`

        this.client.request(query).then((result: any) => {
            console.log("Results:", result.getAll)
            this.setState({
                shirts: result.getAll
            }, () => {
                console.log("Current State: ", this.state)
            })

        });

    }
    handleChange(event: any) {
        console.log("Handling change: ",event.target.name,event.target.value)
        let newstate = this.state;
        //@ts-ignore
        newstate[event.target.name]=event.target.value

        this.setState({...newstate});
    }

    handleSubmit(event: any) {
        event.preventDefault();

        
        const query = `
        query GetTestMessage {
            getAll{
                id,design,small,medium,large
            }
        }`

        this.client.request(query).then((result: any) => {
            console.log("Results:", result.getAll)
            this.setState({
                shirts: result.getAll
            }, () => {
                console.log("Current State: ", this.state)
            })

        });



    }


    public render(): JSX.Element {


        return (
            <div className="dbform">
                <h1>DB Form</h1>
                <div className="db-inventorycontainer">
                    {this.state.shirts.map(shirt => <div className="dbInventoryItem">
                                            <h1>{shirt.design}</h1>
                                            <h3>Large: {shirt.large}</h3>
                                            <h3>Medium: {shirt.medium}</h3>
                                            <h3>Small: {shirt.small}</h3>
                        </div>)}
                </div>

                <div className="dbform-container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="dbform-item">
                            <label>
                                Name:
                                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                            </label>
                        </div>

                        <div className="dbform-item">
                            <label>
                                Email
                                <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                            </label>
                        </div>
                        
                        <div className="dbform-item">
                            <label>
                                Shirt Design:
                                <select value={this.state.design} name="design" onChange={this.handleChange}>
                                    {this.state.shirts.map(shirt => <option value={shirt.id}>{shirt.design}</option>)}
                                </select>

                            </label>
                        </div>

                        <div className="dbform-item">
                            <label>
                                Size:
                                    <select value={this.state.size} name="size" onChange={this.handleChange}>
                                        {["small","medium","large"].map(shirtSz => <option value={shirtSz}>{shirtSz}</option>)}
                                    </select>
                            </label>
                        </div>
                        <div className="dbform-item">
                            <label>
                                Qty:
                                <input type="text" name="qty" value={this.state.qty} onChange={this.handleChange} />
                            </label>
                        </div>
                    <input type="submit" value="Submit" />
                </form>
                </div>
            </div>

        )
    }
}
