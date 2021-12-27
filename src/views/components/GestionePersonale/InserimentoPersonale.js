import React from 'react'
import "../../styles/InserimentoPersonale.css"
import {Form, Card, InputGroup} from "react-bootstrap";

export function InserimentoPersonale() {
    return (
        <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                        <h1>Inserisci credenziali nuovo membro</h1>
                        <form className="form-card test" onSubmit="event.preventDefault()" action="http://localhost:3000/api/personale/insert" method="POST">
                            <div className="row justify-content-between text-left">
                                <div className="form-group col-sm-6 flex-column d-flex"><label
                                    className="form-control-label px-3">Nome<span
                                    className="text-danger"> *</span></label>
                                    <input type="text" name="nome" placeholder="Inserisci il nome"></input></div>
                                <div className="form-group col-sm-6 flex-column d-flex"><label
                                    className="form-control-label px-3">Cognome<span
                                    className="text-danger"> *</span></label>
                                    <input type="text" name="cognome" placeholder="Inserisci il cognome"></input></div>
                            </div>
                            <div className="row justify-content-between text-left">
                                <div className="row justify-content-between text-left">
                                    <div className="form-group col-sm-6 flex-column d-flex"><label
                                        className="form-control-label px-3">Indirizzo<span
                                        className="text-danger"> *</span></label>
                                        <input type="text" name="indirizzo" placeholder="Inserisci indirizzo"></input>
                                    </div>
                                    <div className="form-group col-sm-6 flex-column d-flex"><label
                                        className="form-control-label px-3">Numero di telefono<span
                                        className="text-danger"> *</span></label> <input type="text"
                                                                                         name="numeroTelefono"
                                                                                         placeholder="Inserisci il numero di telefono"></input>
                                    </div>
                                </div>
                                <div className="form-group col-sm-6 flex-column d-flex"><label
                                    className="form-control-label px-3">Data di nascita<span
                                    className="text-danger"> *</span></label>
                                    <input type="text" name="dataDiNascita"
                                           placeholder="Inserisci data di nascita"></input></div>
                            </div>
                            <div className="row justify-content-between text-left">
                                <label
                                    className="form-control-label px-3">Email<span
                                    className="text-danger"> *</span></label>
                                <InputGroup hasValidation>
                                    <InputGroup.Text>@</InputGroup.Text>
                                    <Form.Control type="text" name="email" placeholder="Inserisci un'email" required
                                                  isInvalid/>

                                </InputGroup>

                                <div className="form-group col-sm-6 flex-column d-flex"><label
                                    className="form-control-label px-3">Password<span className="text-danger"> *</span></label>
                                    <input type="password" name="password"
                                           placeholder="Inserisci una password "></input></div>

                                <div className="form-group col-sm-6 flex-column d-flex"><label
                                    className="form-control-label px-3">Conferma Password<span
                                    className="text-danger"> *</span></label>
                                    <input type="password" name="confermapassword"
                                           placeholder="Conferma la Password "></input></div>
                            </div>

                            <div className="row justify-content-end">
                                <div className="form-group col-sm-6">
                                    <button type="submit" className="btn-block btn-primary">Inserisci</button>
                                </div>
                            </div>
                        </form>
        </Card>

    )
}

export default InserimentoPersonale