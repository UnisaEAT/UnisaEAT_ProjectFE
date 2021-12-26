import React,{Component} from "react";
import {Form,Button,Col,Row} from "react-bootstrap";

import '../App.css';

export default class Profilo extends Component{
    constructor(props){
        super(props);
        this.state={
            nome:props.nome,
        }
    }
    render(){
    return(
        <div className="container">
        <Col className="profilo" action="http://localhost:3000/cliente/profilo" method="GET">
            <Row>Nome</Row>{this.state.nome}
            <Row>Email</Row>
            <Button className="submitButton" variant="primary" type="submit">
                ModificaPassword
            </Button>
        </Col>
        </div>
    )
    }
}

