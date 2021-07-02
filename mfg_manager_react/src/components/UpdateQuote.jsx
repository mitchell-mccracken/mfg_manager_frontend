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
        
    }

    handleChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
    }

    render(){
        return(
            <div>
                <h2>Update Quote ID:{this.props.quote.id}</h2>
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

export default UpdateQuote