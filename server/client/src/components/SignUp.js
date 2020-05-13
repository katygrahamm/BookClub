import React, { Component } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import Card from 'react-bootstrap/Card'
import { Button, Row, Col } from 'react-bootstrap'
import * as actions from '../actions';
import Header from "./Header.js"

axios.defaults.withCredentials = true

class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            profilePic: 'https://cdn1.iconfinder.com/data/icons/occupations-3/100/03-512.png',
            newUsername: '',
            newPassword: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSignUp = this.handleSignUp.bind(this)
    } 
  
  handleChange(event) {
    this.setState({
      profilePic: URL.createObjectURL(event.target.files[0])
    })
  }

  handleSignUp(event) {
    event.preventDefault()
    const body = {
      "firstName":this.state.firstName,
      "lastName": this.state.lastName,
      "profilePic": this.state.profilePic,
      "newUsername": this.state.newUsername,
      "newPassword": this.state.newPassword
    }

    axios.post(`http://localhost:5000/sign-up`, body)
    console.log("signing up")
    // event.preventDefault()
    // this.props.signUp(this.state.newUsername, this.state.newPassword)
    this.props.history.push('/');
  }
  
  render() {
    return (
      <div>
        <Row className="sign-up-page">
          <Col></Col>
          <Col xs={4} className="signup-card">
            <Card style={{ width: '30rem' }}>
              <Card.Body>
                <h2 className="text-center welcome">Welcome to <strong>bookclub</strong></h2>
                <form className="sign-in-form" onSubmit={event => {this.handleSignUp(event)}}>
                  <div className="first-name">
                    <label>First Name: </label>
                    <input className="width" type="text" name="firstname" onChange={event => this.setState({firstName: event.target.value})}/>
                  </div>
                  <div className="last-name">
                    <label>Last Name: </label>
                    <input className="width" type="text" name="lastname" onChange={event => this.setState({lastName: event.target.value})}/>
                  </div>
                  <div>
                    {/* <label>Profile Picture: </label>
                    <input type="file" onChange={this.handleChange}/>
                    <img className="profile-pic-preview text-center" src={this.state.profilePic}/> */}
                    {/* <input type="file" name="profilepic" onChange={event => this.setState({profilePic: URL.createObjectURL(event.target.files[0])})}/> */}
                  </div>
                  <div>
                    <label>Username: </label>
                    <input className="width" type="text" name="username" onChange={event => this.setState({newUsername: event.target.value})}/>
                  </div>
                  <div className="password">
                    <label>Password: </label>
                    <input className="width" type="password" name="password" onChange={event => this.setState({newPassword: event.target.value})}/>
                  </div>
                  <div className="text-center submit-btn"> 
                    <Button variant="dark" type="submit" value="Sign Up">Sign Up</Button>
                  </div>
                </form>
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
  )(SignUp);