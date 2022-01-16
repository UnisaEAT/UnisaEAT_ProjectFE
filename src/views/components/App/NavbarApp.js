import React from 'react'
import {Container, Nav, Navbar, Image, Button, NavItem, NavDropdown} from "react-bootstrap";
import logo from "../../assets/logoUnisaEAT.png"
import notifiche from "../../assets/Notifiche.png"
import iconaUtente from "../../assets/iconaUtente.png"
import logoutIcon from "../../assets/logout.png"

import TicketIcon from "../../assets/iconeNavbar/ticket.png"
import OrdinaIcon from "../../assets/iconeNavbar/ordina.png"
import TesserinoIcon from "../../assets/iconeNavbar/tesserino.png"
import FaqIcon from "../../assets/iconeNavbar/faq.png"
import MenuIcon from "../../assets/iconeNavbar/menu.png"

import "../../styles/AppStyle/NavbarApp.css"
import "../../styles/gestioneAutenticazione/login.css"



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
                                   width="10"/>
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
            <div className="navbarStyle">
                    <Nav.Link className="elementoLogo" href="/">
                        <Image src={logo}
                               width="100"/>
                    </Nav.Link>

                <Nav>
                    <NavItem className="nav-item-NavBarAttore justify-content-center d-flex">
                        <Nav.Link className="elementoNavBarAttore">
                            <Image className="imageNavBarAttore" src={TicketIcon} width="45"/>
                            <NavDropdown className="testoDropDown" title="Ticket">
                                <NavDropdown.Item href="/gestioneTicket/compilazioneTicket">Compila ticket</NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Link>
                    </NavItem>

                    <NavItem className="nav-item-NavBarAttore justify-content-center d-flex">
                        <Nav className="elementoNavBarAttore">
                            <Image className="imageNavBarAttore" src={OrdinaIcon} width="50"/>
                                <NavDropdown className="testoDropDown" title="Ordinazione" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="/gestioneOrdinePasto/sceltaPasti">Componi l'ordine</NavDropdown.Item>
                                    <NavDropdown.Item href="/gestioneOrdinePasto/listaOrdini">Ordini precedenti</NavDropdown.Item>
                                </NavDropdown>
                        </Nav>

                    </NavItem>

                    <NavItem className="nav-item-NavBarAttore justify-content-center d-flex">
                        <Nav className="elementoNavBarAttore" href="/">
                            <Image className="imageNavBarAttore" src={MenuIcon} width="45"/>
                            <NavDropdown className="testoDropDown" title="Menù" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/gestioneMenu/visualizzazioneMenu">Menù giornaliero</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </NavItem>

                    <NavItem className="nav-item-NavBarAttore justify-content-center d-flex">
                        <Nav.Link className="elementoNavBarAttore" href="/">
                            <Image className="imageNavBarAttore" src={TesserinoIcon} width="52"/>
                            <NavDropdown className="testoDropDown" title="Tesserino" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/gestioneTesserino/richiestaTesserino">Richiedi tesserino digitale</NavDropdown.Item>
                                <NavDropdown.Item href="/gestioneTesserino/rinnovoTesserino">Rinnova tesserino</NavDropdown.Item>
                                <NavDropdown.Item href="/gestioneTesserino/ricaricaTesserino">Ricarica tesserino</NavDropdown.Item>
                                <NavDropdown.Item href="/gestioneTesserino/visualizzaSaldo">Saldo tesserino</NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Link>
                    </NavItem>

                    <NavItem className="nav-item-NavBarAttore justify-content-center d-flex">
                        <Nav.Link className="elementoNavBarAttore" href="/">
                            <Image className="imageNavBarAttore" src={FaqIcon} width="45"/>
                            <NavDropdown className="testoDropDown" title="FAQ" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/gestioneFAQ/visualizzazioneFAQ">Visualizza FAQs</NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Link>
                    </NavItem>


                </Nav>

                    <NavItem className="nav-item justify-content-end d-flex">
                        <Nav.Link className="notificheButton" href="/">
                            <Image src={notifiche}
                                   width="45"/>
                        </Nav.Link>
                        <Nav.Link className="elementoIconaUtente" href="/gestioneProfilo/profilo">
                            <Image src={iconaUtente}
                                   width="50"/>
                        </Nav.Link>
                        <Nav.Link className="logoutButton" href="/logout">
                            <Image src={logoutIcon}
                                   width="32"/>
                        </Nav.Link>
                    </NavItem>



            </div>
        )
    }
}

export default NavbarApp
