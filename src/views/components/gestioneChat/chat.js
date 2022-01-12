import React, { useState } from 'react';
import "../../styles/gestioneChat/chatCSS.css"
import axios from "axios";
import {Button} from "react-bootstrap";
import paperPlane from "../../assets/paperPlane.png"
import {io} from "socket.io-client"


export default class Chat extends React.Component
{

    constructor(props) {
        super(props);

        this.state={
            socket:null,

            onlinePersonale : [],

            conversazioneID : null,
            destinatarioEmail : null,
            destinatarioRuolo: null,
            mittenteEmail : localStorage.getItem("email"),
            mittenteRuolo : localStorage.getItem("ruolo"),
            messaggiConversazione : [""],
            messaggioDaInviare : null

        }

        this.onClickChangeDestinatario = this.onClickChangeDestinatario.bind(this)
        this.onSubmitInviaMessaggio = this.onSubmitInviaMessaggio.bind(this)
        this.onChangeMessaggioDaInviare = this.onChangeMessaggioDaInviare.bind(this)

    }


    componentDidMount() {

        this.setState({socket:io("ws://localhost:8900")})

        //Recupera la lista del personale disponibile a chattare

        if(localStorage.getItem("ruolo")=="cliente") {
            axios.post('http://localhost:8080/api/personale/viewLista', {ruolo: "admin"})
                .then(response => {
                    if (response.data[0]) {
                        this.setState({onlinePersonale: response.data})
                        this.setState({destinatarioRuolo: "personale adisu"})
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else if(localStorage.getItem("ruolo")=="personale adisu")
        {

            const user = {
                email : this.state.mittenteEmail,
                ruolo : "personale adisu"
            }


            axios.post('http://localhost:8080/api/conversazione/getConversazioni', {user:user})
                .then(response => {
                    console.log("qui"+response.data.membri)
                    this.setState({onlinePersonale:response.data})
                    this.setState({destinatarioRuolo: "cliente"})
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    onClickChangeDestinatario(emailDest)
    {
        const user1 = {
                email: this.state.mittenteEmail,
                ruolo: this.state.mittenteRuolo
            }

        const user2 = {
                email: emailDest,
                ruolo: this.state.destinatarioRuolo
            }

        //Controllo se esiste già una conversazione avviata
        axios.post('http://localhost:8080/api/conversazione/getConversazione', {user1:user1,user2:user2})
            .then(response => {
            console.log("qui"+response.data)
                    //Se esiste si prende i messaggi
                    if(response.data[0])
                    {
                        console.log("esiste")
                        this.setState({destinatarioEmail:emailDest})
                        this.setState({conversazioneID:response.data[0].id})

                        axios.post('http://localhost:8080/api/messaggio/getMessages', {conversazioneId:response.data[0].id})
                            .then(response2 => {
                                this.setState({messaggiConversazione:response2.data})
                            })
                            .catch((error) => {
                                console.log(error);
                            })

                    }
                    // Se non esiste la crea
                    else
                    {
                        this.setState({destinatarioEmail:emailDest})
                        console.log("non esiste")
                        const sender = {
                            email : this.state.mittenteEmail,
                            ruolo : this.state.mittenteRuolo
                        }

                        const receiver = {
                            email : this.state.destinatarioEmail,
                            ruolo : this.state.destinatarioRuolo
                        }
                        axios.post('http://localhost:8080/api/conversazione/create', {sender:sender,receiver:receiver})
                            .then(response2 => {

                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    }

            })
            .catch((error) => {
                console.log(error);
            })
        var objDiv = document.getElementById("testBox");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    onChangeMessaggioDaInviare(e)
    {
        let messaggio = e.target.value
        this.setState({messaggioDaInviare : messaggio})
    }

    onSubmitInviaMessaggio()
    {

        if(this.state.messaggioDaInviare.length==0)
            return

        const messaggio = {
            conversazioneId : this.state.conversazioneID,
            sender: this.state.mittenteEmail,
            testo: this.state.messaggioDaInviare,
            dataInvio: new Date()
        }

        axios.post('http://localhost:8080/api/messaggio/create', messaggio)
            .then(response => {
                axios.post('http://localhost:8080/api/messaggio/getMessages', {conversazioneId:this.state.conversazioneID})
                    .then(response => {
                        this.setState({messaggiConversazione:response.data})
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })

        document.getElementById("inputTextMessaggio").value=""
        this.setState({messaggioDaInviare:null})


    }


    render() {
        console.log(this.state.onlinePersonale)

        return(
            <div className="c-chatContainer">
                <div className="c-chat">
                    <a href="https://bootstrapious.com" className="text-white"/>
                    <div className="container py-2 px-4">

                        <div className="row rounded-lg overflow-hidden shadow">

                            <div className="col-5 px-0">
                                <div className="bg-white">

                                    <div className="bg-gray px-4 py-2 bg-light">
                                        <p className="h5 mb-0 py-1">Disponibili</p>
                                    </div>

                                    <div className="messages-box">
                                        <div className="list-group rounded-0">
                                            {
                                               this.state.onlinePersonale.map((personale,i) => {


                                                   if(this.state.mittenteRuolo=="personale adisu")
                                                   {
                                                       return(
                                                           <a className="list-group-item list-group-item-action text-black rounded-0" onClick={() => this.onClickChangeDestinatario(personale.membri[0].email)}>
                                                               {personale.membri[0].email}
                                                           </a>
                                                       )
                                                   }
                                                   else
                                                    return(
                                                    <a className="list-group-item list-group-item-action text-black rounded-0" onClick={() => this.onClickChangeDestinatario(personale.email)}>
                                                        {personale.nome}
                                                    </a>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-7 px-0">
                                <div id="testBox"  className="px-4 py-5 chat-box bg-white">
                                    {
                                        this.state.messaggiConversazione.map((messaggio,i) => {



                                            if(messaggio=="")
                                            {
                                                return(
                                                    <h1>Seleziona chat</h1>
                                                )

                                            }
                                            else if(messaggio.sender==this.state.mittenteEmail) {
                                                return (
                                                    <div key={i} className="media-body ml-3 rightText">
                                                        <div className="bg-primary rounded py-2 px-3 mb-2">
                                                            <p className="text-small mb-0 text-white">
                                                                {messaggio.testo}
                                                            </p>
                                                        </div>
                                                        <p className="small text-muted">{messaggio.dataInvio}</p>
                                                    </div>
                                                )
                                            }

                                            else if(messaggio.sender==this.state.destinatarioEmail) {
                                                return (

                                                    <div key={i} className="media w-50 ml-auto mb-3">
                                                        <div className="media-body">
                                                            <div className="bg-light rounded py-2 px-3 mb-2">
                                                                <p className="text-small mb-0 text-black">
                                                                    {messaggio.testo}
                                                                </p>
                                                            </div>
                                                            <p className="small text-muted">{messaggio.dataInvio}</p>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>


                                <form action="#" className="bg-light">
                                    <div className="input-group">
                                        <input type="text" id="inputTextMessaggio" onChange={this.onChangeMessaggioDaInviare} placeholder="Type a message" aria-describedby="button-addon2"
                                               className="form-control rounded-0 border-0 py-2-2 bg-light"/>
                                            <div className="input-group-append">
                                                <i className="fa fa-paper-plane-o"></i>
                                                <button className="c-buttonSendMessage" id="button" type="submit" onClick={this.onSubmitInviaMessaggio}>
                                                    <img src={paperPlane} />
                                                </button>
                                            </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}
