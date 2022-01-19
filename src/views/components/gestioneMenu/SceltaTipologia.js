import * as React from 'react';
import {Button, Form} from "react-bootstrap"
import "../../styles/gestioneMenu/SceltaTipologia.css"
import {Redirect} from "react-router-dom";
export default class SceltaTipologia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            redirect:true
        }
    }

    Inoltro(){
        if(this.state.redirect){
            return(
                <Redirect to={{ pathname:"/gestioneMenu/VisualizzazioneMenu",state:{value:this.state.value}}}/>
            )
        }
    }

    render() {
        return (
            <div id="root">
                <h1 className="h1Style">Scegli la tipologia del Menu</h1>
                <Form>
                    <Form.Select size="lg" onChange={e => this.setState({ value: e.target.value })} type="text">
                    <option value="Pranzo">Pranzo</option>
                    <option value="Cena">Cena</option>
                </Form.Select>
                <Button  className="buttonStyleTip" variant="outline-primary" type="submit"
                         onClick={() => this.Inoltro()}>
                    Inoltra
                </Button>
                </Form>
            </div>
        );
    }
}