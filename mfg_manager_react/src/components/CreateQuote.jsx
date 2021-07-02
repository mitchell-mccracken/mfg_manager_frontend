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
                q_title : this.state.quoteTitle,
                // q_date_created : '2021-07-01T19:22:44Z',
                // q_date_created: Date().toLocaleString(),
                customer_name : this.state.customerName,
                contact_name : this.state.contactName,
                customer_address : this.state.customerAddress,
            }) , 
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(resJson => {
            // this.props.handleAddQuote
            this.setState({
                customerName: '',
                customerAddress: '',
                contactName : '',
                dateCreated : '',
                quoteTitle : '',
            })
        })
        .catch(error => console.log({'Error' : error}))
    }


    render(){
        return(
            <div>
                <h2>Create a new quote</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Customer Name</label>
                    <input onChange={this.handleChange} type='text' name='customerName' id='customerName' /> <br/>
                    <label>Customer Address</label> 
                    <input onChange={this.handleChange} type='text' name='customerAddress' id='customerAddress' /> <br/>
                    <label>Contact Name</label>
                    <input onChange={this.handleChange} type='text' name='contactName' id='contactName' /> <br/>
                    <label>Quote Title</label>
                    <input onChange={this.handleChange} type='text' name='quoteTitle' id='quoteTitle' /> <br/>

                    <br/><input type='submit' value='Submit Quote'/>
                </form>
            </div>
        )
    }
}

export default CreateQuote