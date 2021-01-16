import {Form,Button,Col} from "react-bootstrap"

export default function Register(){
  return  <section><Col md={{ span: 3, offset: 4 }} xs={2}><Form>
    <h1>Register</h1>
 <Form.Group controlId="formBasicName">
    <Form.Control type="text" placeholder="Enter Your Name" />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Control type="email" placeholder="Enter email" />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form></Col></section>
}