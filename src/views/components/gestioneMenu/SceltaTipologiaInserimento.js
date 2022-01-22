import * as React from 'react';
import {Button, Form} from "react-bootstrap"
import "../../styles/gestioneMenu/SceltaTipologia.css"
import {Redirect} from "react-router-dom";
import redirect from "react-router-dom/es/Redirect";
export default class SceltaTipologiaInserimento extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'pranzo',
            error: false,
            redirect:false
        }
    }

    componentDidMount() {
        if(!localStorage.getItem("email"))
            this.setState({error:400})
        else if(localStorage.getItem("ruolo")!="operatore mensa")
            this.setState({error:401})
    }

    render() {
        if(this.state.error===400)
            return <h1 className="erroreGenericoDiAccesso">Effettua il login per accedere a questa pagina</h1>
        if(this.state.error===401)
            return <h1 className="erroreGenericoDiAccesso">Accesso negato</h1>
        if(this.state.redirect){
            return(
                <Redirect to={{ pathname:'/gestioneMenu/InserimentoMenu',state:{value:this.state.value}}}/>
            )
        }
        return (
            <div id="root" className="rootContainer">
                <h1 className="h1Style">Scegli la tipologia del Menu da inserire</h1>
                <div className="tipologiaContainer mt-4">
                <Form>
                    <Form.Select size="lg" onChange={e => this.setState({ value: e.target.value })} type="text">
                    <option value="pranzo">Pranzo</option>
                    <option value="cena">Cena</option>
                </Form.Select>
                <Button  className="buttonStyleTip mt-4" variant="outline-primary" type="submit"
                         onClick={() => this.setState({redirect: true})}>
                    Invia
                </Button>
                </Form>
                </div>
            </div>
        );
    }
}