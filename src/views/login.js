import React from "react";
import {Form,Button,Col,Row,Card} from "react-bootstrap";
import '../App.css';
import './icss/login.css';

export function Login()
{
    return(
        
        <Card className=" mx-auto col-xl-7 justify-content-center text-center">
        <div className="row d-flex justify-content-center">
        <div className="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
        <div className="login">
        
            <Form className="test" action="http://localhost:3000/api/login/login" method="POST">
                <h3>LOGIN</h3><br></br>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="email" placeholder="Inserisci la tua email" />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Inserisci la tua password" />
                    </Form.Group>
                </Row>
                <br/>
                <Button className="bottone" variant="primary" type="submit">
                    LOGIN
                </Button>
            </Form>
        </div>
        </div>
        </div>
        </Card>
    )
}

export default Login