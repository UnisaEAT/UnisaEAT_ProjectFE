import * as React from 'react';
import {Button, Form} from "react-bootstrap"
import "../../styles/gestioneMenu/SceltaTipologia.css"
import {Redirect} from "react-router-dom";
import redirect from "react-router-dom/es/Redirect";
export default class SceltaTipologiaModifica extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 'Pranzo',
            redirect:false
        }
    }


    render() {
        if(this.state.redirect){
            return(
                <Redirect to={{ pathname:'/gestioneMenu/ModificaMenu',state:{value:this.state.value}}}/>
            )
        }
        return (
            <div id="root">
                <h1 className="h1Style">Scegli la tipologia del Menu da modificare</h1>
                <Form>
                    <Form.Select size="lg" onChange={e => this.setState({ value: e.target.value })} type="text">
                        <option value="Pranzo">Pranzo</option>
                        <option value="Cena">Cena</option>
                    </Form.Select>
                    <Button  className="buttonStyleTip" variant="outline-primary" type="submit"
                             onClick={() => this.setState({redirect: true})}>
                        Inoltra
                    </Button>
                </Form>
            </div>
        );
    }
}