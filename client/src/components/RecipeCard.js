import {Card,Button} from "react-bootstrap"
import axios from "axios"
import {useState,useContext} from "react";
import "./RecipeCard.scss";
import {AuthContext} from "../context/authContext";


 export default function RecipeCard (props) {
   console.log(props)
  const [instructions,setInstructions] = useState("");
  const [ingredients,setIngredients] = useState([]);
  const [showInstructions,setShowInstructions] = useState(false);
  const [userFav,setUserFav] = useState(false);
  const {user} = useContext(AuthContext)
  
// to get instructions and ingredients from api
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
 
  function handleClick(event){
    event.preventDefault();
    axios.post(`/api/favorites`,
    {name:props.title,
      image:props.image,
      ingredients,
      instructions,
      api_id:props.id,
     userFav,
     userId:user.id},
    {headers: {"x-auth-token": localStorage.getItem("token")}})
    
      .then(({
       data
      }) => {
          console.log(data)
      })
      .catch((err) => console.log(err));
    setUserFav(!userFav)
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
          {showInstructions && 
          <div className="heart-container">
            <button type="submit" onClick={handleClick} style={{ border: "none",backgroundColor: "Transparent"}}>{userFav?<i class="fas fa-heart" style={{color:"red"}}></i>:<i class="far fa-heart" style={{color:"red"}}></i>}</button>
          </div>}
        </div>
      </Card.Body>
    </Card>
  );
}
