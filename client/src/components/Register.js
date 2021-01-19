import {useEffect, useState} from "react";
import axios from "axios";
import {Form,Button,Col} from "react-bootstrap"

export default function Register(props){
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState({});

  function handleSubmit(event){
  
    event.preventDefault();

    axios({
      method: 'POST',
      url: '/register',
      data:{
        name, email, password
      }
    })
      .then(({
       data
      }) => {
        var json = JSON.parse(data);
        setSearchResults(json.results)
      })
      .catch((err) => console.log(err));
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return  (
    <section>
      <Col md={{ span: 3, offset: 4 }} xs={2}>
        <Form>
          <h1>Register</h1>
          <Form.Group controlId="formBasicName">
            <Form.Control type="text" placeholder="Enter Your Name" value={name} onChange={handleNameChange}/>
            <p></p>
          </Form.Group>

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
    </section>
)
  }