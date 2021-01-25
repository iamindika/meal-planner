import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from "axios";
import { useState } from "react";

import "./SmallRecipeCard.scss";

export default function SmallRecipeCard (props) {
  const [showInstructions, setShowInstructions] = useState(true);
  console.log("SmallRecipeCard props:", props);
  
  const [removed, setRemoved ] = useState({ 
    time_slot: props.time_slot, 
    day: props.day, 
    name: props.name,
    recipeId: props.recipeId,
    userId: props.userId
  })
  // const ingredientsWithAmount= props.ingredients.map((ingredient)=>{
  //   return<div><p>
  //    {ingredient.name} - {ingredient.quantity}: {ingredient.unit}</p></div> 
  // })
  const ingredientsWithAmount=[]

  function handleClick(){
    setShowInstructions(!showInstructions)
  }

  function handleClickRemove(event){
    event.preventDefault();
    // setRemoved(prev => props.recipeId);
    console.log("removed: ", removed)
    axios({
      method: 'POST',
      url:`/recipes/${props.recipeId}/user/${props.userId}/remove`,
      data:{ }
    })
      .then((
       data
      ) => {
          console.log("handleClick data: ", data)
          
          if(props.onSuccess) {
            props.onSuccess(removed);
          };
      })
      .catch((err) => console.log(err));
  
  }
  
  return (
    <Card>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        {showInstructions &&
        <div>
        <Card.Text>
          {ingredientsWithAmount}
        </Card.Text>
        <Card.Text>
          {props.instructions}
        </Card.Text>
        </div>}
        <div class="card-bottom">
          <div class="button-container">
            <Button variant="primary" onClick={handleClick}>View Recipe</Button>
          </div>
          <div class="minus-circle-container">
            <button type="submit" onClick={handleClickRemove} style={{ border: "none",backgroundColor: "Transparent"}}>
              <i class="fas fa-minus-circle"></i>
            </button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
