import {Component} from 'react'

let baseURL = 'http://127.0.0.1:8000/api/'


class CreateQuote extends Component{
    constructor(props){
        super(props)

        this.state = {
            customerName: '',
            customerAddress: '',
            contactName : '',
            dateCreated : '',
            quoteTitle : '',
            contactPhone: '',
            leadTime: '',
            partNumber: '',
            partDescription: '',
            partQty: '',
            partCost: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
    }

    convertDateFormat(dateTime){

    }
    
    handleSubmit(event){
        event.preventDefault()
        fetch(baseURL + 'quotes/' , {
            method: 'POST',
            body: JSON.stringify({
                customer_name: this.state.customerName,
                customer_address: this.state.customerAddress,
                contact_name: this.state.contactName,
                customer_address: this.state.customerAddress,
                q_title: this.state.quoteTitle,
                contact_phone: this.state.contactPhone,
                lead_time: this.state.leadTime,
                part_number: this.state.partNumber,
                part_description: this.state.partDescription,
                part_qty: this.state.partQty,
                part_cost: this.state.partCost,
            }) , 
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(resJson => {
            this.setState({
                customerName: '',
                customerAddress: '',
                contactName : '',
                dateCreated : '',
                quoteTitle : '',
                contactPhone: '',
                leadTime: '',
                partNumber: '',
                partDescription: '',
                partQty: '',
                partCost: '',
            })
        })
        .catch(error => console.log({'Error' : error}))
        setTimeout(() => {      //I had to set this to get stop a memory leak warning
            this.props.toggleShowCreateQuote()
            this.props.getQuotes()
        }, 200);
    }


    render(){
        return(
            <div>
                <h2>Create a new quote</h2>
                <form onSubmit={this.handleSubmit}>
                <label>Quote Title</label>
                    <input onChange={this.handleChange} type='text' name='quoteTitle' id='quoteTitle' value={this.state.quoteTitle}/> <br/>
                    <label>Customer Name</label>
                    <input onChange={this.handleChange} type='text' name='customerName' id='customerName' value={this.state.customerName}/> <br/>
                    <label>Customer Address</label> 
                    <input onChange={this.handleChange} type='text' name='customerAddress' id='customerAddress' value={this.state.customerAddress}/> <br/>
                    <label>Contact Name</label>
                    <input onChange={this.handleChange} type='text' name='contactName' id='contactName' value={this.state.contactName}/> <br/>
                    <label>Contact Phone Number</label>
                    <input onChange={this.handleChange} type='text' name='contactPhone' id='contactPhone' value={this.state.contactPhone}/> <br/>
                    <label>Lead Time (wks)</label>
                    <input onChange={this.handleChange} type='text' name='leadTime' id='leadTime' value={this.state.leadTime}/> <br/>
                    <label>Part Number</label>
                    <input onChange={this.handleChange} type='text' name='partNumber' id='partNumber' value={this.state.partNumber}/> <br/>
                    <label>Part Description</label>
                    <input onChange={this.handleChange} type='text' name='partDescription' id='partDescription' value={this.state.partDescription}/> <br/>
                    <label>Part Quantity</label>
                    <input onChange={this.handleChange} type='number' name='partQty' id='partQty' value={this.state.partQty}/> <br/>
                    <label>Part Cost</label>
                    <input onChange={this.handleChange} type='number' name='partCost' id='partCost' value={this.state.partCost}/> <br/>

                    <br/><input type='submit' value='Submit Quote'/>
                </form>
            </div>
        )
    }
}

export default CreateQuote