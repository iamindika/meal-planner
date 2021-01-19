import {Form,Button,Col,Image,Dropdown,DropdownButton,InputGroup,FormControl} from 'react-bootstrap'

export default function Profile(){
  return <section>
       <Col md={{ span: 3, offset: 4 }}>
      <Image style={{textAlign:"center"}} src="https://cdn.dribbble.com/users/1070859/screenshots/5869416/gal-_dribbble__still_2x.gif?compress=1&resize=200x200" roundedCircle />
    </Col>
    <Col  md={{ span: 3, offset: 4 }} xs={2}> 
    <Form>
      <br />
  <Form.Group controlId="formBasicName">
    <Form.Control type="text" placeholder="Enter Your Name" />
  </Form.Group>
  <InputGroup>
    <FormControl
      placeholder="Select you Diet"
      aria-describedby="basic-addon2"
    />

    <DropdownButton
      as={InputGroup.Append}
      variant="outline-secondary"
      title="Diet"
      id="input-group-dropdown-2"
    >
      <Dropdown.Item href="#">Vegan</Dropdown.Item>
      <Dropdown.Item href="#">Vegetarian</Dropdown.Item>
      <Dropdown.Item href="#">Gluten Free</Dropdown.Item>
      <Dropdown.Item href="#">Ketogenic</Dropdown.Item>
      <Dropdown.Item href="#">Lacto-Vegetarian</Dropdown.Item>
      <Dropdown.Item href="#">Pescetarian</Dropdown.Item>
      <Dropdown.Item href="#">Paleo</Dropdown.Item>
      <Dropdown.Item href="#">Primal</Dropdown.Item>
      <Dropdown.Item href="#">Whole30</Dropdown.Item>
    </DropdownButton>
  </InputGroup>
<br />

<InputGroup>
    <FormControl
      placeholder="Select Ingredients"
      aria-describedby="basic-addon2"
    />

    <DropdownButton
      as={InputGroup.Append}
      variant="outline-secondary"
      title="Ingredients"
      id="input-group-dropdown-2"
    >
      <Dropdown.Item href="#">Fish</Dropdown.Item>
      <Dropdown.Item href="#">Chia Seeds</Dropdown.Item>
      <Dropdown.Item href="#">Bacon</Dropdown.Item>
      <Dropdown.Item href="#">Mango</Dropdown.Item>
    </DropdownButton>
  </InputGroup>
<br />


<InputGroup>
    <FormControl
      placeholder="Select Ingredients to avoid"
      aria-describedby="basic-addon2"
    />

    <DropdownButton
      as={InputGroup.Append}
      variant="outline-secondary"
      title="Avoid Ingrdients"
      id="input-group-dropdown-2"
    >
      <Dropdown.Item href="#">Fish</Dropdown.Item>
      <Dropdown.Item href="#">Chia Seeds</Dropdown.Item>
      <Dropdown.Item href="#">Bacon</Dropdown.Item>
      <Dropdown.Item href="#">Mango</Dropdown.Item>
    </DropdownButton>
  </InputGroup>
<br />

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</Col>
  </section>
}

