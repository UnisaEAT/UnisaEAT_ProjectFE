import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

// app functions
import Homepage from './views/components/App/Homepage'

// class
import RichiestaTesserino from './views/components/gestioneTesserino/richiestaTesserino'
import RinnovoTesserino from './views/components/gestioneTesserino/rinnovoTesserino'
import VisualizzaSaldo from './views/components/gestioneTesserino/visualizzaSaldo'
import RicaricaTesserino from './views/components/gestioneTesserino/ricaricaTesserino'
import Profilo from './views/components/gestioneProfilo/profilo'
import ModificaPassword from './views/components/gestioneProfilo/modificaPassword'
import InserimentoPersonale from './views/components/gestionePersonale/InserimentoPersonale'
import VisualizzazioneListaPersonale from './views/components/gestionePersonale/VisualizzazioneListaPersonale'
import RimozionePersonale from './views/components/gestionePersonale/RimozionePersonale'
import SceltaPasti from './views/components/gestioneOrdinePasto/sceltaPasti'
import PagamentoPasto from './views/components/gestioneOrdinePasto/pagamentoPasto'
import ListaOrdini from './views/components/gestioneOrdinePasto/listaOrdini'
import DettagliOrdine from './views/components/gestioneOrdinePasto/dettagliOrdine'
import StatisticheSettimanali from './views/components/gestioneStatistiche/statisticheSettimanali'
import VisualizzazioneFAQ from './views/components/gestioneFAQ/visualizzazioneFAQ'
import InserimentoFAQ from './views/components/gestioneFAQ/inserimentoFAQ'
import ModificaFAQ from './views/components/gestioneFAQ/modificaFAQ'
import CompilazioneTicket from './views/components/gestioneTicket/compilazioneTicket'
import VisualizzazioneTicket from './views/components/gestioneTicket/visualizzazioneTicket'

// Autenticazione
import Login from './views/components/gestioneLogin/login'
import Logout from './views/components/gestioneLogin/logout'
import InserimentoMenu from './views/components/gestioneMenu/InserimentoMenu'
import ModificaMenu from './views/components/gestioneMenu/ModificaMenu'
import VisualizzazioneMenu from './views/components/gestioneMenu/VisualizzazioneMenu'
import SceltaTipologiaInserimento from './views/components/gestioneMenu/SceltaTipologiaInserimento'
import SceltaTipologiaModifica from './views/components/gestioneMenu/SceltaTipologiaModifica'

class App extends Component {
  render () {
    return (
      <div>
        <Switch>
          <Route exact path={['/']} component={Homepage} />
          <Route exact path={['/gestioneTesserino/richiestaTesserino']} component={RichiestaTesserino} />
          <Route exact path={['/gestioneTesserino/rinnovoTesserino']} component={RinnovoTesserino} />
          <Route exact path={['/gestioneTesserino/ricaricaTesserino']} component={RicaricaTesserino} />
          <Route exact path={['/gestioneTesserino/visualizzaSaldo']} component={VisualizzaSaldo} />
          <Route exact path={['/gestionePersonale/InserimentoPersonale']} component={InserimentoPersonale} />
          <Route exact path={['/gestionePersonale/RimozionePersonale']} component={RimozionePersonale} />
          <Route exact path={['/gestioneMenu/SceltaTipologiaInserimento']} component={SceltaTipologiaInserimento} />
          <Route exact path={['/gestioneMenu/SceltaTipologiaModifica']} component={SceltaTipologiaModifica} />
          <Route exact path={['/gestioneMenu/InserimentoMenu']} component={InserimentoMenu} />
          <Route exact path={['/gestioneMenu/ModificaMenu']} component={ModificaMenu} />
          <Route exact path={['/gestioneMenu/VisualizzazioneMenu']} component={VisualizzazioneMenu} />
          <Route exact path={['/gestionePersonale/VisualizzazioneListaPersonale']} component={VisualizzazioneListaPersonale} />
          <Route exact path={['/gestioneProfilo/profilo']} component={Profilo} />
          <Route exact path={['/gestioneProfilo/modificaPassword']} component={ModificaPassword} />
          <Route exact path={['/gestioneOrdinePasto/sceltaPasti']} component={SceltaPasti} />
          <Route exact path={['/gestioneOrdinePasto/pagamentoOrdine']} component={PagamentoPasto} />
          <Route exact path={['/gestioneOrdinePasto/listaOrdini']} component={ListaOrdini} />
          <Route exact path={['/gestioneOrdinePasto/dettagliOrdine']} component={DettagliOrdine} />
          <Route exact path={['/statisticheSettimanali']} component={StatisticheSettimanali} />
          <Route exact path={['/gestioneFAQ/visualizzazioneFAQ']} component={VisualizzazioneFAQ} />
          <Route exact path={['/gestioneFAQ/inserimentoFAQ']} component={InserimentoFAQ} />
          <Route exact path={['/gestioneFAQ/modificaFAQ']} component={ModificaFAQ} />
          <Route exact path={['/gestioneTicket/compilazioneTicket']} component={CompilazioneTicket} />
          <Route exact path={['/gestioneTicket/visualizzazioneTicket']} component={VisualizzazioneTicket} />
          <Route exact path={['/login']} component={Login} />
          <Route exact path={['/logout']} component={Logout} />
        </Switch>
      </div>
    )
  }
}

export default App
