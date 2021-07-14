import {Component} from 'react'
import Cookies from 'universal-cookie'
import Quotes from './components/Quotes'
import CreateQuote from './components/CreateQuote'
import UpdateQuote from './components/UpdateQuote'
import RegisterUser from './components/RegisterUser'
import LoginUser from './components/LoginUser'
import OpenOrders from './components/OpenOrders'


let baseURL;

// baseURL = 'http://127.0.0.1:8000/api/'
// baseURL = 'http://127.0.0.1:8000/api/'

//added this section for heroku deployment
// if (process.env.NODE_ENV === 'development') {
//   baseURL = 'http://127.0.0.1:8000/api/';
// } else {
//   baseURL = 'https://mfg-manager-api.herokuapp.com/api/';
// }

if ( window.location.origin === "https://mfg-manager-frontend.herokuapp.com"){
  baseURL = 'https://mfg-manager-api.herokuapp.com/api/'
} else {
  baseURL = 'http://127.0.0.1:8000/api/'
}


class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      loggedIn: false,
      showQuotes: false,
      showOpenOrders: false,
      showCreateQuote: false,
      showLoginUser: false,
      showRegisterUser: false,
      showQuoteUpdate: false,
      userName: '',
      quotes: [],
      orders: [],
      quote: {},
      id: '', 
      userToken: '',
    }
    this.getQuotes = this.getQuotes.bind(this)
    this.getOpenOrders = this.getOpenOrders.bind(this)
    this.toggleShowQuotes = this.toggleShowQuotes.bind(this)
    this.toggleShowOpenOrders = this.toggleShowOpenOrders.bind(this)
    this.toggleShowCreateQuote = this.toggleShowCreateQuote.bind(this)
    this.toggleShowQuoteUpdate = this.toggleShowQuoteUpdate.bind(this)
    this.handleAddQuote = this.handleAddQuote.bind(this)
    this.handleEditQuote = this.handleEditQuote.bind(this)
    this.handleDeleteQuote = this.handleDeleteQuote.bind(this)
    this.toggleShowRegisterUser = this.toggleShowRegisterUser.bind(this)
    this.toggleShowLoginUser = this.toggleShowLoginUser.bind(this)
    this.logToken = this.logToken.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
    this.checkLogin = this.checkLogin.bind(this)
    this.setLoggedInStatus = this.setLoggedInStatus.bind(this)
  }


  componentDidMount(){
    this.getQuotes()
    this.getOpenOrders()
    let cookie= new Cookies()
    if(cookie.get('mitchToken')){
      this.setState({
        loggedIn: true,
        userName: cookie.get('username'),
      })
    }
  }

  toggleShowQuotes(){
    this.setState({
      showQuotes: !this.state.showQuotes,
      showQuoteUpdate: false,
      showOpenOrders: false,
    })
  }
  toggleShowOpenOrders(){
    this.setState({
      showOpenOrders: !this.state.showOpenOrders,
      showQuotes : false,
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
      userName : username,
    })
  }


  logoutUser(){
    let cookie = new Cookies()
    if (cookie.get('mitchToken')){    //not sure if I need an if statement
      console.log('there is a token')
      // console.log(cookie.get('mitchToken'))
      cookie.remove('mitchToken')
      cookie.remove('username')
      this.setState({
        userName: '',
        userToken:'',
        loggedIn: false,
      })
      setTimeout(() => {
        this.checkLogin()
      }, 500);
    }
    else{
      console.log('no token')
    }
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

  getOpenOrders(){
    fetch(baseURL + 'openorders/')
    .then(data => {return data.json()} , err => console.log(err))
    .then(parsedData => this.setState({orders: parsedData}), err => console.log(err))
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

  // conditional rendering for user logged in or not
  setLoggedInStatus(){
    this.setState({
      loggedIn: true,
    })
  }


  checkLogin(){
    if (this.state.loggedIn){
      return <p className='top-right'>Logged in as: {this.state.username}</p>
    }
    else {
      return <p className='top-right'>User Not Logged In</p>
    }
  }


  render(){
    return (
      <div className="App">
        <div className="nav-buttons"> 
          {/* <button onClick={this.toggleShowLoginUser} >LOGIN</button> */}
          {/* <button onClick={this.sessionDelete}>LOGOUT</button> */}
          {/* <button onClick={this.logoutUser}>LOGOUT</button> */}
          {/* <button onClick={this.toggleShowRegisterUser}>REGISTER USER</button> */}
          <p>
            <span onClick={this.toggleShowLoginUser}>  LOGIN </span>   
            <span onClick={this.logoutUser} > LOGOUT </span> 
            <span onClick={this.toggleShowRegisterUser} > REGISTER USER </span>  
          </p>
        </div>
        {
          this.state.userName !== '' &&
          <p className='top-right'>Logged in as: {this.state.userName}</p>
        }
        {
          this.state.userName === '' &&
          <p className='top-right'>User Not Logged In</p>
        }

        {/* {this.checkLogin()} */}

        <h1>Mfg Manager App</h1>
        <div className="toolbar-buttons">
          <button onClick={this.toggleShowQuotes}>OPEN QUOTES</button>
          <button  onClick={this.toggleShowOpenOrders}>OPEN ORDERS</button>
          <button className='not-working'>COMPLETED JOBS</button>
          {/* <button onClick={this.toggleShowCreateQuote}>Create Quote</button> */}
          {/* <button onClick={this.sampleFunc}>Create Open Order</button> */}
        </div>
        {
          this.state.showLoginUser && 
          <LoginUser toggleShowLoginUser={this.toggleShowLoginUser} logToken={this.logToken} checkLogin={this.checkLogin} setLoggedInStatus={this.setLoggedInStatus}/>
        }
        {
          this.state.showRegisterUser && 
          <RegisterUser toggleShowRegisterUser={this.toggleShowRegisterUser} />
        }
        {
          this.state.showQuoteUpdate &&
          <UpdateQuote quote={this.state.quote} toggleShowQuoteUpdate={this.toggleShowQuoteUpdate} getQuotes={this.getQuotes} getOpenOrders={this.getOpenOrders}/>
        }
        {
          this.state.showCreateQuote &&
          <CreateQuote handleAddQuote={this.handleAddQuote} toggleShowCreateQuote={this.toggleShowCreateQuote} getQuotes={this.getQuotes}/>

        }
        {
          this.state.showQuotes && 
          <Quotes quotes={this.state.quotes} handleEditQuote={this.handleEditQuote} handleDeleteQuote={this.handleDeleteQuote} getQuotes={this.getQuotes} toggleShowCreateQuote={this.toggleShowCreateQuote}/> 
        } 
        {
          this.state.showOpenOrders && 
          <OpenOrders orders={this.state.orders}/>
        }
        


      </div>

    )
  }
}


export default App