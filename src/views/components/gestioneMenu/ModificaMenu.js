import React, { useState } from 'react'
import '../../styles/gestioneMenu/InserimentoMenu.css'
import axios from 'axios'
import Categorie from './Categorie'
import SuccessPopUp from '../App/successPopUp'
import {Button, OverlayTrigger, Popover} from 'react-bootstrap'
import FailurePopUp from '../App/failurePopUp'

export class ModificaMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menu: [],
      item: [],
      ritornoPasti: [],
      popUp: false,
      failurePopUp: false,
      value: props.location.state.value
    }
    this.filterItems = this.filterItems.bind(this)
    this.closePopUp = this.closePopUp.bind(this)
    this.closeFailurePopUp = this.closeFailurePopUp.bind(this)
  }

  closeFailurePopUp () {
    this.setState({ failurePopUp: false })
    window.location.reload()
  }

  closePopUp () {
    this.setState({ popUp: false })
    this.setState({ ritornoPasti: null })
    window.location.reload()
  }

  filterItems (category) {
    const newItems = this.state.menu.filter((item) => item.categoria === category)
    this.setState({ item: newItems })
  }

  modificaPasto (pasto) {
    console.log(this.state.ritornoPasti)
    if (this.state.ritornoPasti.includes(pasto)) {
      console.log('Pasto già inserito')
    } else {
      this.state.ritornoPasti.push(pasto)
      console.log(this.state.ritornoPasti.toString())
      this.setState({ prova: true })
    }
  }

  componentDidMount () {
    axios.get('http://localhost:8080/api/menu/SceltaMenu')
      .then(response => {
        console.log(response.data)
        this.setState({ menu: response.data })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  Modifica () {
    axios.post('http://localhost:8080/api/menu/modificaMenu', {
      tipo: this.state.value,
      pasti: this.state.ritornoPasti
    })
      .then(response => {
        if (response.data.message === true) {
          console.log('ciao')
          this.setState({ popUp: true })
        } else {
          console.log('ciaoMonello')
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
  onMouseEnterElement (e) {
    if (document.getElementById(e).style.borderColor == 'black') { document.getElementById(e).style.borderColor = 'black' } else { document.getElementById(e).style = 'box-shadow: 0px 4px 16px rgb(0 0 0 / 30%);background:#F0F0F0' }
  }

  onMouseLeaveElement (e) {
    if (!(document.getElementById(e).style.borderColor == 'black')) { document.getElementById(e).style = 'background:white' } else if (document.getElementById(e).style.borderColor == 'grey') { document.getElementById(e).style = 'background:white' }
  }

  render () {
    const categorie = ['primo', 'secondo', 'contorno', 'frutta', 'extra']
    return (
      <div id='root'>
        {this.state.popUp && <SuccessPopUp message='Modifica Menu avvenuta con successo!' handleClose={this.closePopUp} />}
        {this.state.failurePopUp && <FailurePopUp message='Impossibile modificare il menu perchè il menu non è presente per questa data.' handleClose={this.closeFailurePopUp} />}
        <section className='menu-section'>
          <div>
            <h1 className='home_title'>Modifica Menu</h1>
            <h5 className='home_title_2'>Clicca sui pasti per inserirli nel nuovo menù</h5>
            <div className='underLine' />
          </div>
          <Categorie filterItems={this.filterItems} categorie={categorie} />
          <div className='section-center'>
            {this.state.item.map((menuItem, i) => {
              return (
                <article key={i} className='menu-item'>
                  <OverlayTrigger
                      trigger="click" overlay={
                    <Popover placement="top">
                      <Popover.Header as="h3">Pasto scelto!</Popover.Header>
                      <Popover.Body>
                        Clicca su "Modifica menu" per modificare il pasto nel menù.
                      </Popover.Body>
                    </Popover>}>
                  <img id={i} onMouseEnter={()=>this.onMouseEnterElement(i)} onMouseLeave={()=>this.onMouseLeaveElement(i)} onClick={() => this.modificaPasto(menuItem)} src={'../immaginiPasti/' + this.imageNameTextTransform(menuItem.nome) + '.jpg'} alt={menuItem.categoria} className='photo cursor-pointer' />
                  </OverlayTrigger>
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
        <Button variant='outline-primary' className='buttonInsert mt-5 mb-5' onClick={() => this.Modifica()}>
          Modifica Menu
        </Button>
      </div>
    )
  }
}

export default ModificaMenu
