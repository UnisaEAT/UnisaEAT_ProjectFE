import React from 'react'
import {Form,Button,Col,Row,Card} from "react-bootstrap";
import axios from "axios";
import Popup from "../App/successPopUp";
import moment from 'moment'

export default class RisoluzioneTicket extends React.Component {

     //Costruttore di props
     constructor(props) {
        super(props);
        this.state= {
            soluzione:'',
            popUp: false
        }
        this.errorHandler = this.errorHandler.bind(this)
        this.closePopUp = this.closePopUp.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChangeSoluzione = this.onChangeSoluzione.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    closePopUp() {
        this.setState({popUp: false})
        window.location.reload();
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

    errorRemoverOnChange(e) {
        let parent = document.getElementById(e.target.id);
        if (parent.childNodes.length > 2)
            parent.removeChild(parent.lastElementChild)
    }

    
    // Handlers definition
    onChangeSoluzione(e) {
        this.errorRemoverOnChange(e)
        this.setState({
            soluzione: e.target.value
        })
    }


    handleSubmit(e) {
        e.preventDefault()

        // Oggetto da passare con il POST al controller per la lettura dei campi del form
        const Ticket = {
            titolo: this.props.obj.titolo,
            soluzione: this.state.soluzione,
        }

        this.risoluzioneTicket(Ticket)
    }

    risoluzioneTicket(Ticket) {
        console.log(Ticket)
        axios.post("http://localhost:8080/api/ticket/update", Ticket)
            .then(response => {
                console.log(response.data)
                if (response.data.message === true) {
                    this.setState({popUp: true})
                } else if (response.data.name != null)
                    this.setState({message: response.data.message})
                    this.errorHandler(response.data)
            })
            .catch((error) => {
                console.log("ciao")
                console.log(error);
            })
    }

    render() {
        console.log(this.props.obj)
        return (
            <div id="root">
                 {/* Se popUp (boolean) è true */}
                 {this.state.popUp && <Popup message="Risoluzione avvenuta con successo!" handleClose={this.closePopUp}/>}

                <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                    <h1>Risoluzione ticket</h1><br></br>
                    <h4>{this.props.obj.titolo}{this.props.obj.problema}</h4> 
                    <h5>{moment(this.props.obj.date).format('DD MMM, YYYY')}</h5> 
                    <h5>{this.props.obj.email}</h5> 
                    <Form onSubmit={this.handleSubmit}>
                            <Row className="mb-3">
                                <Form.Group id="soluzione" as={Col}>
                                    <Form.Label>Soluzione</Form.Label>
                                    <Form.Control type="text" id="soluzione" name="soluzione" onChange={this.onChangeSoluzione} placeholder="Inserisci una soluzione"/>
                                </Form.Group>
                            </Row>
                            
                            <Button type="submit" >Risolvi</Button>
                    </Form>
                </Card>
            </div>
        )
    }
}