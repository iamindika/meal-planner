import { Image, Col, Button, Form } from "react-bootstrap";

export default function ProfileEdit(props) {

  return (
    <section>
      <Col md={{ span: 3, offset: 4 }}>
      <Image style={{textAlign:"center"}} src="https://cdn.dribbble.com/users/1070859/screenshots/5869416/gal-_dribbble__still_2x.gif?compress=1&resize=200x200" roundedCircle />
      </Col>
      
      <br />

      <Col md={{ span: 3, offset: 4 }} xs={2}> 
        <Form>
          <Form.Group controlId="exampleForm.SelectCustomSizeLg">
            <Form.Label><strong>Diet</strong></Form.Label>
              <Form.Control as="select" size="lg" style={{border:"solid grey"}} >
              <option>Select your Diet</option>
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

          <br/>

          <Form.Group controlId="exampleForm.SelectCustomSizeLg">
            <Form.Label><strong>Avoidances</strong></Form.Label>
            <Form.Control multiple as="select" size="lg"  style={{border:"solid grey"}} >
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

          <br/>

          <Form.Group controlId="exampleForm.SelectCustomSizeLg">
            <Form.Label><strong>Favourite Ingredients</strong></Form.Label>
            <Form.Control multiple as="select" size="lg"  style={{border:"solid grey"}} >
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

          <Button variant="primary" type="submit" >
            Submit
          </Button>
        </Form>
      </Col>
    </section>
  )
}

// custom value={diet} onChange={(e) => setDiet(e.target.value)}

// custom value={avoidances} onChange={(e) => setAvoidances((prev)=>[...prev,e.target.value])}

//custom value={favorites} onChange={(e) => props.setFavorites((prev)=>[...prev, e.target.value])}

// onClick={props.handleSubmit}