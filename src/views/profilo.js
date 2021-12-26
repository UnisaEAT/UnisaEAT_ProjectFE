import React from 'react';
import "../App.css";
import {Form} from 'react-bootstrap'


export function Profilo(){
    
  return (
      <div className="profilo">
          <Form className="profilo" action="http://localhost:3000/api/admin/findAll" method="GET">
          <h1>AREA PERSONALE</h1>
           
            <div><label>Nome: </label> </div>
            <div><label>Cognome: </label></div>
            <div><label>Indirizzo: </label></div>
            <div><label>Email: </label></div>
            
            <Form className="profilo" action="http://localhost:3000/api/admin/findAll" method="POST">
                <div><label>Modifica Password: </label></div>
                <div>
                    <input type="Mpassword" name="Mpassword" id="Mpassword"/>
                    <input type="button" value="modifica" id="submit"/>
                </div>
            </Form>
            </Form>
            
      </div>
  )
  }
  export default Profilo

