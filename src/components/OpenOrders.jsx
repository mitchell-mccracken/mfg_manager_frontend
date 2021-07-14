import {Component} from 'react'

// let baseURL = 'http://127.0.0.1:8000/api/'      //I don't think this is needed

class OpenOrders extends Component{
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
                <br/>
                <table>
                    <thead>
                        <tr>
                            <th>Quote ID</th>
                            <th>Title</th>
                            <th>Start Date</th>
                            <th>Quote Name</th>
                            <th>Quote Total</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.props.orders.map(order => {
                            let lesstime = order.o_start_date.split('')
                            let time=''
                            for (let i=0 ; i<10 ; i++) {
                                time = time.concat(lesstime[i])
                            }
                            return(
                                <tr key={order.id}>
                                    <td>{order.q_id}</td>
                                    <td>{order.o_title}</td>
                                    <td>{time}</td>
                                    <td>place holder</td>
                                    <td>place holder</td>
                                    {/* <td><button onClick={this.props.handleEditQuote} id={quote.id}>EDIT</button></td>
                                    <td><button onClick={this.props.handleDeleteQuote} id={quote.id}>DELETE</button></td> */}
                                </tr>
                            )
                            
                            
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default OpenOrders