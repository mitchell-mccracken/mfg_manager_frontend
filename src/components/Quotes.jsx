import {Component} from 'react'

class Quotes extends Component{
    constructor(props){
        super(props)

        this.state = {
            quotes:{},
            quote: {},
            id: '',
            showUpdate: false,
        }
        this.toggleShowUpdate = this.toggleShowUpdate.bind(this)
    }

    toggleShowUpdate(){
        this.setState({
          showUpdate: !this.state.showUpdate
        })
    }

    render(){
        return(
            <div>
                <br/>
                <button onClick={this.props.toggleShowCreateQuote}>Create New Quote</button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Contact Name</th>
                            <th>Date Created</th>
                            <th>Quote Name</th>
                            <th>Quote Total</th>
                            <th>EDIT</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.quotes.map(quote => {
                            let lesstime = quote.q_date_created.split('')
                            let time=''
                            for (let i=0 ; i<10 ; i++) {
                                time = time.concat(lesstime[i])
                            }
                            if (quote.q_accepted == false){
                                return(
                                    <tr key={quote.id}>
                                        <td>{quote.id}</td>
                                        <td>{quote.customer_name}</td>
                                        <td>{quote.contact_name}</td>
                                        <td>{time}</td>
                                        <td>{quote.q_title}</td>
                                        <td>$ {quote.quote_total}</td>
                                        <td><button onClick={this.props.handleEditQuote} id={quote.id}>EDIT</button></td>
                                        <td><button onClick={this.props.handleDeleteQuote} id={quote.id}>DELETE</button></td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Quotes