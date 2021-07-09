import {Component} from 'react'

let baseURL = 'http://127.0.0.1:8000/api/'      //I don't think this is needed

class Quotes extends Component{
    constructor(props){
        super(props)

        this.state = {
            quotes:{},
            quote: {},
            id: '',
            showUpdate: false,
        }
        
        // this.handleEditQuote = this.handleEditQuote.bind(this)
        this.toggleShowUpdate = this.toggleShowUpdate.bind(this)
    }

    // *** decided to run this method from parent ***
    // handleEditQuote(event){
    //     this.toggleShowUpdate()
    //     fetch(`${baseURL}quotes/${event.target.id}/`)
    //     // console.log(`${baseURL}quotes/${event.target.id}`)
    //     .then(data => { return data.json()} , err => console.log(err))
        
    //     .then(parsedData =>
    //       this.setState({
    //         quote: parsedData,
    //         id: event.target.id,
    //     }) , err => console.log(err))
    // }

    toggleShowUpdate(){
        this.setState({
          showUpdate: !this.state.showUpdate
        })
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
                            let lesstime = quote.q_date_created.split('')
                            let time=''
                            for (let i=0 ; i<10 ; i++) {
                                time = time.concat(lesstime[i])
                            }
                            return(
                                <tr key={quote.id}>
                                    <td>{quote.id}</td>
                                    <td>{quote.customer_name}</td>
                                    <td>{quote.contact_name}</td>
                                    <td>{time}</td>
                                    <td>{quote.q_title}</td>
                                    <td><button onClick={this.props.handleEditQuote} id={quote.id}>EDIT</button></td>
                                    <td><button onClick={this.props.handleDeleteQuote} id={quote.id}>DELETE</button></td>
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