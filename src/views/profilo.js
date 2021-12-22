import React from 'react'
import "../App.css"
export function profilo () {
  return (
      <div className="profilo">
          <h1>AREA PERSONALE</h1>
           
            <div><label>Nome: </label></div>
            <div><label>Cognome: </label></div>
            <div><label>Ruolo/Tipo: </label></div>
            <div><label>Indirizzo: </label></div>
            <div><label>Email: </label></div>
            
            if (personale/admin) {
                //fa la modifica password
                <form id="form_id" method="post" name="formProfilo">
                <div><label>Modifica Password: </label></div>
                <div>
                    <input type="password" name="password" id="password"/>
                    <input type="button" value="modifica" id="submit" onclick="validate()"/>
                </div>
            </form>
            } 
            
      </div>
  )
}
export default profilo