import React from 'react';
import { Component } from 'react'
import { Link } from "react-router-dom"
import './Header.css'
import { Row, Col, Container, Dropdown, Button, ButtonGroup } from 'react-bootstrap'

class Header extends Component{
    render() {
        return (
         <div className="header">
            <Row>
                <Col sm={4}></Col>
                <Col sm={4}>
                    <div className="logo">
                        <i class="fas fa-book-open fa-5x"></i>
                    </div>
                </Col>
                <Col sm={4}></Col>
            </Row>
            <br></br>
            <div>
                <Container>
                    <Row className="nav-bar">              
                        <Col className="nav-bar-link" sm={3}><span className="link-text"><Link to={'/home'} style={{color:'black'}}>Home</Link></span></Col>
                        <Col className="nav-bar-link" sm={3}><span className="link-text"><Link to={'/shelves'} style={{color:'black'}}>MyShelves</Link></span></Col>
                        <Col className="nav-bar-link" sm={3}><span className="link-text"><Link to={'/groups'} style={{color:'black'}}>MyGroups</Link></span></Col>
                        <Col className="nav-bar-link" sm={3}>
                            <span className="search">
                                <form className="input-group search-bar">
                                    <input
                                        className="search-input"
                                        value={this.props.searchTerm}
                                        onChange={(event) => {}}
                                    />
                                <Dropdown className="search-dropdown" as={ButtonGroup}>
                                    <Dropdown.Toggle split variant="secondary" id="dropdown-split-basic" />

                                    <Dropdown.Menu>
                                        <Dropdown.Item value="groups">Groups</Dropdown.Item>
                                        <Dropdown.Item value="books">Books</Dropdown.Item>
                                        <Dropdown.Item value="Pages">Pages</Dropdown.Item>
                                    </Dropdown.Menu>
                                    </Dropdown>
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