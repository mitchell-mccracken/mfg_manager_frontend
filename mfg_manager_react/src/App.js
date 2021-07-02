import {Component} from 'react'

let baseURL;

// baseURL = 'http://127.0.0.1:8000/api/'
baseURL = 'http://127.0.0.1:8000/api/'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      loggedIn: false,
      showQuotes: false,
      showLogin: false,
      showCreateUser: false,
      userName: '',
      quotes: []
    }
    this.getQuotes = this.getQuotes.bind(this)
  }


  componentDidMount(){
    this.getQuotes()
  }

  getQuotes(){
    fetch(baseURL + 'quotes/')
    .then(data => {return data.json()} , err => console.log(err))
    .then(parsedData => this.setState({quotes: parsedData}), err => console.log(err))
  }


  render(){
    return (
      <div className="App">
        <h1>Mfg Manager App</h1>
      </div>

    )
  }
}


export default App