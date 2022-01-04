import React from 'react'
import {Card} from "react-bootstrap";

export function VisualizzazioneMenu() {
    return (
        <Card className=" mx-auto col-xl-7 justify-content-center text-center">
            <h1 className="h1">Menu del giorno</h1>
            <Card className=" mx-auto col-xl-7 justify-content-center text-center">
                <h1>Primi piatti</h1>
                <p>Pasta e fagioli</p>
            </Card>
        </Card>


    )
}
export default VisualizzazioneMenu