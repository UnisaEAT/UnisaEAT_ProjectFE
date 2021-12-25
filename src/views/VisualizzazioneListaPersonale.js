import React from 'react'
import "../App.css"
import {ListGroup, Badge, Image, Button} from "react-bootstrap";
import InfoPersonale from "./InfoPersonale";
function myOnClickFunction() {
    document.location.href = "/InfoPersonale.js"
}
export function VisualizzazioneListaPersonale () {
    return (
        <div className="container-fluid px-1 py-5 mx-auto">
            <div className="row d-flex justify-content-center">
                <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
                    <div className="card">
                        <h1 className="h1">Lista Operatori</h1>
                <ListGroup as="ul">
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start itemStyle"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Personale 1</div>
                            <p className="primary">Email</p>
                        </div>
                        <Button className="buttonStyle" variant="light" pill >
                            <Image src="https://image.flaticon.com/icons/png/512/61/61403.png"
                                   width="35"/>
                        </Button>
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold" >Personale 2</div>
                            <p className="primary">Email</p>
                        </div>
                        <Button className="buttonStyle" variant="light" pill >
                            <Image src="https://image.flaticon.com/icons/png/512/61/61403.png"
                                   width="35"/>
                        </Button>
                    </ListGroup.Item>
                    <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Personale 3</div>
                            <p className="primary">Email</p>
                        </div>
                        <Button className="buttonStyle" variant="light"  >
                            <Image src="https://image.flaticon.com/icons/png/512/61/61403.png"
                                   width="35"/>
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default VisualizzazioneListaPersonale