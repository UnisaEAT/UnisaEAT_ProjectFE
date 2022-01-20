import {useEffect, useRef, useState} from "react";
import axios from "axios";
import close from "../../assets/close.png"

export default function VisualizzazioneNotifiche() {
    const [notifiche,setNotifiche] = useState([]);
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])

    useEffect(() =>{
        axios.post('http://localhost:8080/api/notifiche/visualizzaLista',{reciverEmail: localStorage.getItem("email")})
            .then(response => {

               setNotifiche(response.data)
                console.log("post"+notifiche)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const RimozioneNotifica = (id) =>{
        console.log(id)
        axios.post('http://localhost:8080/api/notifiche/rimuoviNotifica',{idnot: id})
            .then(response => {
                window.location.reload()
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function DropdownItem(props) {
        return (
            <div className="menu-item-notifiche elementoNotifica" >
                    <a >
                        {props.children}
                    </a>
                <img src={close} width="10px" onClick={()=>RimozioneNotifica(props.id)} className="icon-right"></img>
            </div>
        );
    }
    if(notifiche.length>0)
    return (
        <div className="dropdownMenu" >
                <div className="menu">
                    { notifiche.map((notifica,i)=> {
                        return(
                        <DropdownItem key={i} goToMenu="animals" id={notifica.id}>
                            {notifica.titolo}
                        </DropdownItem>
                        )
                    })}
                </div>
        </div>
    )
    else{
        return (
            <div className="dropdownMenu" >
                <div className="menu">
                    <p className="nessunaNotifica">Nessuna notifica per te</p>
                </div>
            </div>
        )
    }
}