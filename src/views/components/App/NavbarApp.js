import React, {useEffect, useState} from 'react'
import {Nav, Image, NavItem, NavDropdown} from "react-bootstrap";
import axios from "axios";

//import function VisualizzazioneNotifiche
import VisualizzazioneNotifiche from "../gestioneNotifiche/VisualizzazioneNotifiche";

//Icone Navbar
import logo from "../../assets/logoUnisaEAT.png"
import notificheIcon from "../../assets/iconeNavbar/Notifiche.png"
import iconaUtente from "../../assets/iconeNavbar/iconaUtente.png"
import logoutIcon from "../../assets/iconeNavbar/logout.png"
import loginIcon from "../../assets/iconeNavbar/login.png"
import TicketIcon from "../../assets/iconeNavbar/ticket.png"
import OrdinaIcon from "../../assets/iconeNavbar/ordina.png"
import TesserinoIcon from "../../assets/iconeNavbar/tesserino.png"
import FaqIcon from "../../assets/iconeNavbar/faq.png"
import MenuIcon from "../../assets/iconeNavbar/menu.png"
import GestionePersonaleIcon from "../../assets/iconeNavbar/gestionePersonale.png"
import statisticheIcon from "../../assets/iconeNavbar/statistiche.png"

//import file CSS
import "../../styles/AppStyle/NavbarApp.css"
import "../../styles/gestioneAutenticazione/login.css"
import "../../styles/gestioneNotifiche/VisualizzazioneNotifiche.css"


function Notifiche(props) {
    const [open, setOpen] = useState(false)
    const [notifiche, setNotifiche] =useState([])
    
    useEffect(() =>{
        axios.post('http://localhost:8080/api/notifiche/visualizzaLista',{email: localStorage.getItem("email")})
            .then(response => {

                setNotifiche(response.data)
                console.log("post"+notifiche)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    if(notifiche.length>0) {
        return (
            <Nav.Link className="notificheButton" onClick={() => setOpen(!open)}>
                <Image src={notificheIcon}
                       width="45"/>

                <span className="icon-button__badge">{notifiche.length}</span>
                {open && props.children}
            </Nav.Link>
        );
    } else return(
        <Nav.Link className="notificheButton" onClick={() => setOpen(!open)}>
            <Image src={notificheIcon}
                   width="45"/>
            {open && props.children}
        </Nav.Link>
    )
}


function NavbarApp() {
    console.log(localStorage.getItem("email")) 
    if(localStorage.getItem("email")===null) {
    return (
        <div className="navbarStyle">
            <link href="css/hover.css" rel="stylesheet" media="all"/>
            <Nav.Link className="elementoLogo" href="/">
            <Image src={logo}
        width="100"/>
            </Nav.Link>


        <NavItem className="nav-item justify-content-end d-flex mx-lg-3">
            <Nav.Link className="loginButton" href="/login">
                <Image src={loginIcon}
                       width="45"/>
            </Nav.Link>
        </NavItem>

    </div>
    )
    }
    else if(localStorage.getItem("ruolo")==="cliente")
    {
        return(
            <div className="navbarStyle">
                <link href="css/hover.css" rel="stylesheet" media="all"/>
                    <Nav.Link className="elementoLogo" href="/">
                        <Image src={logo}
                               width="100"/>
                    </Nav.Link>

                <Nav>

                    <NavItem className="hvr-float-shadow nav-item-NavBarAttore justify-content-center d-flex">
                        <Nav className="elementoNavBarAttore" href="/">
                            <Image className="imageNavBarAttore" src={TesserinoIcon} width="52"/>
                            <NavDropdown className="testoDropDown" title="Tesserino" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/gestioneTesserino/richiestaTesserino">Richiedi tesserino digitale</NavDropdown.Item>
                                <NavDropdown.Item href="/gestioneTesserino/rinnovoTesserino">Rinnova tesserino</NavDropdown.Item>
                                <NavDropdown.Item href="/gestioneTesserino/ricaricaTesserino">Ricarica tesserino</NavDropdown.Item>
                                <NavDropdown.Item href="/gestioneTesserino/visualizzaSaldo">Saldo tesserino</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </NavItem>

                    <NavItem className="hvr-float-shadow nav-item-NavBarAttore justify-content-center d-flex">
                        <Nav className="elementoNavBarAttore">
                            <Image className="imageNavBarAttore" src={OrdinaIcon} width="50"/>
                                <NavDropdown className="testoDropDown" title="Ordinazione" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href="/gestioneOrdinePasto/sceltaPasti">Componi l'ordine</NavDropdown.Item>
                                    <NavDropdown.Item href="/gestioneOrdinePasto/listaOrdini">Ordini precedenti</NavDropdown.Item>
                                </NavDropdown>
                        </Nav>

                    </NavItem>

                    <NavItem className="hvr-float-shadow nav-item-NavBarAttore justify-content-center d-flex">
                        <Nav className="elementoNavBarAttore mt-1" href="/">
                            <Image className="imageNavBarAttore" src={MenuIcon} width="45"/>
                            <NavDropdown className="testoDropDown" title="Menù" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/gestioneMenu/VisualizzazioneMenu">Menù giornaliero</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </NavItem>

                    <NavItem className="hvr-float-shadow nav-item-NavBarAttore justify-content-center d-flex">
                        <Nav className="elementoNavBarAttore mt-1">
                            <Image className="imageNavBarAttore" src={TicketIcon} width="45"/>
                            <NavDropdown className="testoDropDown" title="Ticket" >
                                <NavDropdown.Item href="/gestioneTicket/compilazioneTicket">Compila ticket</NavDropdown.Item>
                                <NavDropdown.Item href="/gestioneTicket/visualizzazioneTicket">Visualizza lista ticket</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </NavItem>

                    <NavItem className="hvr-float-shadow nav-item-NavBarAttore justify-content-center d-flex ">
                        <Nav className="hvr-grow elementoNavBarAttore mt-1" href="/">
                            <Image className="imageNavBarAttore" src={FaqIcon} width="45"/>
                            <NavDropdown className="testoDropDown" title="FAQ" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/gestioneFAQ/visualizzazioneFAQ">Visualizza FAQs</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </NavItem>


                </Nav>

                    <NavItem className="nav-item justify-content-end d-flex">
                        <Notifiche>
                            <VisualizzazioneNotifiche/>
                        </Notifiche>


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

    else if(localStorage.getItem("ruolo")==="personale adisu")
    {
        return(
            <div className="navbarStyle">
                <link href="css/hover.css" rel="stylesheet" media="all"/>
                <Nav.Link className="elementoLogo" href="/">
                    <Image src={logo}
                           width="100"/>
                </Nav.Link>

                <Nav>

                    <NavItem className="hvr-float-shadow nav-item-NavBarAttore justify-content-center d-flex">
                        <Nav className="hvr-grow elementoNavBarAttore" href="/">
                            <Image className="imageNavBarAttore" src={GestionePersonaleIcon} width="45"/>
                            <NavDropdown className="testoDropDown" title="Operatore mensa" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/gestionePersonale/InserimentoPersonale">Inserimento operatore</NavDropdown.Item>
                                <NavDropdown.Item href="/gestionePersonale/VisualizzazioneListaPersonale">Lista operatori</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </NavItem>
                    <NavItem className="hvr-float-shadow nav-item-NavBarAttore justify-content-center d-flex">
                        <Nav className="elementoNavBarAttore">
                            <Image className="imageNavBarAttore" src={TicketIcon} width="45"/>
                            <NavDropdown className="testoDropDown" title="Ticket">
                                <NavDropdown.Item href="/gestioneTicket/compilazioneTicket">Compila ticket</NavDropdown.Item>
                                <NavDropdown.Item href="/gestioneTicket/visualizzazioneTicket">Visualizza lista ticket</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </NavItem>
                    <NavItem className="hvr-float-shadow nav-item-NavBarAttore justify-content-center d-flex">
                        <Nav className="hvr-grow elementoNavBarAttore" href="/">
                            <Image className="imageNavBarAttore" src={FaqIcon} width="45"/>
                            <NavDropdown className="testoDropDown" title="FAQ" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/gestioneFAQ/visualizzazioneFAQ">Visualizza FAQs</NavDropdown.Item>
                                <NavDropdown.Item href="/gestioneFAQ/inserimentoFAQ">Inserisci FAQs</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </NavItem>


                </Nav>

                <NavItem className="nav-item justify-content-end d-flex">
                    <Notifiche>
                        <VisualizzazioneNotifiche/>
                    </Notifiche>
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
    else if(localStorage.getItem("ruolo")==="operatore mensa")
    {
        return(
            <div className="navbarStyle">
                <link href="css/hover.css" rel="stylesheet" media="all"/>
                <Nav.Link className="elementoLogo" href="/">
                    <Image src={logo}
                           width="100"/>
                </Nav.Link>

                <Nav>

                    <NavItem className="hvr-float-shadow nav-item-NavBarAttore justify-content-center d-flex">
                        <Nav className="elementoNavBarAttore " href="/">
                            <Image className="imageNavBarAttore" src={MenuIcon} width="45"/>
                            <NavDropdown className="testoDropDown" title="Menù" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/gestioneMenu/VisualizzazioneMenu">Menù giornaliero</NavDropdown.Item>
                                <NavDropdown.Item href="/gestioneMenu/SceltaTipologiaInserimento">Inserisci menù</NavDropdown.Item>
                                <NavDropdown.Item href="/gestioneMenu/SceltaTipologiaModifica">Modifica menù</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </NavItem>

                    <NavItem className="hvr-float-shadow nav-item-NavBarAttore justify-content-center d-flex">
                        <Nav className="elementoNavBarAttore" href="/">
                            <Image className="imageNavBarAttore" src={statisticheIcon} width="45"/>
                            <NavDropdown className="testoDropDown" title="Statistiche" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/statisticheSettimanali">Visualizza statistiche </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </NavItem>

                    <NavItem className="hvr-float-shadow nav-item-NavBarAttore justify-content-center d-flex">
                        <Nav className="elementoNavBarAttore">
                            <Image className="imageNavBarAttore" src={TicketIcon} width="45"/>
                            <NavDropdown className="testoDropDown" title="Ticket">
                                <NavDropdown.Item href="/gestioneTicket/compilazioneTicket">Compila ticket</NavDropdown.Item>
                                <NavDropdown.Item href="/gestioneTicket/visualizzazioneTicket">Visualizza lista ticket</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </NavItem>


                </Nav>

                <NavItem className="nav-item justify-content-end d-flex">
                    <Notifiche>
                        <VisualizzazioneNotifiche/>
                    </Notifiche>
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
    else if(localStorage.getItem("ruolo")==="admin")
    {
        return(
            <div className="navbarStyle">
                <link href="css/hover.css" rel="stylesheet" media="all"/>
                <Nav.Link className="elementoLogo" href="/">
                    <Image src={logo}
                           width="100"/>
                </Nav.Link>

                <Nav>

                    <NavItem className="hvr-float-shadow nav-item-NavBarAttore justify-content-center d-flex">
                        <Nav className="elementoNavBarAttore" href="/">
                            <Image className="imageNavBarAttore" src={GestionePersonaleIcon} width="45"/>
                            <NavDropdown className="testoDropDown" title="Gestione personale ADISU" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/gestionePersonale/InserimentoPersonale">Inserimento operatore</NavDropdown.Item>
                                <NavDropdown.Item href="/gestionePersonale/VisualizzazioneListaPersonale">Lista operatori</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </NavItem>

                    <NavItem className="hvr-float-shadow nav-item-NavBarAttore justify-content-center d-flex">
                        <Nav className="elementoNavBarAttore">
                            <Image className="imageNavBarAttore" src={TicketIcon} width="45"/>
                            <NavDropdown className="testoDropDown" title="Ticket">
                                <NavDropdown.Item href="/gestioneTicket/visualizzazioneTicket">Visualizza lista ticket</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </NavItem>


                </Nav>

                <NavItem className="nav-item justify-content-end d-flex">
                    <Notifiche>
                        <VisualizzazioneNotifiche/>
                    </Notifiche>

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
