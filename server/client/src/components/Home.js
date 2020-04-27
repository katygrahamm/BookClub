import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions';

class Home extends Component {
    constructor(props) {
        super(props)

        }

  
  render() {
    return (
      <div>
       <h1>Hello User</h1>
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
  )(Home);