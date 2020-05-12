import React, { Component } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import BookCarousel from './BookCarousel.js'
import Card from 'react-bootstrap/Card'
import { Button, Row, Col } from 'react-bootstrap'
import * as actions from '../actions';
import Header from "./Header.js"

axios.defaults.withCredentials = true

class LandingPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newUsername: '',
            newPassword: '',
        }

        this.handleLogIn = this.handleLogIn.bind(this)
    } 

  handleLogIn(event) {
    event.preventDefault()
    console.log(event)
    console.log(this.state.username, this.state.password)
    this.props.logIn(this.state.username, this.state.password)
  }
  
  render() {
    return (
      <div>
      <BookCarousel />
        <Row className="landing-page">
          <Col></Col>
          <Col xs={3}>
            <Card style={{ width: '18rem' }} className="lp-card">
              <Card.Body>
                <h2 className="text-center welcome">Welcome to <strong>bookclub</strong></h2>
                <form className="sign-in-form" onSubmit={event => this.handleLogIn(event)}>
                  <div>
                    <label>Username:</label>
                    <input type="text" name="username" onChange= {event => this.setState({username: event.target.value})}/>
                  </div>
                  <div className="password">
                    <label>Password:</label>
                    <input type="password" name="password" onChange= {event => this.setState({password: event.target.value})}/>
                  </div>
                  <div className="text-center submit-btn"> 
                    <Button variant="dark" type="submit" value="Log In">Login</Button>
                  </div>
                </form>
                <p className="text-center">If you don't already have an account sign up <a href="/sign-up">here</a></p>
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