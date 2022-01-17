import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import App from "./App";
import NavbarApp from "./views/components/App/NavbarApp";
import Footer from "./views/components/App/Footer";
import NavbarAttore from "./views/components/App/NavbarAttore";


ReactDOM.render(
    <BrowserRouter>
        <NavbarApp/>
        {/*<NavbarAttore/>*/}
        <App/>
        <Footer/>
    </BrowserRouter>,
    document.getElementById("root")
);
