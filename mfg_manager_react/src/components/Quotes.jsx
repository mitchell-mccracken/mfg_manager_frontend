import {Component} from 'react'

let baseURL = 'http://127.0.0.1:8000/api/'

class Quotes extends Component{
    constructor(props){
        super(props)

        this.state = {
            quotes:{},
            quote: {},
            id: '',
        }
        
        this.handleEditQuote = this.handleEditQuote.bind(this)
    }

    handleEditQuote(event){
        fetch(`${baseURL}quotes/${event.target.id}/`)
        // console.log(`${baseURL}quotes/${event.target.id}`)
        .then(data => { return data.json()} , err => console.log(err))
        
        .then(parsedData =>
          this.setState({
            quote: parsedData,
            id: event.target.id,
        }) , err => console.log(err))
    }

    render(){
        return(
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Contact Name</th>
                            <th>Date Created</th>
                            <th>Quote Name</th>
                            <th>EDIT</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.quotes.map(quote => {
                            return(
                                <tr key={quote.id}>
                                    <td>{quote.id}</td>
                                    <td>{quote.customer_name}</td>
                                    <td>{quote.contact_name}</td>
                                    <td>{quote.q_date_created}</td>
                                    <td>{quote.q_title}</td>
                                    <td><button onClick={this.handleEditQuote} id={quote.id}>EDIT</button></td>
                                    <td><button>DELETE</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Quotes