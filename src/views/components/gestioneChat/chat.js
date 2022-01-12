import React, {useEffect, useState} from 'react';
import "../../styles/gestioneChat/chatCSS.css"
import axios from "axios";
import {Button} from "react-bootstrap";
import paperPlane from "../../assets/paperPlane.png"
import {io} from "socket.io-client"


function Chat()
{

        const[onlinePersonale,setOnlinePersonale] = useState([])
        const[conversazioneID,setConversazioneID] = useState(null)
        const[destinatarioEmail,setDestinatarioEmail] = useState(null)
        const[destinatarioRuolo,setDestinatarioRuolo] = useState(null)
        const[mittenteEmail,setMittenteEmail] = useState(localStorage.getItem("email"))
        const[mittenteRuolo,setMittenteRuolo] = useState(localStorage.getItem("ruolo"))
        const[messaggiConversazione,setMessaggiConversazione] = useState([""])
        const[messaggioDaInviare,setMessaggioDaInviare] = useState(null)


        /*this.onClickChangeDestinatario = this.onClickChangeDestinatario.bind(this)
        this.onSubmitInviaMessaggio = this.onSubmitInviaMessaggio.bind(this)
        this.onChangeMessaggioDaInviare = this.onChangeMessaggioDaInviare.bind(this)*/


    //ComponentDidMount
    useEffect(() => {
        //this.setState({socket:io("ws://localhost:8900")})

        //Recupera la lista del personale disponibile a chattare

        if(localStorage.getItem("ruolo")=="cliente") {
            axios.post('http://localhost:8080/api/personale/viewLista', {ruolo: "admin"})
                .then(response => {
                    if(response.data[0]) {
                        setOnlinePersonale(response.data)
                        setDestinatarioRuolo("personale adisu")
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else if(localStorage.getItem("ruolo")=="personale adisu")
        {

            const user = {
                email : mittenteEmail,
                ruolo : "personale adisu"
            }


            axios.post('http://localhost:8080/api/conversazione/getConversazioni', {user:user})
                .then(response => {
                    setOnlinePersonale(response.data)
                    setDestinatarioRuolo("cliente")
                })
                .catch((error) => {
                    console.log(error);
                })

        }
    },[])


    const onClickChangeDestinatario = (emailDest) =>
    {
        const user1 = {
                email: mittenteEmail,
                ruolo: mittenteRuolo
            }

        const user2 = {
                email: emailDest,
                ruolo: destinatarioRuolo
            }

        //Controllo se esiste già una conversazione avviata
        axios.post('http://localhost:8080/api/conversazione/getConversazione', {user1:user1,user2:user2})
            .then(response => {
                    //Se esiste si prende i messaggi
                    if(response.data[0])
                    {
                        setDestinatarioEmail(emailDest)
                        setConversazioneID(response.data[0].id)

                        axios.post('http://localhost:8080/api/messaggio/getMessages', {conversazioneId:response.data[0].id})
                            .then(response2 => {
                                setMessaggiConversazione(response2.data)
                            })
                            .catch((error) => {
                                console.log(error);
                            })

                    }
                    // Se non esiste la crea
                    else
                    {
                        setDestinatarioEmail(emailDest)
                        const sender = {
                            email : mittenteEmail,
                            ruolo : mittenteRuolo
                        }

                        const receiver = {
                            email : emailDest,
                            ruolo : destinatarioRuolo
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

    const onChangeMessaggioDaInviare = (e) =>
    {
        console.log("test1")
        let messaggio = e.target.value
        setMessaggioDaInviare(messaggio)
    }

    const onSubmitInviaMessaggio = () =>
    {
        console.log("test2")
        if(messaggioDaInviare.length==0)
            return

        const messaggio = {
            conversazioneId : conversazioneID,
            sender: mittenteEmail,
            testo: messaggioDaInviare,
            dataInvio: new Date()
        }

        axios.post('http://localhost:8080/api/messaggio/create', messaggio)
            .then(response => {
                axios.post('http://localhost:8080/api/messaggio/getMessages', {conversazioneId:conversazioneID})
                    .then(response => {
                        setMessaggiConversazione(response.data)
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch((error) => {
                console.log(error);
            })

        document.getElementById("inputTextMessaggio").value=""
        setMessaggioDaInviare(null)


    }

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
                                               onlinePersonale.map((personale,i) => {

                                                   if(mittenteRuolo=="personale adisu")
                                                   {
                                                       return(
                                                           <a className="list-group-item list-group-item-action text-black rounded-0" onClick={() => onClickChangeDestinatario(personale.membri[0].email)}>
                                                               {personale.membri[0].email}
                                                           </a>
                                                       )
                                                   }
                                                   else
                                                        return(
                                                        <a className="list-group-item list-group-item-action text-black rounded-0" onClick={() => onClickChangeDestinatario(personale.email)}>
                                                            {personale.nome}
                                                        </a>
                                                        )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                            <div className="col-7 px-0">
                                <div id="testBox"  className="px-4 py-5 chat-box bg-white">
                                    {
                                        messaggiConversazione.map((messaggio,i) => {

                                            if(messaggio=="")
                                            {
                                                return(
                                                    <h1>Seleziona chat</h1>
                                                )

                                            }
                                            else if(messaggio.sender==mittenteEmail) {
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

                                            else if(messaggio.sender==destinatarioEmail) {
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
                                        <input type="text" id="inputTextMessaggio" onChange={onChangeMessaggioDaInviare} placeholder="Type a message" aria-describedby="button-addon2"
                                               className="form-control rounded-0 border-0 py-2-2 bg-light"/>
                                            <div className="input-group-append">
                                                <i className="fa fa-paper-plane-o"></i>
                                                <button className="c-buttonSendMessage" id="button" type="submit" onClick={onSubmitInviaMessaggio}>
                                                    <img src={paperPlane} />
                                                </button>
                                            </div>
                                    </div>
                                </form>

                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )


}

export default Chat