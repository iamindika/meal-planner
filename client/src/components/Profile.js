import {Form,Button,Col,Image} from 'react-bootstrap';
import axios from "axios";
import { useState } from 'react';

export default function Profile(){
const [fName,setFName] = useState("");
const [lName,setLName] = useState("");
const [diet,setDiet] = useState("");
const [avoidances,setAvoidances] = useState([]);
const [cuisine,setCuisine] = useState("");

function handleSubmit(event){
event.preventDefault();
axios({
  method: 'POST',
  url:'/profile/new',
  data:{
   fName,
   lName,
   diet,
   avoidances,
   cuisine
  }
})
  .then(({
   data
  }) => {
     console.log(data)
  })
  .catch((err) => console.log(err));
  setFName("");
  setLName("");
  setDiet("");
  setAvoidances([]);
  setCuisine("");
}

  return <section>
       <Col md={{ span: 3, offset: 4 }}>
      <Image style={{textAlign:"center"}} src="https://cdn.dribbble.com/users/1070859/screenshots/5869416/gal-_dribbble__still_2x.gif?compress=1&resize=200x200" roundedCircle />
    </Col>
    <Col  md={{ span: 3, offset: 4 }} xs={2}> 
    <Form>
      <br />
  <Form.Group controlId="formBasicName">
    <Form.Control type="text"  size="lg" placeholder="Enter Your First Name" value={fName} onChange={(e) => setFName(e.target.value)} />
  </Form.Group>
  <Form.Group controlId="formBasicName">
    <Form.Control type="text"  size="lg" placeholder="Enter Your Last Name" value={lName} onChange={(e) => setLName(e.target.value)} />
  </Form.Group>


<Form.Group controlId="exampleForm.SelectCustomSizeLg">
<Form.Label><strong>Diet</strong></Form.Label>
    <Form.Control as="select" size="lg" custom value={diet} onChange={(e) => setDiet(e.target.value)}>
      <option>Vegetarian</option>
      <option>Gluten Free</option>
      <option>Ketogenic</option>
      <option>Lacto-Vegetarian</option>
      <option>Pescetarian</option>
      <option>Paleo</option>
      <option>Primal</option>
      <option>Whole30</option>
    </Form.Control>
  </Form.Group>
<Form.Group controlId="exampleForm.SelectCustomSizeLg">
<Form.Label><strong>Avoidances</strong></Form.Label>
    <Form.Control multiple as="select" size="lg" custom value={avoidances} onChange={(e) => setAvoidances((prev)=>[...prev,e.target.value])}>
      <option>Alcohol</option>
      <option>Caffeine</option>
      <option>Celery</option>
      <option>Egg</option>
      <option>Gluten</option>
      <option>Groundnut</option>
      <option>Milk</option>
      <option>Sesame</option>
      <option>Soybean</option>
      <option>Tree nut</option>
      <option>Lactose</option>
      <option>Wheat</option>
      <option>Yeast</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.SelectCustomSizeLg">
<Form.Label><strong>Cuisine</strong></Form.Label>
    <Form.Control as="select" size="lg" custom value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
      <option>African</option>
      <option>American</option>
      <option>British</option>
      <option>Caribbean</option>
      <option>Chinese</option>
      <option>French</option>
      <option>Greek</option>
      <option>Italian</option>
      <option>Indian</option>
      <option>Korean</option>
      <option>Mediterranean</option>
      <option>Middle Eastern</option>
      <option>Thai</option>
    </Form.Control>
  </Form.Group>
  <br />
  <Button variant="primary" type="submit" onClick={handleSubmit}>
    Submit
  </Button>
</Form>
</Col>
  </section>
}
