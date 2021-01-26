import { useEffect, useContext, useState } from "react";
import axios from "axios";
import CardGroup from 'react-bootstrap/CardGroup';
import LocalRecipeCard from "./LocalRecipeCard";
import "./Favourites.scss";
import {AuthContext} from "../context/authContext";

export default function Favourites() {

  const { user } = useContext(AuthContext);
  
  const [favs, setFavs] = useState([]);
  const[removedFav,setRemovedFav] = useState({});
 
// getting favs of a particular user
    // console.log(`user id: ${user.id}`)
    
   useEffect(() => {
   axios.get(`/api/recipes/${user.id}`, 
      {headers: {"x-auth-token": localStorage.getItem("token")}}
    )
      .then((
        response
      ) => {
          console.log(response.data)
          setFavs(response.data)
      })
      .catch((err) => console.log(err));
   },[removedFav,user.id]);

// removing favs of a particular user
  function handleSubmit(id) {
    axios.post(`/api/favorites/remove`,
    {userId:user.id,id},
    {headers: {"x-auth-token": localStorage.getItem("token")}}
  )
      .then((
       response
      ) => {
      setRemovedFav({...response.data})
      })
      .catch((err) => console.log(err));
  }

   const favourites = favs.map((recipe) =><LocalRecipeCard key={recipe.recipe.recipeId} name={recipe.recipe.recipeName} image={recipe.recipe.recipeImage} instructions={recipe.recipe.recipeInstructions} ingredients={recipe.ingredients} onSubmit={handleSubmit} value={recipe.recipe.recipeId} />
  )

  return (
    <section>
      <h1>Favourites<i class="fas fa-heart" style={{color:"red"}}></i></h1>
          <CardGroup >
         {favourites} 
      </CardGroup>    
    </section>
  );
}

