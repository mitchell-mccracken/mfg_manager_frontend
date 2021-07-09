import {Component} from 'react'
import Cookies from 'universal-cookie'

let baseURL = 'http://127.0.0.1:8000/quotes/api/auth/'
let loginURL = 'http://127.0.0.1:8000/accounts/login/'

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
        // fetch(loginURL, {
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
            // console.log(resJson.user.username)
            // console.log(resJson)
            let token = resJson.token
            this.props.logToken(token , resJson.user.username)
            this.setState({
                username: '',
                password : '',
                userToken : token
            })
            let cookieAge = 60;     // value in seconds
            const cookies = new Cookies();
            cookies.set('mitchToken', resJson.token, { path: '/' , maxAge: cookieAge });
            cookies.set('username', resJson.user.username, { path: '/' , maxAge: cookieAge });

        })
        .catch(error => console.log({'Error' : error}))
        console.log('user logged in')
        setTimeout(() => {
            let newtoken = {'value' : localStorage , 'startDate' : 'sample' , 'endDate' : Date()}
            console.log(newtoken)
            console.log(localStorage.csrftoken)
            
            // cookies.set('mitchToken', {'test': this.state.userToken, 'user': this.state.username}, { path: '/' , maxAge: 60 });

        }, 500);
        
    }

    render(){
        return(
            <div>
                <h2>User Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>User Name</label>
                    <input onChange={this.handleChange} type='text' name='username' id='username' value={this.state.username}/> <br/>
                    <label>Password</label>
                    <input onChange={this.handleChange} type='text' name='password' id='password' value={this.state.password}/> <br/>

                    <br/><input type='submit' value='Login'/>
                </form>
            </div>
        )
    }
}

export default LoginUser