import React from 'react'
import "../../../App.css"
import {Card,Button,Form} from "react-bootstrap";
import axios from "axios";
import Popup from "../App/successPopUp";

export default class RimozioneFAQ extends React.Component{

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
        window.location.reload();
    }

    rimozioneFAQ() {
        console.log(this.props.obj.domanda)
        axios.post("http://localhost:8080/api/faq/deleteFAQ", {domanda: this.props.obj.domanda})
            .then(response => {
                console.log(response.data)
                if (response.data.message === true) {
                    this.setState({popUp: true})
                }else
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
                 {this.state.popUp && <Popup message="Rimozione avvenuta con successo con successo!" handleClose={this.closePopUp}/>}
            <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                
                <h1>FAQ:</h1>
                
                    <h4>{this.props.obj.domanda}</h4> 
                    <h4>{this.props.obj.risposta}</h4>
                    <br></br>
                    
                    <h3>Sicuro di voler eliminare la domanda? L'operazione non sarà annullabile</h3>
                    <br></br>
                    <Form><Button type="submit"  onClick={()=>this.rimozioneFAQ(this.props.obj.domanda)} >Rimuovi</Button></Form>
                   
                </Card>
            </div>
        )
    }
}