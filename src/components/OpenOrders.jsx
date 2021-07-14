import {Component} from 'react'

class OpenOrders extends Component{
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