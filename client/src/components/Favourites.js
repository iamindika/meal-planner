import { useEffect, useState, useContext } from "react";
import axios from "axios";
import CardGroup from 'react-bootstrap/CardGroup';
import LocalRecipeCard from "./LocalRecipeCard";
import {AuthContext} from "../context/authContext";
import "./Favourites.scss";


export default function Favourites() {

  const [favs, setFavs] = useState([]);
  const[removedFav,setRemovedFav] = useState({});
  const {user} = useContext(AuthContext);
// getting favs of a particular user
    // console.log(`user id: ${user.id}`)
  useEffect(() => {
    axios.get(`/api/recipes`,
  {headers: {"x-auth-token": localStorage.getItem("token")}}
)
      .then((
        response
      ) => {
        console.log(response.data)
        setFavs(response.data)
      })
      .catch((err) => console.log(err));
  }, [removedFav]);

// removing favs of a particular user
  function handleSubmit(id) {
    axios.post('/api/favorites/remove',
    {id},
    {headers: {"x-auth-token": localStorage.getItem("token")}}
  )
      .then((
       response
      ) => {
      setRemovedFav({...response.data})
      })
      .catch((err) => console.log(err));
  }

  const favourites = favs.map((recipe) =><LocalRecipeCard name={recipe.recipe.recipeName} image={recipe.recipe.recipeImage} instructions={recipe.recipe.recipeInstructions} ingredients={recipe.ingredients} onSubmit={handleSubmit} value={recipe.recipe.recipeId} />
  )

  return (
    <section>
      <h1>Favourites</h1>
          <CardGroup >
        {favourites}
      </CardGroup>
        
    </section>
  );
}

