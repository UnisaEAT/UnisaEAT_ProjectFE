import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./App";
import NavbarApp from "./views/components/App/NavbarApp";
import Footer from "./views/components/App/Footer";


ReactDOM.render(
    <BrowserRouter>
        <NavbarApp/>
        <App/>

    </BrowserRouter>,
    document.getElementById("root")
);
