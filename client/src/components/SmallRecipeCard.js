import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import axios from "axios";

import "./SmallRecipeCard.scss";

export default function LocalRecipeCard (props) {
  
  // function handleClick(event){
  //   event.preventDefault();
  //   axios({
  //     method: 'POST',
  //     url:`/recipe/${props.recipe.id}/user/${props.userId}`,
  //     data:{
  //       name:props.title,
  //       image:props.image,
  //       ingredients,
  //       instructions,
  //      userFav
  //     }
  //   })
  //     .then(({
  //      data
  //     }) => {
  //         console.log(data)
  //     })
  //     .catch((err) => console.log(err));
  //   setUserFav(!userFav)
  // }
  
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
            {/* <button type="submit" onClick={handleClick} style={{ border: "none",backgroundColor: "Transparent"}}> */}
              <i class="fas fa-minus-circle"></i>
            {/* </button> */}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
