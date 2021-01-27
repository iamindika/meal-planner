import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from "axios";
import { useState, useEffect } from "react";

import "./SmallRecipeCard.scss";

export default function SmallRecipeCard (props) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  // console.log("SmallRecipeCard props:", props);
  
  const [removed, setRemoved ] = useState({ 
    userId: props.userId,
    recipeId: props.recipeId,
    name: props.name,
    image: props.image,
    instructions: props.instructions,
    day: props.day, 
    time_slot: props.time_slot
  })

  useEffect(() => {
    axios({
      method: 'GET',
      url: `/ingredients/recipe/${props.recipeId}`,
    })
      .then((
        response
      ) => {
        // console.log(response.data)
        setIngredients([...response.data])
      })
      .catch((err) => console.log(err));
  }, []);

  let ingredientsWithAmount=[]
  if(ingredients.length) {
    // console.log("**** ingredients: ", ingredients)
    ingredientsWithAmount = ingredients.map((ingredient)=>{
      return<Card.Text key={ingredient.id} >
       {ingredient.name} - {Math.round(ingredient.quantity * 100) / 100} {ingredient.unit}</Card.Text>
    })
  }
  // console.log("ingredientsWithAmount: ", ingredientsWithAmount);

  function handleClick(){
    setShowInstructions(!showInstructions)
  }

  function handleClickRemove(event){
    event.preventDefault();
    // console.log("removed: ", removed)
    axios({
      method: 'POST',
      url:`/recipes/${props.recipeId}/user/${props.userId}/remove`,
      data:{ }
    })
      .then((
       data
      ) => {
          console.log("handleClick data IN SMALLRECIPECARD: ", data)
          console.log("^^^ removed: ", removed)
          if(props.onSuccess) {
            props.onSuccess(removed);
          };
      })
      .catch((err) => console.log(err));
  
  }
  
  return (
    <Card className="small">
      <Card.Img  src={props.image} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        {showInstructions &&
        <div className="ing-inst">
          {ingredientsWithAmount}
        <Card.Text>
          {props.instructions}
        </Card.Text>
        </div>}
        <div className="card-bottom-small">
          <div className="button-container">
            <Button variant="primary" style={{backgroundColor:'#4B7DFE'}} onClick={handleClick}>{!showInstructions? "View Recipe" : "Collapse"}</Button>
          </div>
          <div className="minus-circle-container">
            <button type="submit" onClick={handleClickRemove} style={{ border: "none",backgroundColor: "Transparent"}}>
              <i className="fas fa-minus-circle" style={{color:"red"}}></i>
            </button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
