import React, {Component} from 'react';
import LoginPage from "./components/LoginPage"
import Dashboard from "./components/Dashboard"
import './stylesheets/App.css';

const {apiPostRequest} = require("./utils/apiCalls")

export default class App extends Component {

  state = {
    authenticated: false,
    loginError: false,
    credentials: {
      username: "",
      password: ""
    }
  }

  componentDidMount = () => {
    if (localStorage.ccToken) this.setState({...this.state, authenticated: true})
  }

  resetCredentials = () => {
    this.setState({
      ...this.state,
      credentials: {
        username: "",
        password: ""
      }
    })
  }

  updateAuthentication = (res) => {
    if (res.non_field_errors) this.setState({...this.state, loginError: true})
    else {
      localStorage.setItem("ccToken", `Token ${res.token}`)
      this.setState({ ...this.state, authenticated: true})
    }
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {username, password} = this.state.credentials
    this.resetCredentials()
    apiPostRequest({
      "Content-Type": "application/json",
      "Access": "application/json"
    }, {username, password}, this.updateAuthentication)
  }

  render(){
    return (
      <div className="App">
        <h1>{this.state.authenticated === false ? "Welcome to the NYCC Dashboard" : "Cases in Your District"}</h1>
        {this.state.authenticated === false ? <LoginPage loginObj={this.state.credentials} submit={this.handleSubmit} changeHandler={this.handleChange} errorStatus={this.state.loginError} />  : <Dashboard /> }
      </div>
    );
  }
}
