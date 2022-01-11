import React from 'react'
import "../../../App.css"
import {Card} from "react-bootstrap";
import axios from "axios";
import Popup from "./PopUp";
export default class RimozionePersonale extends React.Component{

    //Costruttore di props
    constructor(props) {
        super(props);
        this.state= {
            popUp: false
        }
        this.errorHandler = this.errorHandler.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
    }

    errorHandler(error) {
        let inputError = error.name;
        let errorMessage = error.message;

        const rootElement = document.getElementById(inputError)

        if (rootElement.childNodes.length < 3) {
            const element = document.createElement('h1')
            element.id = inputError
            element.textContent = errorMessage
            element.style = "color:red;font-size:15px"
            rootElement.appendChild(element)
        }
    }

    closePopUp() {
        this.setState({popUp: false})
        window.location.reload(false);
    }

    rimozionePersonale(email) {
        console.log(email)
        axios.post("http://localhost:8080/api/personale/remove", email =this.props.obj.email)
            .then(response => {
                if (response.data.message === true) {
                    this.setState({popUp: true})
                }else if (response.data.name != null)
                    this.errorHandler(response.data)
            })
            .catch((error) => {
                console.log("ciao")
                console.log(error);
            })
    }

    //Inseririre post per la rimozione che prende i campi di props.obj
    render() {
        return (
            <div id="root">
                {this.state.popUp && <Popup handleClose={this.closePopUp}/>}
            <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                <h1 className="h1">Informazioni di {this.props.obj.nome} {this.props.obj.cognome}</h1>
                <Card className="align" style={{width: 'auto'}}>
                    <Card.Body>
                        <Card.Title >{this.props.obj.email}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
                        <Card.Text>
                        </Card.Text>
                            <button type="submit" className="btn-block btn-primary" onClick={this.rimozionePersonale(this.props.obj.email)} >Rimuovi</button>
                        </Card.Body>
                </Card>
            </Card>
            </div>
        )
    }
}