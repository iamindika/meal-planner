import {Form,Col,Button} from "react-bootstrap";
export default function RecipeForm(){
  return <section>
    <Col md={{ span: 3, offset: 4 }} xs={2}><Form>
    <h1>Create New Recipe</h1>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Control type="text" placeholder="Name of the Recipe" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlInput2">
    <Form.Control type="text" placeholder="Image URL" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Control as="textarea" placeholder="List of Ingredients" rows={3} />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Control as="textarea" placeholder="Cooking Instructions" rows={5} />
  </Form.Group>
  <div className="mb-2">
    <Button variant="primary" size="lg">
      CREATE
    </Button>{' '}</div>
</Form></Col></section>
}