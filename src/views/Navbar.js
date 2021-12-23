import React from 'react'
import {Container, Nav, Navbar, Image} from "react-bootstrap";
import logo from "./assets/logoUnisaEAT.png"
import iconaUtente from "./assets/iconaUtente.png"
function NavbarApp () {
  return (
      <Navbar className="navbarStyle" expand="lg" >
        <Container className="containerStyle">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">

              <Nav.Link className="elementoNav" href="/Homepage">
                <Image src={logo}
                width="80"/>
              </Nav.Link>
                <Container className="containerElementoStyle">
              <Nav.Link href="/InserimentoPersonale">InserimentoPersonale</Nav.Link>
              <Nav.Link href="/RimozionePersonale">
                  <Image src={iconaUtente}
                         width="50"/>
              </Nav.Link>
                </Container>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default NavbarApp
