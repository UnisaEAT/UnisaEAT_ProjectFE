import React, {Component} from "react";
import '../../styles/gestioneTesserino/successPopUpCSS.css'
import Error from '../../assets/error.png'
import {Button} from "react-bootstrap";

export default class Popup extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="popup-box">
                <div className="box">
                    <div className="upperInnerBox">
                        <img alt="success" className="checkLogo" src={Error}/>
                    </div>
                    <div className="bottomInnerBox">
                        <div className="bottomLabel">
                            <h3>Errore!</h3>
                            <p>{this.props.message}</p>
                            <Button className="closeButton" onClick={this.props.handleClose}>Chiudi</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
