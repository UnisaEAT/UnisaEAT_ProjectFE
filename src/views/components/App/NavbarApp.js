import React from 'react'
import {Container, Nav, Navbar, Image} from "react-bootstrap";
import logo from "../../assets/logoUnisaEAT.png"
import notifiche from "../../assets/Notifiche.png"
import iconaUtente from "../../assets/iconaUtente.png"
import "../../styles/AppStyle/NavbarApp.css"

function NavbarApp() {
    return (
        <Navbar className="navbarStyle" expand="lg">
            <Container className="elementoNav">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="elementoLogo" href="/">
                            <Image src={logo}
                                   width="80"/>
                        </Nav.Link>
                        <Nav.Link href="/">
                            <Image src={notifiche}
                                   width="65"/>

                        </Nav.Link>
                        <Nav.Link className="elementoIconaUtente" href="/gestioneProfilo/profilo">
                            <Image src={iconaUtente}
                                   width="50"/>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarApp
