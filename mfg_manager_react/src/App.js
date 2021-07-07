import {Component} from 'react'
import Quotes from './components/Quotes'
import CreateQuote from './components/CreateQuote'
import UpdateQuote from './components/UpdateQuote'
import RegisterUser from './components/RegisterUser'
import LoginUser from './components/LoginUser'

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
      showLoginUser: false,
      showRegisterUser: false,
      showQuoteUpdate: false,
      userName: '',
      quotes: [],
      quote: {},
      id: '', 
      userToken: '',
    }
    this.getQuotes = this.getQuotes.bind(this)
    this.toggleShowQuotes = this.toggleShowQuotes.bind(this)
    this.toggleShowCreateQuote = this.toggleShowCreateQuote.bind(this)
    this.toggleShowQuoteUpdate = this.toggleShowQuoteUpdate.bind(this)
    this.handleAddQuote = this.handleAddQuote.bind(this)
    this.handleEditQuote = this.handleEditQuote.bind(this)
    this.handleDeleteQuote = this.handleDeleteQuote.bind(this)
    this.toggleShowRegisterUser = this.toggleShowRegisterUser.bind(this)
    this.toggleShowLoginUser = this.toggleShowLoginUser.bind(this)
    this.logToken = this.logToken.bind(this)
  }


  componentDidMount(){
    this.getQuotes()
  }

  toggleShowQuotes(){
    this.setState({
      showQuotes: !this.state.showQuotes,
      showQuoteUpdate: false,
    })
  }
  toggleShowQuoteUpdate(){
    this.setState({
      showQuoteUpdate: !this.state.showQuoteUpdate
    })
  }

  toggleShowCreateQuote(){
    this.setState({
      showCreateQuote: !this.state.showCreateQuote
    })
  }

  toggleShowRegisterUser(){
    this.setState({
      showRegisterUser: !this.state.showRegisterUser
    })
  }

  toggleShowLoginUser(){
    this.setState({
      showLoginUser: !this.state.showLoginUser
    })
  }

  logToken(token , username){
    this.setState({
      userToken: token,
      username : username,
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
    this.toggleShowQuoteUpdate()
    fetch(`${baseURL}quotes/${event.target.id}/`)
    .then(data => { return data.json()} , err => console.log(err))
    .then(parsedData => 
      this.setState({
        quote: parsedData,
        id: parsedData.id,
    }) , err => console.log(err))
  }

  getQuotes(){
    fetch(baseURL + 'quotes/')
    .then(data => {return data.json()} , err => console.log(err))
    .then(parsedData => this.setState({quotes: parsedData}), err => console.log(err))
  }

  handleDeleteQuote(event) {
    // console.log(event.target.id)
    fetch(`${baseURL}quotes/${event.target.id}/`, {
      method: 'DELETE'
    })
      .then(res => {
        if(res.status === 200) {
          const findIndex = this.state.quotes.findIndex(quote => quote._id === event.target.id)
          const copyQuotes = [...this.state.quotes]
          copyQuotes.splice(findIndex, 1)

          this.setState({
            quotes: copyQuotes
          })
        }
      })
      setTimeout(() => {
        this.getQuotes()
      }, 100)
  }


  render(){
    return (
      <div className="App">
        <div>
          <button onClick={this.toggleShowLoginUser} >LOGIN</button>
          <button>LOGOUT</button>
          <button onClick={this.toggleShowRegisterUser}>REGISTER USER</button>
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
          this.state.showLoginUser && 
          <LoginUser toggleShowLoginUser={this.toggleShowLoginUser} logToken={this.logToken} />
        }
        {
          this.state.showRegisterUser && 
          <RegisterUser toggleShowRegisterUser={this.toggleShowRegisterUser} />
        }
        {
          this.state.showQuoteUpdate &&
          <UpdateQuote quote={this.state.quote} toggleShowQuoteUpdate={this.toggleShowQuoteUpdate} getQuotes={this.getQuotes}/>
        }
        {
          this.state.showQuotes && 
          <Quotes quotes={this.state.quotes} handleEditQuote={this.handleEditQuote} handleDeleteQuote={this.handleDeleteQuote} /> 
        } 
        {
          this.state.showCreateQuote &&
          <CreateQuote handleAddQuote={this.handleAddQuote} toggleShowCreateQuote={this.toggleShowCreateQuote} getQuotes={this.getQuotes}/>

        }


      </div>

    )
  }
}


export default App