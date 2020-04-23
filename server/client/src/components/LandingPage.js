import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions';

class LandingPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: ''
        }
    } 

  handleSubmit(event) {
      event.preventDefault()
      console.log(event)
      console.log(this.state.username, this.state.password)
      this.props.addUser(this.state.username, this.state.password)
  }
  
  render() {
    return (
      <div>
       <form onSubmit={event => this.handleSubmit(event)}>
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