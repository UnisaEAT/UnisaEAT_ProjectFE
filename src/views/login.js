import React from "react";
import {Form,Button,Col,Row} from "react-bootstrap";
import '../App.css';

export function Login()
{
    return(
        <div className="formContainer container">
            <Form className="test" action="http://localhost:3000/Login/login" method="POST">
                <h3>LOGIN</h3>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="email" placeholder="Inserisci la tua email" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Inserisci la tua password" />
                    </Form.Group>
                </Row>
                <br/>
                <Button className="submitButton" variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default Login