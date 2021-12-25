import React from 'react'
import "../../styles/InserimentoPersonale.css"
import {Form, InputGroup} from "react-bootstrap";
export function InserimentoPersonale () {
    return (
        <div className="container-fluid px-1 py-5 mx-auto">
    <div className="row d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
            <div className="card">
                <h1 >Inserisci credenziali nuovo membro</h1>
                <form className="form-card" onSubmit="event.preventDefault()">
                    <div className="row justify-content-between text-left">
                        <div className="form-group col-sm-6 flex-column d-flex"><label
                            className="form-control-label px-3">Nome<span
                            className="text-danger"> *</span></label><input type="text" id="fname" name="fname"
                                                                             placeholder="Inserisci il nome"
                                                                             onBlur="validate(1)"></input></div>
                        <div className="form-group col-sm-6 flex-column d-flex"><label
                            className="form-control-label px-3">Cognome<span className="text-danger"> *</span></label>
                            <input type="text" id="lname" name="lname" placeholder="Inserisci il cognome"
                                   onBlur="validate(2)"></input></div>
                    </div>
                    <div className="row justify-content-between text-left">
                        <div className="form-group col-sm-6 flex-column d-flex"><label
                            className="form-control-label px-3">Città<span
                            className="text-danger"> *</span></label> <input type="text" id="" name=""
                                                                             placeholder="Inserisci la città" onBlur="validate(3)"></input></div>
                        <div className="form-group col-sm-6 flex-column d-flex"><label
                            className="form-control-label px-3">Numero di telefono<span
                            className="text-danger"> *</span></label> <input type="text" id="mob" name="mob"
                                                                             placeholder="Inserisci il numero di telefono" onBlur="validate(4)"></input></div>
                    </div>

                    <div className="row justify-content-between text-left">
                        <div className="form-group col-sm-6 flex-column d-flex"><label
                            className="form-control-label px-3">Indirizzo<span className="text-danger"> *</span></label>
                            <input type="text" id="job" name="job" placeholder="Inserisci indirizzo" onBlur="validate(5)"></input></div>

                        <div className="form-group col-sm-6 flex-column d-flex"><label
                            className="form-control-label px-3">Data di nascita<span className="text-danger"> *</span></label>
                            <input type="text" id="job" name="job" placeholder="Inserisci data di nascita" onBlur="validate(5)"></input></div>
                    </div>
                    <div className="row justify-content-between text-left">
                        <label
                            className="form-control-label px-3">Email<span className="text-danger"> *</span></label>
                        <InputGroup hasValidation>
                            <InputGroup.Text>@</InputGroup.Text>
                            <Form.Control type="text" placeholder="Inserisci un'email" required isInvalid />

                        </InputGroup>

                        <div className="form-group col-sm-6 flex-column d-flex"><label
                            className="form-control-label px-3">Password<span className="text-danger"> *</span></label>
                            <input type="text" id="job" name="job" placeholder="Inserisci una password " onBlur="validate(5)"></input></div>
                    </div>

                    <div className="row justify-content-end">
                        <div className="form-group col-sm-6">
                            <button type="submit" className="btn-block btn-primary">Inserisci</button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </div>
</div>

)
}
export default InserimentoPersonale