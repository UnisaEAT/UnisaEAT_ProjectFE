import React, {useEffect, useRef, useState} from 'react';
import "../../styles/gestioneChat/chatCSS.css"
import axios from "axios";
import {Button} from "react-bootstrap";
import paperPlane from "../../assets/paperPlane.png"
import chatButton from "../../assets/chatButton.svg"
import closeButton from "../../assets/closeButton.png"
import more from "../../assets/more.png"
import { format } from "timeago.js";
import {io} from "socket.io-client"


function Chat()
{

    const[conversazioni,setConversazioni] = useState([])
    const[conversazione,setConversazione] = useState(null)
    const[destinatarioName,setDestinatarioName] = useState(null)
    const[destinatarioEmail,setDestinatarioEmail] = useState(null)
    const[destinatarioRuolo,setDestinatarioRuolo] = useState(null)
    const[mittenteEmail,setMittenteEmail] = useState(localStorage.getItem("email"))
    const[mittenteRuolo,setMittenteRuolo] = useState(localStorage.getItem("ruolo"))
    const[messaggioDaInviare,setMessaggioDaInviare] = useState(null)
    const[chatApertaBool,setChatApertaBool] = useState(false)
    const[modificaMessaggio,setModificaMessaggio] = useState(null)
    const[messaggioDaEliminare,setMessaggioDaEliminare] = useState(null)
    const[messaggi,setMessaggi] = useState([""])
    const[messaggioInArrivo,setMessaggioInArrivo] = useState(null)


    const scrollRef = useRef()
    //Socket
    const socket = useRef()


    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage",(data) => {

            console.log("Messaggio: "+data.senderEmail+data.text)
            setMessaggioInArrivo({
                id : data.id,
                conversazioneId: data.conversazioneId,
                sender : data.senderEmail,
                testo : data.text,
                dataInvio : new Date()
            })
        })

        socket.current.on("getDeletedMessage",(data) => {
           setMessaggioDaEliminare(data)

        })
    },[])

    useEffect(()=>{
        if(messaggioDaEliminare)
            if(conversazione?.membri[0].email===messaggioDaEliminare.senderEmail || conversazione?.membri[1].email===messaggioDaEliminare.senderEmail) {
                let array = messaggi.filter(function (elem) {
                    return elem.id != messaggioDaEliminare.id
                })

                setMessaggi(array)

    }},[messaggioDaEliminare])

    useEffect(() => {
        if(messaggioInArrivo)
            if(conversazione?.membri[0].email===messaggioInArrivo.sender || conversazione?.membri[1].email===messaggioInArrivo.sender) {
                setMessaggi((prev) => [...prev, messaggioInArrivo]);
            }
    }, [messaggioInArrivo, conversazione]);

    useEffect(() => {
        socket.current.emit("addUser",{mittenteEmail,mittenteRuolo})
        socket.current.on("getUsers",users=>{
            console.log(users)
        })
    },[mittenteEmail])




    //ComponentDidMount
    useEffect(() => {

        //Recupera la lista del personale disponibile a chattare
        if(localStorage.getItem("ruolo")=="cliente") {
            axios.post('http://localhost:8080/api/personale/viewLista', {ruolo: "admin"})
                .then(response => {
                    if(response.data[0]) {
                        setConversazioni(response.data)
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
                    setConversazioni(response.data)
                    setDestinatarioRuolo("cliente")
                })
                .catch((error) => {
                    console.log(error);
                })

        }
    },[])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    },[messaggioDaInviare])

    const onClickShowChat = () =>
    {
        setChatApertaBool(true)
    }

    const onClickCloseChat = () =>
    {
        setChatApertaBool(false)
    }

    const onClickChangeDestinatario = (emailDest,nomeDest) =>
    {
        const user1 = {
            email: mittenteEmail,
            ruolo: mittenteRuolo
        }

        const user2 = {
            email: emailDest,
            ruolo: destinatarioRuolo
        }

        setDestinatarioName(nomeDest)

        //Controllo se esiste già una conversazione avviata
        axios.post('http://localhost:8080/api/conversazione/getConversazione', {user1:user1,user2:user2})
            .then(response => {
                //Se esiste si prende i messaggi
                if(response.data[0].membri)
                {
                    setDestinatarioEmail(emailDest)
                    setConversazione(response.data[0])

                    axios.post('http://localhost:8080/api/messaggio/getMessages', {conversazioneId:response.data[0].id})
                        .then(response2 => {
                            setMessaggi(response2.data)
                            var objDiv = document.getElementById("testBox");
                            objDiv.scrollTop = objDiv.scrollHeight;
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
    }

    const onChangeMessaggioDaInviare = (e) =>
    {
        let messaggio = e.target.value
        setMessaggioDaInviare(messaggio)
    }

    const onClickEliminaMessaggio = (idMessaggio) =>
    {
        axios.post('http://localhost:8080/api/messaggio/deleteMessage', {idMessaggio:idMessaggio})
            .then(response => {
                socket.current.emit("deleteMessage", {
                    senderEmail : mittenteEmail,
                    receiverEmail: destinatarioEmail,
                    conversazioneId : conversazione.id,
                    id : idMessaggio
                })

                let array = messaggi.filter(function (elem) {
                    return elem.id != idMessaggio
                })

                setMessaggi(array)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //statoModifica idMessaggio
    const onClickModificaMessaggio = (idMessaggio,testo) =>
    {
       document.getElementById("inputTextMessaggio").value=testo
       setModificaMessaggio(idMessaggio)
    }

    const onSubmitInviaMessaggio = () =>
    {
        if(messaggioDaInviare.length==0)
            return

        if(modificaMessaggio!=null)
        {
            axios.post('http://localhost:8080/api/messaggio/modifyMessage', {idMessaggio: modificaMessaggio, nuovoTesto:messaggioDaInviare})
                .then(response => {
                    setModificaMessaggio(null)
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        else {
            const messaggio = {
                conversazioneId: conversazione.id,
                sender: mittenteEmail,
                testo: messaggioDaInviare,
                dataInvio: new Date()
            }

            axios.post('http://localhost:8080/api/messaggio/create', messaggio)
                .then(response => {

                    socket.current.emit("sendMessage", {
                        id : response.data.id,
                        conversazioneId : response.data.conversazioneId,
                        senderEmail: mittenteEmail,
                        receiverEmail: destinatarioEmail,
                        text: messaggioDaInviare,
                    })

                    axios.post('http://localhost:8080/api/messaggio/getMessages', {conversazioneId: conversazione.id})
                        .then(response => {
                            setMessaggi(response.data)
                            var objDiv = document.getElementById("testBox");
                            objDiv.scrollTop = objDiv.scrollHeight;
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                })
                .catch((error) => {
                    console.log(error);
                })




        }

        document.getElementById("inputTextMessaggio").value=""
        setMessaggioDaInviare(null)


    }

    if(!chatApertaBool)
        return(
            <div className="c-chatContainer">
                <div className="c-showChatButton">
                    <img onClick={onClickShowChat} src={chatButton}/>
                </div>
            </div>
        )
    else
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
                                                conversazioni.map((personale,i) => {

                                                    if(mittenteRuolo=="personale adisu")
                                                    {
                                                        return(
                                                            <a key={i} className="list-group-item list-group-item-action text-black rounded-0 cursor-pointer" onClick={() => onClickChangeDestinatario(personale.membri[0].email,personale.membri[0].nome)}>
                                                                {personale.membri[0].email}
                                                            </a>
                                                        )
                                                    }
                                                    else
                                                        return(
                                                            <a key={i} className="list-group-item list-group-item-action text-black rounded-0 cursor-pointer" onClick={() => onClickChangeDestinatario(personale.email,personale.nome)}>
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
                                    <div className="c-upperContainer position-absolute bg-white">
                                        <div className="c-upperContainerIn">
                                         <span>{destinatarioName}</span>
                                         <img src={closeButton} onClick={onClickCloseChat}/>
                                        </div>
                                    </div>
                                    <div id="testBox" className="px-4 py-5 chat-box bg-white">
                                        {

                                            messaggi.map((messaggio,i) => {

                                                if(!messaggio.sender)
                                                    return (
                                                        <h1>Seleziona una chat</h1>
                                                    )
                                                else if(messaggio.sender==mittenteEmail) {
                                                    return (
                                                        <div key={i} className="media-body ml-3 rightText">
                                                            <div className="bg-primary rounded py-2 px-3 mb-2">
                                                                <div className="dropdown">
                                                                        <img className="c-moreImage" src={more} />
                                                                        <div className="dropdown-content">
                                                                            <div onClick={() => onClickEliminaMessaggio(messaggio.id)}>Rimuovi</div>
                                                                            <div onClick={() => onClickModificaMessaggio(messaggio.id,messaggio.testo)}>Modifica</div>
                                                                        </div>
                                                                </div>
                                                                <p className="text-small mb-0 text-white">
                                                                    {messaggio.testo}
                                                                </p>
                                                                <div className="c-dataMessaggio messageBottom">{format(messaggio.dataInvio)}</div>
                                                            </div>

                                                        </div>
                                                    )
                                                }

                                                else if(messaggio.sender==destinatarioEmail) {
                                                    return (
                                                        <div key={i} className="media w-50 ml-auto mb-3">
                                                            <div className="bg-light rounded py-2 px-3 mb-2">
                                                                <div className="dropdown">
                                                                    <img className="c-moreImage" src={more} />
                                                                    <div className="dropdown-content">
                                                                        <div onClick={() => onClickEliminaMessaggio(messaggio.id)}>Rimuovi</div>
                                                                        <div onClick={() => onClickModificaMessaggio(messaggio.id,messaggio.testo)}>Modifica</div>
                                                                    </div>
                                                                </div>
                                                                <p className="text-small mb-0 text-black">
                                                                    {messaggio.testo}
                                                                </p>
                                                                <div className="c-dataMessaggio text-grey messageBottom">{format(messaggio.dataInvio)}</div>
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