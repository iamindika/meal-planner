import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from "axios";
import { useState } from "react";

import "./SmallRecipeCard.scss";

export default function SmallRecipeCard (props) {
  const [removed, setRemoved ] = useState({})
  function handleClickRemove(event){
    event.preventDefault();
    axios({
      method: 'POST',
      url:`/recipes/${props.recipeId}/user/${props.userId}/remove`,
      data:{ }
    })
      .then(({
       data
      }) => {
          console.log("handleClick data: ", data)
          // setRemoved((prev) => {...prev, ...data});
      })
      .catch((err) => console.log(err));
  
  }
  
  return (
    <Card>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          {props.instructions}
        </Card.Text>
        <div class="card-bottom">
          <div class="button-container">
            <Button variant="primary">View Recipe</Button>
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
