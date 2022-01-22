import {useEffect, useRef, useState} from "react";
import axios from "axios";
import close from "../../assets/close.png"
import {CSSTransition} from 'react-transition-group';

export default function VisualizzazioneNotifiche() {
    const [notifiche, setNotifiche] = useState([]);
    const [activeMenu, setActiveMenu] = useState('main');

    useEffect(() => {
        axios.post('http://localhost:8080/api/notifiche/visualizzaLista', {reciverEmail: localStorage.getItem("email")})
            .then(response => {

                setNotifiche(response.data)
                console.log("post" + notifiche)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const RimozioneNotifica = (id) => {
        console.log(id)
        axios.post('http://localhost:8080/api/notifiche/rimuoviNotifica', {idnot: id})
            .then(response => {
                window.location.reload()
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function DropdownItem(props) {
        return (
            <a href="#" className="menu-item-notifiche elementoNotifica"
               onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                {props.children}
                <img src={close} width="10px" onClick={() => RimozioneNotifica(props.id)} className="icon-right"></img>
            </a>
        );
    }

    if (notifiche.length > 0)
        return (
            <div className="dropdownMenu">
                <CSSTransition
                    in={activeMenu === 'main'}
                    timeout={500}
                    classNames="menu-primary"
                    unmountOnExit>
                    <div className="menu">
                        {notifiche.map((notifica, i) => {
                            return (
                                <DropdownItem key={i} goToMenu="info" id={notifica.id}>
                                    {notifica.titolo}
                                </DropdownItem>

                            )
                        })}
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={activeMenu === 'info'}
                    timeout={500}
                    classNames="menu-secondary"
                    unmountOnExit>
                    <div className="menu">
                        <DropdownItem goToMenu="main">
                            <h2>My Tutorial</h2>
                        </DropdownItem>
                    </div>
                </CSSTransition>
            </div>
        )
    else {
        return (
            <div className="dropdownMenu">
                <div className="menu">
                    <p className="nessunaNotifica">Nessuna notifica per te</p>
                </div>
            </div>
        )
    }
}