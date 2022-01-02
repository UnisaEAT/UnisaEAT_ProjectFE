import React from "react";
import './views/icss/successPopUpCSS.css';
import {Button} from "react-bootstrap";
const Popup = props => {
    return (
        <div className="popup-box">
            <div className="box">
                <div className="upperInnerBox">
                   
                </div>
                <div className="bottomInnerBox">
                    <div className="bottomLabel">
                        <h3>Successo!</h3>
                        <p>Login Avvenuto</p>
                        <Button className="closeButton"  onClick={props.handleClose}>Chiudi</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;