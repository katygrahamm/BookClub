import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from '../actions';
import Header from "./Header.js"
import "./UserGroups.css"
import { Row, Card, Col, Container, Dropdown, Button, ButtonGroup, Accordion } from 'react-bootstrap'

class UserGroups extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newGroupName: "",
            groupPrivate: false
        }

        this.addNewGroup = this.addNewGroup.bind(this)
    }

    addNewGroup() {
        this.props.addGroup(this.state.newGroupName, this.state.groupPrivate)
    }

    render() {
        return (
            <div>
                <Header />
                <Row>
                    <Col sm={4}></Col>
                    <Col sm={4} className="new-group-accordion">
                        <Accordion>
                            <Accordion.Toggle className="new-group-button" as={Button} variant="secondary" eventKey="0">
                                <i class="fas fa-plus-circle"><span className="new-group-button-label">New Group</span></i>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card>
                                    <format className="new-group-form">
                                        <input placeHolder="Group Name" onChange={event => {this.setState({ newGroupName: event.target.value})}}></input>
                                        <br></br>
                                        <span className="private-toggle">Private</span>
                                        <label class="switch" onChange={event => {this.setState({ groupPrivate: !this.state.groupPrivate})}}>
                                            <input type="checkbox"></input>
                                            <span class="slider round"></span>
                                        </label>
                                        <br></br>
                                        <Button variant="secondary" className="new-group-submit" onClick={event => {this.addNewGroup()}}>Submit</Button>
                                    </format>
                                </Card>
                            </Accordion.Collapse>
                        </Accordion>
                    </Col>
                    <Col sm={4}></Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return ({
        user: state.user,
        userGroups: state.groups
    })
}
  
  export default connect(
    mapStateToProps, 
    actions
  )(UserGroups);