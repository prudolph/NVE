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
    designID:number,
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
            designID:-1,
            size: "small",
            qty: 0,
            shirts: []

        };


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fetchShirts = this.fetchShirts.bind(this);
        this.resetDB = this.resetDB.bind(this);


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
                designID:result.getAll[0].id,
                shirts: result.getAll
            }, () => {

                console.log("Current State: ", this.state)
            })

        });

    }

   resetDB() {
        console.log("ResettingDB")
        const query = `mutation resetDB{ reset }`

        this.client.request(query).then((result: any) => {
            this.fetchShirts()
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
        console.log("State: ", this.state)
        const {designID,size,qty} = this.state;
        const query = `
                mutation resetDB{
                    purchase(id:${designID},size:"${size}",qty:${qty}){
                        id,design,small,medium,large
                    }
                }`

                console.log("Query: ", query)
        this.client.request(query).then((result: any) => {
            console.log("\n\n\nSUBMIT Results:", result)
            this.fetchShirts()
        });



    }

    getAvailQtyForSize():number{
        const {designID,size,shirts} = this.state
        console.log(`Gettign qty for design: ${designID} size: ${size}`)

        const shirtRecord = shirts.find( (shirt:Shirt)=> {
            console.log("Cehcking shirt record:  ",shirt, shirt.id, designID)
            return shirt.id == designID;
        })
        console.log("Found SHirt: ", shirtRecord)
        if(shirtRecord){
            //@ts-ignore
            return shirtRecord[size]+1
        }else{
            return  0 
        }
        
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
                    <button onClick={this.resetDB}>ResetDB</button>
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
                                <select value={this.state.designID} name="designID" onChange={this.handleChange}>
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
                                <select value={this.state.qty} name="qty" onChange={this.handleChange}>
            
                                    {[...Array(this.getAvailQtyForSize()).keys()].map(qty => <option value={qty}>{qty}</option>)}
                                </select>

                              
                            </label>
                        </div>
                    <input type="submit" value="Submit" />
                </form>
                </div>
            </div>

        )
    }
}
