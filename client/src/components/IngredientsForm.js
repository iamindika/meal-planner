import {Form,Col,Button} from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";

export default function IngredientsForm(props){
  console.log(props);
  const [ingredients, setIngredients] = useState([{recipeId: props.recipeId, name: '', amount: 0, unit: '' }]);
  const [redirect, setRedirect] = useState(false);
  const [disabled, setDisabled] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    ingredients.forEach( ingredient => {
      console.log(ingredient)

        axios({
          method: 'POST',
          url: 'ingredients/new',
          data: ingredient
        })
        .then((response) => {
          console.log("* from axios first response:", response)
          return axios({
            method: 'POST',
            url: 'ingredients/recipe/new',
            data: { ...ingredient, "ingredientId": response.data.id}
          })
          .then((response) => {
            console.log("* from axios second response:", response)
          })
          .catch( err => console.log(err))
        })
        .catch( err => console.log(err))
     });
        // setDisabled(true)
        setRedirect(true); 
  }

  // When the "+" button is clicked, add a new row to enter a new ingredient data (name, amount, unit)
  function appendFormRow(event) {
    const newFormRow = {recipeId: props.recipeId, name: '', amount: 0, unit: '' }
    setIngredients(prev => ([...prev, newFormRow])); 
  }

  // Handle change for any input field when user types in it.
  const onIngredientChange = (index) => (e) => {
    setIngredients(ingredients => ingredients.map((ingredient, i) => { 
      if (i === index) {
        return {...ingredient, [e.target.name]: e.target.value}
      }
      return ingredient
    }) )
  }

  if (redirect) {
    return <Redirect to='/' />
  }
  return (
  <section>
    <Col md={{ span: 3, offset: 4 }} xs={2}>
      <Form>
        <div id="dynamicInput">
          {ingredients.map( (ingredient, index) => 
            <Form.Row key={index}>
              <Col>
              <Form.Group controlId={"name-" + index}>
                <Form.Control 
                  name="name"
                  type="text"
                  placeholder="Ingredient name"
                  disabled={disabled}
                  value={ingredient.name} 
                  onChange={onIngredientChange(index)}
                />
              </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId={"amount-" + index}>
                <Form.Control 
                  name="amount"
                  type="number"
                  placeholder="amount"
                  disabled={disabled}
                  value={ingredient.amount}
                  onChange={onIngredientChange(index)}  
                />
              </Form.Group>
              </Col>
              <Col>
              <Form.Group controlId={"unit-" + index}>
                <Form.Control 
                  name="unit"
                  type="text"
                  placeholder="unit" 
                  disabled={disabled}
                  value={ingredient.unit} 
                  onChange={onIngredientChange(index)}
                />
              </Form.Group>
              </Col>
            </Form.Row>
          )}
        </div>
        <div className="mb-2">
          <Button variant="primary" style={{backgroundColor:'#4B7DFE',margin:"10px"}} size="lg" onClick={appendFormRow}>
            +
          </Button>{' '}
        </div>
        <div className="mb-2">
          <Button 
            variant="primary" 
            style={{backgroundColor:'#4B7DFE',margin:"10px"}} 
            size="lg" 
            onClick={handleSubmit}
          >
            SAVE ALL
          </Button>
        </div>

      </Form>
    </Col>
  </section>

)}