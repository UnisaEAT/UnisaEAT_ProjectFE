import React, {Component} from "react";
import {Form,Button,Col,Row} from "react-bootstrap";
import axios from "axios";
import './componentsCss/rinnovoTesserinoCSS.css'


export default class RinnovoTesserino extends Component
{

    constructor(props)
    {
        super(props);

        this.state = {
            message: '',
            error: false,
            nome: '',
            cognome: '',
            dataDiNascita: '',
            comuneDiNascita: '',
            cittadinanza: '',
            indirizzo: '',
            provincia: '',
            comune: '',
            cap: '',
            telefono: '',
            email: '',
            confermaEmail: ''
        }

        // Handlers binding
        this.onChangeNome = this.onChangeNome.bind(this);
        this.onChangeCognome = this.onChangeCognome.bind(this)
        this.onChangeDataDiNascita = this.onChangeDataDiNascita.bind(this)
        this.onChangeComuneDiNascita = this.onChangeComuneDiNascita.bind(this)
        this.onChangeProvinciaDiNascita = this.onChangeProvinciaDiNascita.bind(this)
        this.onChangeCittadinanza = this.onChangeCittadinanza.bind(this)
        this.onChangeIndirizzo = this.onChangeIndirizzo.bind(this)
        this.onChangeProvincia = this.onChangeProvincia.bind(this)
        this.onChangeComune = this.onChangeComune.bind(this)
        this.onChangeCap = this.onChangeCap.bind(this)
        this.onChangeTelefono = this.onChangeTelefono.bind(this)
        this.onChangeEmail = this.onChangeEmail.bind(this)
        this.onChangeConfermaEmail = this.onChangeConfermaEmail.bind(this)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    componentDidMount()
    {
        axios.get('http://localhost:3000/api/tesserino/isExpired')
            .then(response => {
                console.log(response.data)
                // Se il tesserino è scaduto
                if(response.data.message===false)
                {
                    this.setState({error: true})
                    this.setState({message: "rinnovato"})
                }
                // Se il tesserino è scaduto ed è posseduto dall'utente
                else if(response.data.message===true)
                {
                    this.setState({error: false})
                }
                // Se l'utente non possiede il tesserino
                else
                {
                    this.setState({error: true})
                    this.setState({message: "non posseduto"})
                }

            })
            .catch((error) => {
                console.log(error);
            })
    }


    // Handlers definition
    errorHandler(error)
    {
        let inputError = error.name;
        let errorMessage = error.message;

        console.log(inputError)
        const rootElement = document.getElementById(inputError)

        if(rootElement.childNodes.length<3)
        {
            const element = document.createElement('h1')
            element.id = inputError
            element.textContent = errorMessage
            element.style = "color:red;font-size:15px"
            rootElement.appendChild(element)
        }
    }

    errorRemoverOnChange(e)
    {
        let parent = document.getElementById(e.target.id);
        if(parent.childNodes.length>2)
            parent.removeChild(parent.lastElementChild)
    }

    onChangeNome(e)
    {
        this.errorRemoverOnChange(e)
        this.setState({
            nome: e.target.value
        })
    }

    onChangeCognome(e)
    {
        this.errorRemoverOnChange(e)
        this.setState({
            cognome: e.target.value
        })
    }

    onChangeDataDiNascita(e)
    {
        this.errorRemoverOnChange(e)
        this.setState({
            dataDiNascita: e.target.value
        })
    }

    onChangeComuneDiNascita(e)
    {
        this.errorRemoverOnChange(e)
        this.setState({
            comuneDiNascita: e.target.value
        })
    }

    onChangeProvinciaDiNascita(e)
    {
        this.errorRemoverOnChange(e)
        this.setState({
            provinciaDiNascita: e.target.value
        })
    }

    onChangeCittadinanza(e)
    {
        this.errorRemoverOnChange(e)
        this.setState({
            cittadinanza: e.target.value
        })
    }

    onChangeIndirizzo(e)
    {
        this.errorRemoverOnChange(e)
        this.setState({
            indirizzo: e.target.value
        })
    }

    onChangeProvincia(e)
    {
        this.errorRemoverOnChange(e)
        this.setState({
            provincia: e.target.value
        })
    }

    onChangeComune(e)
    {
        this.errorRemoverOnChange(e)
        this.setState({
            comune: e.target.value
        })
    }

    onChangeCap(e)
    {
        this.errorRemoverOnChange(e)
        this.setState({
            cap: e.target.value
        })
    }

    onChangeTelefono(e)
    {
        this.errorRemoverOnChange(e)
        this.setState({
            telefono: e.target.value
        })
    }

    onChangeEmail(e)
    {
        this.errorRemoverOnChange(e)
        this.setState({
            email: e.target.value
        })
    }

    onChangeConfermaEmail(e)
    {
        this.errorRemoverOnChange(e)
        this.setState({
            confermaEmail: e.target.value
        })
    }

    handleSubmit(e)
    {
        e.preventDefault()

        // Oggetto da passare con il POST al controller per la lettura dei campi del form
        const tesserino = {
            nome: this.state.nome,
            cognome: this.state.cognome,
            dataDiNascita: this.state.dataDiNascita,
            comuneDiNascita: this.state.comuneDiNascita,
            provinciaDiNascita: this.state.provinciaDiNascita,
            cittadinanza: this.state.cittadinanza,
            indirizzo: this.state.indirizzo,
            provincia: this.state.provincia,
            comune: this.state.comune,
            cap: this.state.cap,
            telefono: this.state.telefono,
            email: this.state.email,
            confermaEmail: this.state.confermaEmail,
        }

        this.submitForm(tesserino)
    }

    submitForm(tesserino)
    {

        axios.post('http://localhost:3000/api/tesserino/rinnovoTesserino', tesserino)
            .then(response => {
                console.log(response.data)

                // Se il rinnovo è andato a buon fine
                if(response.data==true)
                    window.location.reload(false);

                this.setState({ message: response.data.message })
                this.errorHandler(response.data)
            })
            .catch((error) => {
                console.log(error);
            })

    }



    render() {
        if(this.state.error)
        {
            if(this.state.message==="non posseduto")
                return (
                    <div className="tesserinoPosseduto">
                        <h2>Non possiedi un tesserino</h2>
                    </div>
                    )
            else if(this.state.message==="rinnovato")
                return (
                    <div className="tesserinoPosseduto">
                        <h2>Hai già un tesserino rinnovato</h2>
                    </div>
                )
        }
        return (
            <div className="formContainer container">
                <Form onSubmit={this.handleSubmit}>
                    <h3>Dati anagrafici</h3>
                    <Row className="mb-3">
                        <Form.Group id="nome" as={Col}>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" id="nome" name="nome" onChange={this.onChangeNome} placeholder="Inserisci il tuo nome"/>
                        </Form.Group>

                        <Form.Group id="cognome" as={Col}>
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control type="text" id="cognome" name="cognome" onChange={this.onChangeCognome} placeholder="Inserisci il tuo cognome"/>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group id="dataDiNascita" as={Col}>
                            <Form.Label>Data di nascita</Form.Label>
                            <Form.Control type="text" id="dataDiNascita" name="dataDiNascita" onChange={this.onChangeDataDiNascita} placeholder="Inserisci il tuo nome"/>
                        </Form.Group>

                        <Form.Group id="comuneDiNascita" as={Col}>
                            <Form.Label>Comune di nascita</Form.Label>
                            <Form.Control type="text" id="comuneDiNascita" name="comuneDiNascita" onChange={this.onChangeComuneDiNascita}/>
                        </Form.Group>

                        <Form.Group id="provinciaDiNascita" as={Col}>
                            <Form.Label>Provincia di nascita</Form.Label>
                            <Form.Control type="text" id="provinciaDiNascita" name="provinciaDiNascita" onChange={this.onChangeProvinciaDiNascita}/>
                        </Form.Group>

                        <Form.Group id="cittadinanza" as={Col}>
                            <Form.Label>Cittadinanza</Form.Label>
                            <Form.Control type="text" id="cittadinanza" name="cittadinanza" onChange={this.onChangeCittadinanza}/>
                        </Form.Group>

                    </Row>
                    <br/>
                    <h3>Residenza</h3>
                    <Row className="mb-3">
                        <Form.Group id="indirizzo" as={Col}>
                            <Form.Label>Indirizzo</Form.Label>
                            <Form.Control type="text" id="indirizzo" name="indirizzo" onChange={this.onChangeIndirizzo} placeholder="Inserisci il tuo indirizzo"/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group id="provincia" as={Col}>
                            <Form.Label>Provincia</Form.Label>
                            <Form.Control type="text" id="provincia" name="provincia" onChange={this.onChangeProvincia}/>
                        </Form.Group>

                        <Form.Group id="comune" as={Col}>
                            <Form.Label>Comune</Form.Label>
                            <Form.Control type="text" id="comune" name="comune" onChange={this.onChangeComune}/>
                        </Form.Group>

                        <Form.Group id="cap" as={Col}>
                            <Form.Label>CAP</Form.Label>
                            <Form.Control type="number" id="cap" name="cap" onChange={this.onChangeCap}/>
                        </Form.Group>
                    </Row>
                    <br/>
                    <h3>Recapiti</h3>
                    <Row className="mb-3">
                        <Form.Group id="telefono" as={Col}>
                            <Form.Label>Cellulare</Form.Label>
                            <Form.Control type="number" id="telefono" name="telefono" onChange={this.onChangeTelefono} placeholder="Inserisci il tuo numero di cellulare" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group id="email" as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" id="email" name="email" onChange={this.onChangeEmail} placeholder="Inserisci la tua email"/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group id="confermaEmail" as={Col}>
                            <Form.Label>Conferma email</Form.Label>
                            <Form.Control type="text" id="confermaEmail" name="confermaEmail" onChange={this.onChangeConfermaEmail} placeholder="Reinserisci la tua email"/>
                        </Form.Group>
                    </Row>

                    <Button className="submitButton" variant="primary" type="submit">
                        Rinnova tesserino
                    </Button>
                </Form>
            </div>
        )
    }
}
