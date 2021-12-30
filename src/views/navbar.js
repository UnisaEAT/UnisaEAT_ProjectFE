import React from 'react'
import {Navbar,Container,Nav } from 'react-bootstrap'
import './componentsCss/navbarCSS.css'
import '../App.css'

function NavbarApp () {
  return (
      <Navbar className="navbarStyle bg-black bg-opacity-10" expand="lg">
        <Container className="elementoNav">
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="elementoLogo" href="/gestioneTesserino/richiestaTesserino">
                <h4>Richiedi tesserino</h4>
              </Nav.Link>
              <Nav.Link href="/gestioneTesserino/rinnovoTesserino">
                <h4>Rinnova tesserino</h4>
              </Nav.Link>
              <Nav.Link className="elementoIconaUtente" href="/gestioneTesserino/visualizzaSaldo">
                <h4>Saldo tesserino</h4>
              </Nav.Link>
              <Nav.Link className="elementoIconaUtente" href="/gestioneTesserino/ricaricaTesserino">
                <h4>Ricarica tesserino</h4>
              </Nav.Link>
			  <Nav.Link className="elementoIconaUtente" href="/profilo">
                <h4>Profilo</h4>
              </Nav.Link>

export default NavbarApp

