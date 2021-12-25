import React from 'react'
import {Container, Nav, Navbar, Image} from "react-bootstrap";
import logo from "../../assets/logoUnisaEAT.png"
import notifiche from "../../assets/Notifiche.png"
import iconaUtente from "../../assets/iconaUtente.png"
import "../../../App.css"

function NavbarApp() {
    return (
        <Navbar className="navbarStyle" expand="lg">
            <Container className="containerStyle">
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link className="elementoNav" href="/">
                            <Image src={logo}
                                   width="80"/>
                        </Nav.Link>
                        <Nav.Link className="elementoNav" href="/">
                            <Image src={notifiche}
                                   width="65"/>

                        </Nav.Link>
                        <Container className="containerStyle">
                            <Nav.Link href="/">
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
