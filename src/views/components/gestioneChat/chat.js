import React, { useEffect, useRef, useState } from 'react'
import '../../styles/gestioneChat/chatCSS.css'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import paperPlane from '../../assets/paperPlane.png'
import chatButton from '../../assets/chatButton.svg'
import closeButton from '../../assets/closeButton.png'
import more from '../../assets/more.png'
import { format } from 'timeago.js'
import { io } from 'socket.io-client'

function Chat () {
  const [conversazioni, setConversazioni] = useState([])
  const [conversazione, setConversazione] = useState(null)
  const [destinatarioName, setDestinatarioName] = useState(null)
  const [destinatarioEmail, setDestinatarioEmail] = useState(null)
  const [destinatarioRuolo, setDestinatarioRuolo] = useState(null)
  const [mittenteEmail, setMittenteEmail] = useState(localStorage.getItem('email'))
  const [mittenteRuolo, setMittenteRuolo] = useState(localStorage.getItem('ruolo'))
  const [messaggioDaInviare, setMessaggioDaInviare] = useState('')
  const [chatApertaBool, setChatApertaBool] = useState(false)
  const [modificaMessaggio, setModificaMessaggio] = useState(null)
  const [messaggioDaModificare, setMessaggioDaModificare] = useState(null)
  const [messaggioDaEliminare, setMessaggioDaEliminare] = useState(null)
  const [messaggi, setMessaggi] = useState([''])
  const [messaggioInArrivo, setMessaggioInArrivo] = useState(null)

  const scrollRef = useRef()
  // Socket
  const socket = useRef()

  useEffect(() => {
    socket.current = io('ws://localhost:8900')
    socket.current.on('getMessage', (data) => {
      setMessaggioInArrivo({
        id: data.id,
        conversazioneId: data.conversazioneId,
        sender: data.senderEmail,
        testo: data.text,
        dataInvio: new Date()
      })
    })

    socket.current.on('getModifiedMessage', (data) => {
      setMessaggioDaModificare({
        id: data.id,
        conversazioneId: data.conversazioneId,
        senderEmail: data.senderEmail,
        testo: data.testo
      })
    })

    socket.current.on('getDeletedMessage', (data) => {
      setMessaggioDaEliminare(data)
    })
  }, [])

  useEffect(() => {
    if (messaggioDaModificare) {
      if (conversazione?.membri[0].email === messaggioDaModificare.senderEmail || conversazione?.membri[1].email === messaggioDaModificare.senderEmail) {
        const array = messaggi.map(function (elem) {
          if (elem.id === messaggioDaModificare.id) {
            elem.testo = messaggioDaModificare.testo
          }
          return elem
        })
        setMessaggi(array)
      }
    }
  }, [messaggioDaModificare])

  useEffect(() => {
    if (messaggioDaEliminare) {
      if (conversazione?.membri[0].email === messaggioDaEliminare.senderEmail || conversazione?.membri[1].email === messaggioDaEliminare.senderEmail) {
        const array = messaggi.filter(function (elem) {
          return elem.id != messaggioDaEliminare.id
        })

        setMessaggi(array)
      }
    }
  }, [messaggioDaEliminare])

  useEffect(() => {
    if (messaggioInArrivo) {
      if (conversazione?.membri[0].email === messaggioInArrivo.sender || conversazione?.membri[1].email === messaggioInArrivo.sender) {
        setMessaggi((prev) => [...prev, messaggioInArrivo])
      }
    }
  }, [messaggioInArrivo, conversazione])

  useEffect(() => {
    socket.current.emit('addUser', { mittenteEmail, mittenteRuolo })
    socket.current.on('getUsers', users => {
      console.log(users)
    })
  }, [mittenteEmail])

  // ComponentDidMount
  useEffect(() => {
    // Recupera la lista del personale disponibile a chattare
    if (localStorage.getItem('ruolo') == 'cliente') {
      axios.post('http://localhost:8080/api/personale/viewLista', { ruolo: 'admin' })
        .then(response => {
          if (response.data[0]) {
            setConversazioni(response.data)
            setDestinatarioRuolo('personale adisu')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else if (localStorage.getItem('ruolo') == 'personale adisu') {
      const user = {
        email: mittenteEmail,
        ruolo: 'personale adisu'
      }

      axios.post('http://localhost:8080/api/conversazione/getConversazioni', { user: user })
        .then(response => {
          setConversazioni(response.data)
          setDestinatarioRuolo('cliente')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [])

  const onClickShowChat = () => {
    setChatApertaBool(true)
  }

  const onClickCloseChat = () => {
    setChatApertaBool(false)
  }

  const onClickChangeDestinatario = (emailDest, nomeDest) => {
    const user1 = {
      email: mittenteEmail,
      ruolo: mittenteRuolo
    }

    const user2 = {
      email: emailDest,
      ruolo: destinatarioRuolo
    }

    setDestinatarioName(nomeDest)

    // Controllo se esiste già una conversazione avviata
    axios.post('http://localhost:8080/api/conversazione/getConversazione', { user1: user1, user2: user2 })
      .then(response => {
        // Se esiste si prende i messaggi
        if (response.data[0]) {
          setDestinatarioEmail(emailDest)
          setConversazione(response.data[0])

          axios.post('http://localhost:8080/api/messaggio/getMessages', { conversazioneId: response.data[0].id })
            .then(response2 => {
              console.log(response2.data)
              setMessaggi(response2.data)
              const objDiv = document.getElementById('testBox')
              objDiv.scrollTop = objDiv.scrollHeight
            })
            .catch((error) => {
              console.log(error)
            })
        }
        // Se non esiste la crea
        else {
          setDestinatarioEmail(emailDest)
          const sender = {
            email: mittenteEmail,
            ruolo: mittenteRuolo
          }

          const receiver = {
            email: emailDest,
            ruolo: destinatarioRuolo
          }

          axios.post('http://localhost:8080/api/conversazione/create', { sender: sender, receiver: receiver })
            .then(response2 => {
              setConversazione(response2.data)
            })
            .catch((error) => {
              console.log(error)
            })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onChangeMessaggioDaInviare = (e) => {
    const messaggio = e.target.value
    setMessaggioDaInviare(messaggio)
  }

  const onClickEliminaMessaggio = (idMessaggio) => {
    axios.post('http://localhost:8080/api/messaggio/deleteMessage', { idMessaggio: idMessaggio })
      .then(response => {
        socket.current.emit('deleteMessage', {
          senderEmail: mittenteEmail,
          receiverEmail: destinatarioEmail,
          conversazioneId: conversazione.id,
          id: idMessaggio
        })

        const array = messaggi.filter(function (elem) {
          return elem.id != idMessaggio
        })

        setMessaggi(array)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // statoModifica idMessaggio
  const onClickModificaMessaggio = (idMessaggio, testo) => {
    document.getElementById('inputTextMessaggio').value = testo
    setModificaMessaggio(idMessaggio)
  }

  const onSubmitInviaMessaggio = () => {
    if (modificaMessaggio != null) {
      axios.post('http://localhost:8080/api/messaggio/modifyMessage', { idMessaggio: modificaMessaggio, nuovoTesto: messaggioDaInviare, email: localStorage.getItem('email'), ruolo: localStorage.getItem('ruolo') })
        .then(response => {
          // TODO gestire l'errore
          if (!(response.data.hasOwnProperty('error'))) {
            messaggi.forEach((el, index, arr) => {
              if (el.id === modificaMessaggio) {
                arr[index].testo = messaggioDaInviare
              }
            })

            socket.current.emit('modifyMessage', {
              senderEmail: mittenteEmail,
              receiverEmail: destinatarioEmail,
              conversazioneId: conversazione.id,
              id: modificaMessaggio,
              testo: messaggioDaInviare
            })

            setModificaMessaggio(null)
          }

          console.log(response.data.message)
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      const messaggio = {
        conversazioneId: conversazione.id,
        sender: { email: mittenteEmail, ruolo: mittenteRuolo },
        testo: messaggioDaInviare,
        dataInvio: new Date()
      }
      console.log('qui' + messaggio.sender)
      axios.post('http://localhost:8080/api/messaggio/create', messaggio)
        .then(response => {
          // TODO gestire l'errore
          console.log(response.data)
          if (!(response.data.hasOwnProperty('error'))) {
            socket.current.emit('sendMessage', {
              id: response.data.id,
              conversazioneId: response.data.conversazioneId,
              senderEmail: mittenteEmail,
              receiverEmail: destinatarioEmail,
              text: messaggioDaInviare
            })

            const array = [...messaggi, response.data]

            setMessaggi(array)

            /* axios.post('http://localhost:8080/api/messaggio/getMessages', {conversazioneId: conversazione.id})
                            .then(response => {
                                setMessaggi(response.data)
                                var objDiv = document.getElementById("testBox");
                                objDiv.scrollTop = objDiv.scrollHeight;
                            })
                            .catch((error) => {
                                console.log(error);
                            }) */
          } else { console.log(response.data.message) }
        })
        .catch((error) => {
          console.log(error)
        })
    }

    document.getElementById('inputTextMessaggio').value = ''
    setMessaggioDaInviare('')
  }

  if (!chatApertaBool) {
    return (
      <div className='c-chatContainer'>
        <div className='c-showChatButton'>
          <img onClick={onClickShowChat} src={chatButton} />
        </div>
      </div>
    )
  } else {
    return (

      <div className='c-chatContainer'>
        <div className='c-chat'>
          <a href='https://bootstrapious.com' className='text-white' />
          <div className='container py-2 px-4'>

            <div className='row rounded-lg overflow-hidden shadow'>

              <div className='col-5 px-0'>
             <div className='bg-white'>

                <div className='bg-gray px-4 py-2 bg-light'>
                    <p className='h5 mb-0 py-1'>Disponibili</p>
                  </div>

                <div className='messages-box'>
                    <div className='list-group rounded-0'>
                          {
                                                conversazioni.map((personale, i) => {
                                                  if (mittenteRuolo == 'personale adisu') {
                                                    return (
                                                      <a key={i} className='list-group-item list-group-item-action text-black rounded-0 cursor-pointer' onClick={() => onClickChangeDestinatario(personale.membri[0].email, personale.membri[0].nome)}>
                                                        {personale.membri[0].email}
                                                      </a>
                                                    )
                                                  } else {
                                                    return (
                                                      <a key={i} className='list-group-item list-group-item-action text-black rounded-0 cursor-pointer' onClick={() => onClickChangeDestinatario(personale.email, personale.nome)}>
                                                        {personale.nome}
                                                      </a>
                                                    )
                                                  }
                                                })
                                            }
                        </div>
                  </div>
              </div>
           </div>
              {
             <div className='col-7 px-0'>
                <div className='c-upperContainer position-absolute bg-white'>
                    <div className='c-upperContainerIn'>
                          <span>{destinatarioName}</span>
                          <img src={closeButton} onClick={onClickCloseChat} />
                        </div>
                  </div>
                <div id='testBox' className='px-4 py-5 chat-box bg-white'>
                    {
                                            messaggi.map((messaggio, i) => {
                                              if (conversazione === null || messaggio === '') {
                                                const el = document.getElementById('containerInviaMessaggio')
                                                console.log(el)
                                                return (
                                                  <h2 key={i}>Seleziona una chat</h2>
                                                )
                                              } else if (messaggio.sender.email == mittenteEmail) {
                                                return (
                                                  <div key={i} className='media-body ml-3 rightText'>
                                                    <div className='bg-primary rounded py-2 px-3 mb-2'>
                                                      <div className='dropdown'>
                                                        <img className='c-moreImage' src={more} />
                                                        <div className='dropdown-content'>
                                                          <div onClick={() => onClickEliminaMessaggio(messaggio.id)}>Rimuovi</div>
                                                          <div onClick={() => onClickModificaMessaggio(messaggio.id, messaggio.testo)}>Modifica</div>
                                                        </div>
                                                      </div>
                                                      <p className='text-small mb-0 text-white'>
                                                        {messaggio.testo}
                                                      </p>
                                                      <div className='c-dataMessaggio messageBottom'>{format(messaggio.dataInvio)}</div>
                                                    </div>

                                                  </div>
                                                )
                                              } else if (messaggio.sender.email == destinatarioEmail) {
                                                return (
                                                  <div key={i} className='media w-50 ml-auto mb-3'>
                                                    <div className='bg-light rounded py-2 px-3 mb-2'>
                                                      <p className='text-small mb-0 text-black'>
                                                        {messaggio.testo}
                                                      </p>
                                                      <div className='c-dataMessaggio text-grey messageBottom'>{format(messaggio.dataInvio)}</div>
                                                    </div>

                                                  </div>
                                                )
                                              }
                                            })
                                        }
                  </div>
                <form action='#' className='bg-light'>
                    <div className='input-group' id='containerInviaMessaggio'>
                          <input
                              type='text' id='inputTextMessaggio' onChange={onChangeMessaggioDaInviare} placeholder='Type a message' aria-describedby='button-addon2'
                              className='form-control rounded-0 border-0 py-2-2 bg-light'
                            />
                          <div className='input-group-append'>
                              <i className='fa fa-paper-plane-o' />
                              <button className='c-buttonSendMessage' id='button' type='submit' onClick={onSubmitInviaMessaggio}>
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
}

export default Chat
