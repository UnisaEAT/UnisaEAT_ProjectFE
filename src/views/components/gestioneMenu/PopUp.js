import React from "react";
import '../../styles/gestioneMenu/PopUp.css'
import CheckLogo from '../../assets/check.png'
import {Button} from "react-bootstrap";

const Popup = props => {
    return (
        <div className="popup-box">
            <div className="box">
                <div className="upperInnerBox">
                    <img alt="success" className="checkLogo" src={CheckLogo}/>
                </div>
                <div className="bottomInnerBox">
                    <div className="bottomLabel">
                        <h3>Successo!</h3>
                        <Button className="closeButton" onClick={props.handleClose}>Chiudi</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;