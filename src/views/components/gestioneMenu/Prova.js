import * as React from 'react';
import {Form} from "react-bootstrap"
import SendIcon from "@mui/icons-material/Send";
import {Button} from "@mui/material";
import VisualizzazioneMenu from "./VisualizzazioneMenu";

export default class Prova extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    render() {
        return (
            <div id="root">
                <h1>Scegli la tipologia del Menu</h1>
                <Form.Select size="lg" onChange={e => this.setState({ value: e.target.value })} type="text">
                    <option value="Pranzo">Pranzo</option>
                    <option value="Cena">Cena</option>
                </Form.Select>
                <Button className="buttonInsert" variant="contained" endIcon={<SendIcon/>}
                        onClick={() => <VisualizzazioneMenu valore={this.state.value}/>}>
                    Inoltra
                </Button>
            </div>
        );
    }
}