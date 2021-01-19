import { useEffect, useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import CardGroup from 'react-bootstrap/CardGroup';

import RecipeCard from './RecipeCard'
import "./Favourites.scss";


export default function Favourites() {

  const [favs, setFavs] = useState([]);
  const [value,setValue] = useState();

  function handleSubmit(event) {
     event.preventDefault();
    //  console.log(value)
    axios({
      method: 'POST',
      url: '/api/search',
      data:{
        value
      }
    })
      .then(({
        data
      }) => {
        console.log(data)
      })
      .catch((err) => console.log(err));
  }

  function handleChange(event) {
   setValue(event.target.value)
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/recipes',
    })
      .then(({
        data
      }) => {
        setFavs(data)
      })
      .catch((err) => console.log(err));
  }, []);

  const favourites = favs.map((recipe) => <RecipeCard title={recipe.title} image={recipe.image} description={recipe.instructions} />)

  return (
    <section>
        <Form>
        <fieldset>
    <Form.Group  style={{paddingTop:"40px"}} as={Row} onChange={handleChange}>
      <Col sm={12}>
        <Form.Check 
          type="radio"
          label="first radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
          value="1"
        />
        <Form.Check 
          type="radio"
          label="second radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
          value="2"
        />
        <Form.Check 
          type="radio"
          label="third radio"
          name="formHorizontalRadios"
          id="formHorizontalRadios3"
          value="3"
        />
      </Col>
    </Form.Group>
  </fieldset>
  <Button onClick={handleSubmit} variant="primary" type="submit">
    Submit
  </Button>
        </Form>
      <br />
      <h1>Favourites</h1>
      <CardGroup>
        {favourites}
      </CardGroup>
    </section>
  );
}

