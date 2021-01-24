import {Form,Button,Col,Image} from 'react-bootstrap';
import axios from "axios";
import { useState } from 'react';
import {useHistory} from "react-router-dom"

export default function Profile(){
const [diet,setDiet] = useState("");
const [avoidances,setAvoidances] = useState([]);
const [favorites,setFavorites] = useState("");

const history = useHistory();

function handleSubmit(event){
 
event.preventDefault();
axios.post('/profile/new',
  {diet, avoidances, favorites},
  {headers: {"x-auth-token": localStorage.getItem("token")}}
)
  .then(({
   data
  }) => {
     console.log(data)
  })
  .catch((err) => console.log(err));
  setDiet("");
  setAvoidances([]);
  setFavorites("");
  history.push("/profile");
}

  return <section>
       <Col md={{ span: 3, offset: 4 }}>
      <Image style={{textAlign:"center"}} src="https://cdn.dribbble.com/users/1070859/screenshots/5869416/gal-_dribbble__still_2x.gif?compress=1&resize=200x200" roundedCircle />
    </Col>
    <Col  md={{ span: 3, offset: 4 }} xs={2}> 
    <Form>
      <br />


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
      <option>Peanut</option>
      <option>Dairy</option>
      <option>Sesame</option>
      <option>Soy</option>
      <option>Tree nut</option>
      <option>Shellfish</option>
      <option>Wheat</option>
      <option>Yeast</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.SelectCustomSizeLg">
<Form.Label><strong>Favourite Ingredients</strong></Form.Label>
    <Form.Control multiple as="select" size="lg" custom value={favorites} onChange={(e) => setFavorites((prev)=>[...prev,e.target.value])}>
      <option>Egg</option>
      <option>Bacon</option>
      <option>Steak</option>
      <option>Bread</option>
      <option>Apple</option>
      <option>Banana</option>
      <option>Mayo</option>
      <option>Butter</option>
      <option>Cheese</option>
      <option>Broccoli</option>
      <option>Kale</option>
      <option>Potato</option>
      <option>Pizza</option>
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
