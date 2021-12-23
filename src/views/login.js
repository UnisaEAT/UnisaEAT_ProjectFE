import React from 'react'
import "./icss/login.css"
import {Form,Button} from "react-bootstrap"


export function login () {
  return (
   
        <div className="login">
            
            <Form method="post" action="localhost:3000/api/login/login">
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" className="testo" type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" className="testo" type="password" placeholder="Password" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            
            <Button  variant="primary" className="bottone" type="submit">
                ACCEDI
            </Button> 
            </Form>
        </div>
  )
}
export default login
