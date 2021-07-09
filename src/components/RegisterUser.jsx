import {Component} from 'react'

let baseURL;
// let baseURL = 'http://127.0.0.1:8000/quotes/api/auth/'

//added this section for heroku deployment
if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://127.0.0.1:8000/quotes/api/auth/';
  } else {
    baseURL = 'https://mfg-manager-api.herokuapp.com/';
  }

class RegisterUser extends Component{
    constructor(props){
        super(props)

        this.state = {
            username : '',
            email : '',
            password : '',
            password2 : '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
    }

    handleSubmit(event){
        event.preventDefault()
        fetch(baseURL + 'register' , {
            method: 'POST',
            body: JSON.stringify({
                username : this.state.username,
                email : this.state.email,
                password : this.state.password,
            }) , 
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(resJson => {
            this.setState({
                username: '',
                email: '',
                password : '',
                password2 : '',
            })
        })
        .catch(error => console.log({'Error' : error}))
        console.log('user registered')
        setTimeout(() => {
            this.props.toggleShowRegisterUser()
        }, 200);
        
    }

    render(){
        return(
            <div>
                <h2>Register New User</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>User Name</label>
                    <input onChange={this.handleChange} type='text' name='username' id='username' /> <br/>
                    <label>email</label> 
                    <input onChange={this.handleChange} type='text' name='email' id='email' /> <br/>
                    <label>Password</label>
                    <input onChange={this.handleChange} type='text' name='password' id='password' /> <br/>
                    <label>re-enter password</label>
                    <input onChange={this.handleChange} type='text' name='password2' id='password2' /> <br/>

                    <br/><input type='submit' value='Register User'/>
                </form>
            </div>
        )
    }
}

export default RegisterUser