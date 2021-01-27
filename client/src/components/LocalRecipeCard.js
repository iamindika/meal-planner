import {useState} from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import "./LocalRecipeCard.scss";

export default function LocalRecipeCard (props) {
  const [showInstructions, setShowInstructions] = useState(true);
  const [userFav, setUserFav] = useState(true);
  console.log(props)
  
  const ingredientsWithAmount= props.ingredients.map((ingredient)=>{
    return<div>
    {ingredient.quantity} {ingredient.unit} - {ingredient.name}</div> 
  })
  function handleClick(){
    setShowInstructions(!showInstructions)
  }

  return (
    <Card className="local">
      
      <Card.Img  className="local" variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        {showInstructions &&
       <div className="ing-inst">
      <Card.Text>
        <h3 style={{color:"#26466D"}}><strong>Ingredients</strong></h3>
          {ingredientsWithAmount}
        </Card.Text>
        <Card.Text>
          <h3 style={{color:"#26466D"}}><strong>Cooking Instructions</strong></h3>
          {props.instructions}
        </Card.Text></div>}
        
        <div class="card-bottom">
          <Button variant="primary" size="lg" style={{backgroundColor:'#4B7DFE',fontSize:"1.25em",borderRadius:"10px"}} onClick={handleClick}>{!showInstructions?"View Recipe":"Collapse"}</Button>
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
