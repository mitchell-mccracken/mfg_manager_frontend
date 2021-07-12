import {Component} from 'react'

let baseURL = 'http://127.0.0.1:8000/api/'

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

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
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
        console.log(`${baseURL}quotes/${this.props.quote.id}/`)
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
                })
        })
        .then(res => res.json())
        .then(resJson => {
            console.log(resJson)
        })
        this.props.toggleShowQuoteUpdate()
        setTimeout(() => {
            this.props.getQuotes()
        }, 100);
        
        //******* neeed to add in someting to refresh the index **** */
    }

    render(){
        return(
            <div>
                <h2>Update Quote ID:{this.props.quote.id}</h2>
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
                    <label>Quote Cost</label>
                    <input onChange={this.handleChange} type='number' name='quoteCost' id='quoteCost' value={this.state.quoteTotal}/> <br/>
                    

                    <br/><input type='submit' value='Edit Quote'/>
                </form>
                <button>Create Open Order</button>

            </div>
        )
    }
}

export default UpdateQuote