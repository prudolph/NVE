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
    designID: number,
    size: string,
    qty: number
    shirts: Shirt[],
    message:String,
    messageType:String,
    notes:boolean,
    
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
            designID: -1,
            size: "small",
            qty: 0,
            shirts: [],
            message:"",
            messageType:"",
            notes:false
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
                designID: result.getAll[0].id,
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
       
        let newstate = this.state;
        //@ts-ignore
        newstate[event.target.name] = event.target.value

        this.setState({
            ...newstate,
            message:"",
            messageType:"" });
    }

    handleSubmit(event: any) {
        event.preventDefault();
         console.log(`Submiting Form with data: [ Name:${this.state.name}, Email:${this.state.email} Design:${this.state.designID} size:${this.state.size} qty:${this.state.qty}`)
       
        const { designID, size, qty } = this.state;
        if(qty<=0){
            this.setState({
                message:"Requested 0 Qty, Please choose another option ",
                messageType:"FAIL"
            })
            return;
        }
        const query = `
                mutation resetDB{
                    purchase(id:${designID},size:"${size}",qty:${qty}){
                        id,design,small,medium,large
                    }
                }`

        

            this.client.request(query).then((result: any, error: any) => {
                if (error) {
                    console.log("FAILED: Error: ", error)
                } else {
                    console.log("\n\n\nSUBMIT Results:", result)
                    this.setState({
                        message:`Order Successful - RECEIPT:[ Name:${this.state.name}, Email:${this.state.email} DesignID:${this.state.designID} size:${this.state.size} qty:${this.state.qty}]`,
                        messageType:"SUCCESS"
                    })
                }
            }).catch((error:any)=>{
                console.log("Failed to submit order: ", error.response.errors)
                this.setState({
                    message:JSON.stringify(error.response.errors[0].message),
                    messageType:"FAIL"
                })
            })
     
        this.fetchShirts()

    }

    getAvailQtyForSize(): number {
        const { designID, size, shirts } = this.state
        const shirtRecord = shirts.find((shirt: Shirt) => {
            return shirt.id == designID;
        })
        if (shirtRecord) {
            //@ts-ignore
            return shirtRecord[size] + 1
        } else {
            return 0
        }

    }

    renderNotes(){
        if(this.state.notes){
            console.log("rendering notes: ", this.state.notes)
            return(
                <div className="webARPage-notesContainer">
                    <button onClick={ ()=>{this.handleNotes(false);}} > Close</button>
                    <div>
                        
                    </div>
                </div>)
                
         }else{
             return
         }
    public render(): JSX.Element {


        return (
            <div className="dbform">
                <h1>DB Form</h1>
                <div className="db-inventorycontainer">
                    {this.state.shirts.map(shirt => <div className="dbInventoryItem" key={"inv"+shirt.design}>
                        <h1>{shirt.design}</h1>
                        <h3>Large: {shirt.large}</h3>
                        <h3>Medium: {shirt.medium}</h3>
                        <h3>Small: {shirt.small}</h3>
                    </div>)}
                </div>

                <div className="dbform-container">
                    <button onClick={this.resetDB}>ResetDB</button>
                    {this.state.message && <div className= {this.state.messageType==="SUCCESS"?"dbform-banner-success":"dbform-banner-fail" }> 
                        <p>{this.state.message}</p>
                    </div>}
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
                                    {["small", "medium", "large"].map(shirtSz => <option key={"shirtSz"+shirtSz } value={shirtSz}>{shirtSz}</option>)}
                                </select>
                            </label>
                        </div>
                        <div className="dbform-item">
                            <label>
                                Qty:
                                <select value={this.state.qty} name="qty" onChange={this.handleChange}>

                                    {[...Array(this.getAvailQtyForSize()).keys()].map(qty => <option key={"qty"+qty } value={qty}>{qty}</option>)}
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
