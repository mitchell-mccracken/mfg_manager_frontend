import {Component} from 'react'
import Quotes from './components/Quotes'
import CreateQuote from './components/CreateQuote'

let baseURL;

// baseURL = 'http://127.0.0.1:8000/api/'
baseURL = 'http://127.0.0.1:8000/api/'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      loggedIn: false,
      showQuotes: false,
      showCreateQuote: false,
      showLogin: false,
      showCreateUser: false,
      userName: '',
      quotes: [],
      quote: {},
      id: ''
    }
    this.getQuotes = this.getQuotes.bind(this)
    this.toggleShowQuotes = this.toggleShowQuotes.bind(this)
    this.toggleShowCreateQuote = this.toggleShowCreateQuote.bind(this)
    this.handleAddQuote = this.handleAddQuote.bind(this)
    this.handleEditQuote = this.handleEditQuote.bind(this)
  }


  componentDidMount(){
    this.getQuotes()
  }

  toggleShowQuotes(){
    this.setState({
      showQuotes: !this.state.showQuotes
    })
  }

  toggleShowCreateQuote(){
    this.setState({
      showCreateQuote: !this.state.showCreateQuote
    })
  }

  handleAddQuote(quote){
    const copyQuotes = [...this.state.quotes]
    copyQuotes.unshift(quote)
    this.state({
      quotes: copyQuotes
    })
  }

  handleEditQuote(event){
    fetch(`${baseURL}quotes/${event.target.id}`)
    .then(data => { return data.json()} , err => console.log(err))
    .then(parsedData => 
      this.setState({
        quote: parsedData,
        id: event.target.tag,
    }) , err => console.log(err))
  }

  getQuotes(){
    fetch(baseURL + 'quotes/')
    .then(data => {return data.json()} , err => console.log(err))
    .then(parsedData => this.setState({quotes: parsedData}), err => console.log(err))
  }


  render(){
    return (
      <div className="App">
        <div>
          <button>LOGIN</button>
          <button>LOGOUT</button>
          <button>REGISTER USER</button>
        </div>
        <h1>Mfg Manager App</h1>
        <div>
          <button onClick={this.toggleShowQuotes}>QUOTES</button>
          <button>OPEN ORDERS</button>
          <button>COMPLETED JOBS</button>
          <button onClick={this.toggleShowCreateQuote}>Create Quote</button>
          <button>Create Open Order</button>
        </div>
        {
          this.state.showQuotes && 
          <Quotes quotes={this.state.quotes} handleEditQuote={this.handleEditQuote}/> 
        } 
        {
          this.state.showCreateQuote &&
          <CreateQuote handleAddQuote={this.handleAddQuote}/>

        }


      </div>

    )
  }
}


export default App