import {Component} from 'react'

// let baseURL = 'http://127.0.0.1:8000/api/'
let baseURL;

if ( window.location.origin === "https://mfg-manager-frontend.herokuapp.com"){
baseURL = 'https://mfg-manager-api.herokuapp.com/api/'
} else {
baseURL = 'http://127.0.0.1:8000/api/'
}

class UpdateQuote extends Component{
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
            quoteNotes: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleOpenOrder = this.handleOpenOrder.bind(this)
    }

    componentDidMount(){
        setTimeout(() => {      //I had to add this delay for some reason it wouldn't immediately load the information from props
            this.setState({
                customerName: this.props.quote.customer_name,
                customerAddress: this.props.quote.customer_address,
                contactName : this.props.quote.contact_name,
                dateCreated : this.props.quote.q_date_created,
                quoteTitle : this.props.quote.q_title,
                contactPhone: this.props.quote.contact_phone,
                leadTime: this.props.quote.lead_time,
                partNumber: this.props.quote.part_number,
                partDescription: this.props.quote.part_description,
                partQty: this.props.quote.part_qty,
                partCost: this.props.quote.part_cost, 
                quoteTotal: this.props.quote.quote_total,
                quoteNotes: this.props.quote.quote_notes,
            })
        }, 100);
    }

    handleChange(event) {
        let quoteTotal = (1 * this.state.partQty * this.state.partCost)
        quoteTotal = quoteTotal.toFixed(2)
        this.setState({ [event.currentTarget.id]: event.currentTarget.value, quoteTotal: quoteTotal })
    }

    handleSubmit(event){
        event.preventDefault()
        let totalCost = 1 * this.state.partCost * this.state.partQty
        fetch(`${baseURL}quotes/${this.props.quote.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
                },
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
                quote_total: totalCost,
                quote_notes: this.state.quoteNotes,
                })
        })
        .then(res => res.json())
        .then(resJson => {
            // console.log(resJson)
        })
        this.props.toggleShowQuoteUpdate()
        setTimeout(() => {
            this.props.getQuotes()
        }, 100);
    }

    handleOpenOrder(event){
        event.preventDefault()
        fetch(baseURL + 'openorders/', {
            method: 'POST',
            body: JSON.stringify({
                q_id : this.props.quote.id,
                o_title : this.props.quote.q_title,
            }) , 
            headers: { 'Content-Type' : 'application/json'}
        })
        .then(res=> res.json())
        .then(resJson => {
            this.setState({
                convertToOpenOrder : true,      //I dont think this is used
            })

            // this section is to set the original quote state to of accepted or Notification
            fetch(`${baseURL}quotes/${this.props.quote.id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        q_accepted: true,
                        date_accepted: new Date(),
                        q_title : this.props.quote.q_title,
                    })
            })
            .then(res => res.json())
        })
        .catch(error => console.log({'Error' : error}))
        setTimeout(() => {      //I had to set this to get stop a memory leak warning
            this.props.getQuotes()
            this.props.getOpenOrders()
            this.props.toggleShowQuoteUpdate()
        }, 200);
    }

    render(){
        return(
            <div>
                <h2>Update Quote ID:{this.props.quote.id}</h2>
                <form className="update-form" onSubmit={this.handleSubmit}>
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
                    <label>Quote Cost</label>
                    <input onChange={this.handleChange} type='number' name='quoteCost' id='quoteCost' value={this.state.quoteTotal}/> <br/>
                    <label>Additional Notes</label>
                    <textarea onChange={this.handleChange} name='quoteNotes' id='quoteNotes' value={this.state.quoteNotes}
                    rows='5' cols='30'></textarea> <br/>
                    <br/><input type='submit' value='Submit Edits'/>
                </form>
                <br/>
                <button onClick={this.handleOpenOrder}>Create Open Order</button>
            </div>
        )
    }
}

export default UpdateQuote