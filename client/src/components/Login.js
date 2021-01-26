import { useState, useContext, useEffect } from "react";
import {Form,Button,Col} from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../context/authContext";
import "./Login.scss";

export default function Login(){
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { user, setUser } = useContext(AuthContext);

  function handleSubmit(event){
  
    event.preventDefault();
    
    axios({
      method: 'POST',
      url: '/auth',
      data:{
        email, password
      }
    })
      .then(res => {
        console.log(res.data);
        setUser({...res.data.user});
        localStorage.setItem('token', res.data.token);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <section id="login">
      <Col md={{ span: 3, offset: 4 }} xs={2}>
        <Form>
        <h1>Login</h1>
        <Form.Group controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
        </Form>
      </Col>
    </section>)
}