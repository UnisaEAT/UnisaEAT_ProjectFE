import React from 'react'
import { Component } from 'react'
import {Navbar,Container,Nav } from 'react-bootstrap'
import '../App.css'

export default class NavbarApp  extends Component {
  
  
 //problema da risolvere PASSAGGIO DI COMPONENTI
  render(){
    
    console.log(localStorage.getItem("email")) 
    if(localStorage.getItem("email")!==null) {
        return(
        <Navbar className="navbarStyle bg-black bg-opacity-10" expand="lg">
        <Container className="elementoNav">
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="elementoLogo" href="/">
                <h4>Home</h4>
              </Nav.Link>
              <Nav.Link className="elementoIconaUtente" href="/logout">
                <h4>Logout</h4>
              </Nav.Link>
              
            </Nav>
            </Navbar.Collapse>
            </Container>
            </Navbar>
        )
    } 
    else {  
      return (
          <Navbar className="navbarStyle bg-black bg-opacity-10" expand="lg">
            <Container className="elementoNav">
              <Navbar.Toggle aria-controls="basic-navbar-nav"/>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link className="elementoLogo" href="/">
                    <h4>Home</h4>
                  </Nav.Link>
                  <Nav.Link href="/login">
                    <h4>Login</h4>
                  </Nav.Link>
                
                </Nav>
                </Navbar.Collapse>
                </Container>
                </Navbar>
      )
    }
  }
}
