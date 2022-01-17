import React from 'react'
import {Container, Nav, Navbar, NavDropdown,Form,Button,FormControl, Image} from "react-bootstrap";
import "../../../App.css"
import logo from "../../assets/logoUnisaEAT.png"
import "../../styles/AppStyle/NavBarAttore.css"

//Icone


function NavbarAttore() {

    if(localStorage.getItem("ruolo")==="cliente")
        return (
            <Navbar sticky="top" className="navEsempio" expand="lg">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="navItemContainer me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >

                            <p>Compila ticket</p>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="navItemContainer me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >

                            <p>Compila ticket</p>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="navItemContainer me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >

                            <p>Compila ticket</p>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="navItemContainer me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >

                            <p>Compila ticket</p>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    else if(localStorage.getItem("ruolo")==="personale adisu")
        return (
            <Navbar className="navbarStyle" expand="lg">
                <Container className="containerStyle">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            Clienti operazioni
                            <NavDropdown title="Ticket" id="navbarScrollingDropdown">

                                <NavDropdown.Item href="#action3">Compila ticket</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    else if(localStorage.getItem("ruolo")==="operatore mensa")
        return (
            <Navbar className="navbarStyle" expand="lg">
                <Container className="containerStyle">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            Clienti operazioni
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    else if(localStorage.getItem("ruolo")==="admin")
        return (
            <Navbar className="navbarStyle" expand="lg">
                <Container className="containerStyle">
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            Clienti operazioni
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    else
        return null
}

export default NavbarAttore
