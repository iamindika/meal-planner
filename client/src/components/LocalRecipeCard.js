import {useState} from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import "./LocalRecipeCard.scss";

export default function LocalRecipeCard (props) {
  const [showInstructions, setShowInstructions] = useState(true);
  const [userFav, setUserFav] = useState(false);
  console.log(props)
  
  const ingredientsWithAmount= props.ingredients.map((ingredient)=>{
    return<div><p>
     {ingredient.name} - {ingredient.quantity}: {ingredient.unit}</p></div> 
  })
  function handleClick(){
    setShowInstructions(!showInstructions)
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
        </Card.Text></div>}
        <div class="card-bottom">
          <Button variant="primary" onClick={handleClick}>View Recipe</Button>
          <div class="heart-container">
            <button type="submit" value={props.value} onClick={()=>{
              props.onSubmit(props.value)
              setUserFav(!userFav)
              }}  style={{ border: "none",backgroundColor: "Transparent"}} >{userFav?<i class="fas fa-heart" style={{color:"red"}}></i>:<i class="far fa-heart" style={{color:"red"}}></i>}</button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
