import React from 'react';
import { Component } from 'react'
import { Link } from "react-router-dom"
import './Header.css'
import { Row, Col, Container } from 'react-bootstrap'

class Header extends Component{
    render() {
        return (
         <div className="header">
            <div className="logo">
                <i class="fas fa-book-open fa-5x"></i>
            </div>
            <div>
                <Container>
                    <Row className="nav-bar">              
                        <Col xs={2}><Link to={'/home'}>Home</Link></Col>
                        <Col xs={2}><Link to={'/shelves'}>MyShelves</Link></Col>
                        <Col xs={2}><Link to={'/groups'}>MyGroups</Link></Col>
                        <Col xs={6}>
                        <span>
                            <form className="input-group search-bar">
                                <input
                                    className="search-input"
                                    value={this.props.searchTerm}
                                    onChange={(event) => {}}
                                />
                                <select className="category-dropdown" onChange={event => {this.setState({ searchLanguage: event.target.value })}}>
                                    <option value="groups">Groups</option>
                                    <option value="books">Books</option>
                                    <option value="users">Users</option>
                                </select>
                            </form>
                        </span>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
        )
    }
}

export default (Header)