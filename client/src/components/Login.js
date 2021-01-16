import {Form,Button,Col} from "react-bootstrap";

export default function Login(){
  return <section><Col md={{ span: 3, offset: 4 }} xs={2}><Form>
    <h1>Login</h1>
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