import {Card,Button} from "react-bootstrap"
import axios from "axios"
import {useState} from "react";
import "./RecipeCard.scss";


 export default function RecipeCard (props) {
  const [instructions,setInstructions] = useState([]);
  const [ingredients,setIngredients] = useState([]);
  const [showInstructions,setShowInstructions] = useState(false);
  const [heart,setHeart] = useState("")

  function handleSubmit(event){
    event.preventDefault();
    if(!showInstructions){
      const id = event.target.value
    axios({
      method: 'POST',
      url:`/api/recipe/:${id}`,
      data:{
       id
      }
    })
      .then(({
       data
      }) => {
       
         setInstructions(data.instructions.instructions)
         setIngredients(data.ingredients.ingredients)
        //  console.log(data)
      })
      .catch((err) => console.log(err));
      setShowInstructions(true);
    }else{
      setShowInstructions(false);
    }
  }
 

  const ingredientsWithAmount= ingredients.map((ingredient)=>{
    return<div><p>
     {ingredient.name} - {(Math.round(ingredient.amount.us.value * 100)/100)}: {ingredient.amount.us.unit}</p></div> 
    
  })
  return (
    <Card>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        {showInstructions && 
        <div>
        <Card.Text>
        <h4>Ingredients</h4>
           {ingredientsWithAmount} 
        </Card.Text>
        <Card.Text>
          <h4>Cooking Instructions</h4>
         {instructions}  
        </Card.Text>
        </div>}
        <div className="card-bottom">
          <Button variant="primary" type="submit" onClick={handleSubmit} value={props.id} >View Recipe</Button>
          <div className="heart-container">
            <i className="fas fa-heart"></i>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
