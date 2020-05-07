import React, { Component } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import BookCarousel from './BookCarousel.js'
import * as actions from '../actions';

axios.defaults.withCredentials = true

class LandingPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            newUsername: '',
            newPassword: '',
            groupName: ''
        }

        this.handleSignUp = this.handleSignUp.bind(this)
        this.handleLogIn = this.handleLogIn.bind(this)
    } 

  handleLogIn(event) {
    event.preventDefault()
    console.log(event)
    console.log(this.state.username, this.state.password)
    this.props.logIn(this.state.username, this.state.password)
  }

  handleSignUp(event) {
    event.preventDefault()
    const body = {
      "newUsername": this.state.newUsername,
      "newPassword": this.state.newPassword
    }

    axios.post(`http://localhost:5000/sign-up`, body)
    console.log("signing up")
    // event.preventDefault()
    // this.props.signUp(this.state.newUsername, this.state.newPassword)
  }

  handleAddGroup(event) {
    event.preventDefault()
    const body = {
      groupName: this.state.groupName
    }
    axios.post("http://localhost:5000/addgroup", body, {withCredentials: true})
  }
  
  render() {
    return (
      <div>
      <BookCarousel />
       <form onSubmit={event => {this.handleSignUp(event)}}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" onChange= {event => this.setState({newUsername: event.target.value})}/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange= {event => this.setState({newPassword: event.target.value})}/>
        </div>
        <div>
          <button type="submit" value="Log In">Sign Up</button>
        </div>
       </form>
       <form onSubmit={event => this.handleLogIn(event)}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" onChange= {event => this.setState({username: event.target.value})}/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange= {event => this.setState({password: event.target.value})}/>
        </div>
        <div>
          <button type="submit" value="Log In">Log In</button>
        </div>
       </form>
       <form onSubmit={event => this.handleAddGroup(event)}>
        <div>
          <label>Group Name:</label>
          <input type="group-name" name="group-name" onChange= {event => this.setState({groupName: event.target.value})}/>
        </div>
        <div>
          <button type="submit" value="add-group">Add Group</button>
        </div>
       </form>
      </div>
      ) 
    }
  }
  
  function mapStateToProps(state) {
    return ({
      user: state.user
    })
  }
  
  export default connect(
    mapStateToProps, 
    actions
  )(LandingPage);