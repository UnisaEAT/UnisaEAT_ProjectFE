import React from 'react'
import {Container, Nav, Navbar, Image,Button} from "react-bootstrap";
import logo from "../../assets/logoUnisaEAT.png"
import notifiche from "../../assets/Notifiche.png"
import iconaUtente from "../../assets/iconaUtente.png"
import "../../styles/AppStyle/NavbarApp.css"
function NavbarApp() {
    console.log(localStorage.getItem("email")) 
    if(localStorage.getItem("email")===null) {
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
                    <Button  href="/login">LOGIN</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
    } else{
        return(
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
                        <br></br>
                    </Nav>
                    <Button  href="/logout">LOGOUT</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        )
    }
}

export default NavbarApp
