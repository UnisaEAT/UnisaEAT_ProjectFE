import React, {Component} from 'react'

import axios from 'axios';
import QRCode from "qrcode.react" //--> https://openbase.com/js/qrcode.react : link libreria


export default class VisualizzaOrdine extends React.Component
{
    constructor(props) {
        super(props);
    }

    componentDidMount()
    {
    }


    render() {
        return (
            <div>
                <QRCode value="idDelPasto" size="200"/>
            </div>
        );
    }
}