import React from 'react'
import {Navbar,Container,Nav, NavDropdown } from 'react-bootstrap'
import '../App.css'

function Homepage () {
  return (
      <Navbar className="sfondo" expand="lg">
        <Container>
          <Navbar.Brand>UNISAEAT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">HOME</Nav.Link>
              <Nav.Link href="/profilo">PROFILO</Nav.Link>
              <Nav.Link href="/logout">LOGOUT</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default Homepage