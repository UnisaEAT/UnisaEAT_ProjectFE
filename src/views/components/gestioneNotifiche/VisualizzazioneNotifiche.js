import {useEffect, useRef, useState} from "react";
import axios from "axios";

export default function VisualizzazioneNotifiche() {
    const [notifiche,setNotifiche] = useState([]);
    const [activeMenu, setActiveMenu] = useState('main');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
    }, [])

    useEffect(()=>{
        axios.post('http://localhost:8080/api/notifiche/visualizzaLista',{reciverEmail: localStorage.getItem("email")})
            .then(response => {
                console.log(response.data)
               setNotifiche(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    })
    function DropdownItem(props) {
        return (
            <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className="icon-right">{props.rightIcon}</span>
            </a>
        );
    }

    return (
        <div className="dropdownMenu" >
                <div className="menu">
                    <DropdownItem>ccc</DropdownItem>
                    <DropdownItem
                        leftIcon="🦧"
                        rightIcon="🦧"
                        goToMenu="settings">
                        Settings
                    </DropdownItem>
                    <DropdownItem
                        leftIcon="🦧"
                        rightIcon="🦧"
                        goToMenu="animals">
                        Animals
                    </DropdownItem>
                </div>
        </div>
    )
}