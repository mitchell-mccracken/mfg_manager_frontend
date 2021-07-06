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
            })
            
        }, 100);
    }

    handleChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
    }

    handleSubmit(event){
        event.preventDefault()
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
                    <label>Customer Name</label>
                    <input onChange={this.handleChange} type='text' name='customerName' id='customerName' value={this.state.customerName}/> <br/>
                    <label>Customer Address</label> 
                    <input onChange={this.handleChange} type='text' name='customerAddress' id='customerAddress' value={this.state.customerAddress}/> <br/>
                    <label>Contact Name</label>
                    <input onChange={this.handleChange} type='text' name='contactName' id='contactName' value={this.state.contactName}/> <br/>
                    <label>Quote Title</label>
                    <input onChange={this.handleChange} type='text' name='quoteTitle' id='quoteTitle' value={this.state.quoteTitle}/> <br/>

                    <br/><input type='submit' value='Edit Quote'/>
                </form>

            </div>
        )
    }
}

export default UpdateQuote