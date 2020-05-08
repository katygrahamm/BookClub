import React, { Component } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import BookCarousel from './BookCarousel.js'
import Card from 'react-bootstrap/Card'
import { Button, Row, Col } from 'react-bootstrap'

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
      <div className="background">
      <BookCarousel />
        <Row className="landing-page">
          <Col></Col>
          <Col xs={3}>
            <Card style={{ width: '18rem' }} className="lp-card">
              <Card.Body>
                <h2 className="text-center">Welcome to BookClub</h2>
                <form onSubmit={event => this.handleLogIn(event)}>
                  <div>
                    <label>Username:</label>
                    <input type="text" name="username" onChange= {event => this.setState({username: event.target.value})}/>
                  </div>
                  <div>
                    <label>Password:</label>
                    <input type="password" name="password" onChange= {event => this.setState({password: event.target.value})}/>
                  </div>
                  <br />
                  <div>
                    <Button variant="dark" type="submit" value="Log In">Login</Button>
                  </div>
                </form>
                <br />
                <p className="text-center">If you don't have an account sign up <a href="/">here</a></p>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
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