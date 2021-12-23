import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./App";
import viewService from "./servises/view.service";
import NavbarApp from "./views/Navbar";
import Footer from "./views/Footer";

ReactDOM.render(
    <BrowserRouter>
        <NavbarApp/>
        <App />
        <Footer/>
    </BrowserRouter>,
    document.getElementById("root")
);
viewService.unregister();