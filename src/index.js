import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./App";
import NavbarApp from "./views/components/App/NavbarApp";
import Footer from "./views/components/App/Footer";
import Chat from "./views/components/gestioneChat/chat";


//Controllo per la visualizzazione della chat
if(localStorage.getItem("email") && (localStorage.getItem("ruolo")=="cliente") || (localStorage.getItem("ruolo")=="personale adisu"))
{
    ReactDOM.render(
        <BrowserRouter>
            <NavbarApp/>
            <App/>
            <Chat/>
            <Footer/>
        </BrowserRouter>,
        document.getElementById("root")
    );
}
else {
    ReactDOM.render(
        <BrowserRouter>
            <NavbarApp/>
            <App/>
            <Footer/>
        </BrowserRouter>,
        document.getElementById("root")
    );
}
