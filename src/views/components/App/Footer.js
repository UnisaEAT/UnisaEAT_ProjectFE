import React from 'react'
import "../../styles/AppStyle/Footer.css"
import logoUnisa from "../../assets/logo_unisa.png"
import instagramIcon from "../../assets/instagram.png"
import facebookIcon from "../../assets/facebook.png"
import twitterIcon from "../../assets/twitter.png"
import githubIcon from "../../assets/github.png"
export function Footer() {
    return (
        <footer className="bg-white">
            <div className="mx-5 py-3">
                <div className="row py-4">
                    <div className="mx-1 text-center my-5 col-lg-3 col-md-6 mb-4 mb-lg-0">
                        <img src={logoUnisa} alt="" width="120" className="mb-3"/>
                        <p className="text-center font-italic">Università degli studi di Salerno</p>
                    </div>
                    {/*TODO aggiungere links*/}
                    <div className="mx-5 col-lg-2 col-md-6 mb-4 mb-lg-0">
                        <h6 className="text-uppercase font-weight-bold mb-4">Chi siamo</h6>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2"><a href="#" className="text-grey text-white text-decoration-none">Project Managers</a></li>
                            <li><a href="#" className="text-grey text-decoration-none">Salvatore Amideo</a></li>
                            <li><a href="#" className="text-grey text-decoration-none">Alice Vidoni</a></li>
                            <li className="mb-2 mt-2"><a href="#" className="text-grey text-white text-decoration-none">Team Members</a></li>
                            <li><a href="#" className="text-grey text-decoration-none">Alessandro Cavaliere</a></li>
                            <li><a href="#" className="text-grey text-decoration-none">Alessio Salzano</a></li>
                            <li><a href="#" className="text-grey text-decoration-none">Maria Rosaria Giudice</a></li>
                            <li><a href="#" className="text-grey text-decoration-none">Gerardo Sessa</a></li>
                            <li><a href="#" className="text-grey text-decoration-none">Carmine Citro</a></li>
                            <li><a href="#" className="text-grey text-decoration-none">Nicola Cappello</a></li>
                            <li><a href="#" className="text-grey text-decoration-none">Claudio Buono</a></li>

                        </ul>
                    </div>
                    <div className="mx-5 col-lg-2 col-md-6 mb-4 mb-lg-0">
                            <h6 className="text-uppercase font-weight-bold mb-4">Contatti</h6>
                            <ul className="list-unstyled mb-0">
                            <li className="text-grey">ADISU SALERNO</li>
                            <li className="text-grey text-small">adisumensa@unisa.it</li>
                            <li className="text-grey mt-2">UnisaEAT</li>
                            <li className="text-grey text-small">unisaeat2022@unisa.it</li>
                        </ul>

                        <h6 className="text-uppercase font-weight-bold mb-2 mt-5">Modalità di pagamento</h6>
                        <ul className="list-unstyled mb-0">
                            <div>
                                <img src="https://img.icons8.com/color/36/000000/visa.png"/>
                                <img src="https://img.icons8.com/color/36/000000/mastercard.png"/>
                                <img src="https://img.icons8.com/color/36/000000/amex.png"/>
                            </div>
                        </ul>
                    </div>

                    <div className="mx-5 col-lg-2 col-md-6 mb-4 mb-lg-0">
                        <h6 className="text-uppercase font-weight-bold mb-4">Domande frequenti</h6>
                        <ul className="list-unstyled mb-0">
                            <li className="text-grey"><a href="/gestioneFAQ/visualizzazioneFAQ" className="text-grey text-decoration-none">Come visualizzare il saldo del Tesserino</a></li>
                            <li className="text-grey mt-2"><a href="/gestioneFAQ/visualizzazioneFAQ" className="text-grey text-decoration-none">Come visualizzare il menù giornaliero</a></li>
                            <li className="text-grey mt-2"><a href="/gestioneFAQ/visualizzazioneFAQ" className="text-grey text-decoration-none">Come compilare un ticket</a></li>
                            <li className="text-grey mt-2"><a href="/gestioneFAQ/visualizzazioneFAQ" className="text-grey text-decoration-none">Come prenotare un pasto</a></li>
                            <li className="text-grey mt-2"><a href="/gestioneFAQ/visualizzazioneFAQ" className="text-grey text-decoration-none">Come richiedere il tesserino</a></li>
                            <li className="text-grey mt-2"><a href="/gestioneFAQ/visualizzazioneFAQ" className="text-grey text-decoration-none">Come contattare un personale ADISU</a></li>
                            <li className="text-grey mt-2"><a href="/gestioneFAQ/visualizzazioneFAQ" className="text-grey text-decoration-none">Come contattare un admin</a></li>
                        </ul>
                    </div>

                </div>
            </div>


            {/*TODO aggiungere links*/}
            <div className="f-bg-dark py-4">
                <div className="container text-center">
                    <span className=" text-muted mb-0 py-2">
                        <img className="mx-3" src={instagramIcon} width="30px"/>
                        <img className="mx-3" src={facebookIcon} width="30px"/>
                        <img className="mx-3" src={twitterIcon} width="30px"/>
                        <a href="https://github.com/UnisaEAT"><img className="mx-3" src={githubIcon} width="30px"/></a>
                    </span>

                </div>
            </div>
        </footer>
    )
}

export default Footer