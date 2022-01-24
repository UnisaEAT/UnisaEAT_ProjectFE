import React from 'react'

import '../../styles/gestioneMenu/VisualizzazioneMenu.css'
import axios from 'axios'
import Categorie from './Categorie'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import FailurePopUp from '../App/failurePopUp'
export class VisualizzazioneMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menu: [],
      item: [],
      value: '',
      error: false,
      failurePopUp: false
    }
    this.filterItems = this.filterItems.bind(this)
    this.closeFailurePopUp = this.closeFailurePopUp.bind(this)
  }

  closeFailurePopUp () {
    this.setState({ failurePopUp: false })
    window.location.reload()
  }

  filterItems (category) {
    console.log(this.state.menu[0].pasti)
    let newItems = this.state.menu[0].pasti.filter((item) => item.categoria === category)
    if (newItems.length == 0) {
      newItems = [null]
    }
    console.log(newItems)
    this.setState({ item: newItems })
  }

  someFunc (x) {
    if (x) this.state.value = 'pranzo'
    else this.state.value = 'cena'
    this.Visualizza()
  }

  componentDidMount () {
    if (!localStorage.getItem('email')) { this.setState({ error: 400 }) }
    if (localStorage.getItem('ruolo') != 'cliente' && localStorage.getItem('ruolo') != 'operatore mensa') { this.setState({ error: 401 }) }
  }

  Visualizza () {
    axios.post('http://localhost:8080/api/menu/visualizzaMenu', { tipo: this.state.value })
      .then(response => {
        console.log('Visualizza:' + response.data)
        if (response.data.message != false) {
          this.setState({ menu: response.data })
        } else {
          console.log('bha')
          this.setState({ failurePopUp: true })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  imageNameTextTransform (nomePasto) {
    return nomePasto.split(' ').join('_').toLowerCase()
  }

  render () {
    const categorie = ['primo', 'secondo', 'contorno', 'frutta', 'extra']
    if (this.state.error === 400) { return <h1 className='erroreGenericoDiAccesso'>Effettua il login per accedere a questa pagina</h1> } else if (this.state.error === 401) { return <h1 className='erroreGenericoDiAccesso'>Accesso negato</h1> }
    return (
      <div>
        {this.state.failurePopUp && <FailurePopUp message={'Nessun menu per la tipologia ' + this.state.value.toUpperCase() + ' è presente per questa data.'} handleClose={this.closeFailurePopUp} />}
        <section className='menu-section'>
          <div>
            <h1 className='home_title'>Il Menu del giorno</h1>
            <h5 className='home_title_2'>Scegli la tipologia del menù per visualizzarlo.</h5>
            <div className='underLine' />
          </div>
          <Categorie filterItems={this.filterItems} categorie={categorie} />
          <div className='section-center'>

            {this.state.item.map((menuItem, i) => {
              if (menuItem == null) {
                return (
                  <h1 className='h1Menu'>Non ci sono pasti per questa categoria.</h1>
                )
              }
              return (
                <article key={i} className='menu-item'>
                  <img src={'../immaginiPasti/' + this.imageNameTextTransform(menuItem.nome) + '.jpg'} alt={menuItem.categoria} className='photo' />
                  <div className='item-info'>
                    <header>
                      <h3 className='title'>{menuItem.nome}</h3>
                    </header>
                    <p className='item-text2'>{menuItem.descrizione}</p>
                    <p>Ingredienti:{menuItem.ingredienti}</p>

                  </div>
                </article>
              )
            })}
          </div>
        </section>
        <DropdownButton className='DropDownMenu' id='dropdown-item-button' title='Tipologia Menu'>
          <Dropdown.Item onClick={() => this.someFunc(true)} las='button'>Pranzo</Dropdown.Item>
          <Dropdown.Item onClick={() => this.someFunc(false)} las='button'>Cena</Dropdown.Item>
        </DropdownButton>
      </div>
    )
  }
}

export default VisualizzazioneMenu
