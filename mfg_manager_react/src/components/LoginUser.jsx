import {Component} from 'react'

let baseURL = 'http://127.0.0.1:8000/quotes/api/auth/'

class LoginUser extends Component{
    constructor(props){
        super(props)

        this.state = {
            username : '',
            password : '',
            userToken: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
    }

    handleSubmit(event){
        event.preventDefault()
        fetch(baseURL + 'login' , {
            method: 'POST',
            body: JSON.stringify({
                username : this.state.username,
                password : this.state.password,
            }) , 
            headers: {
                'Content-Type' : 'application/json'
            }
        })
        .then(res => res.json())
        .then(resJson => {
            console.log(resJson.user.username)
            let token = resJson.token
            this.props.logToken(token , resJson.user.username)
            this.setState({
                username: '',
                password : '',
                userToken : token
            })
        })
        .catch(error => console.log({'Error' : error}))
        console.log('user logged in')

        
    }

    render(){
        return(
            <div>
                <h2>Register New User</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>User Name</label>
                    <input onChange={this.handleChange} type='text' name='username' id='username' /> <br/>
                    <label>Password</label>
                    <input onChange={this.handleChange} type='text' name='password' id='password' /> <br/>

                    <br/><input type='submit' value='Register User'/>
                </form>
            </div>
        )
    }
}

export default LoginUser