import { useEffect, useState } from "react";
import axios from "axios";
import CardGroup from 'react-bootstrap/CardGroup';
import RecipeCard from './RecipeCard'
import "./Favourites.scss";


export default function Favourites(props) {

  const [favs, setFavs] = useState([]);
  
  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/recipes',
    })
      .then((
        response
      ) => {
      console.log(response.data)
      setFavs(response.data)
      })
      .catch((err) => console.log(err));
  }, []);
 const favourites = favs.map((recipe)=> <RecipeCard title={recipe.recipe.recipeName} image={ recipe.recipe.recipeImage}/>
)
  
  return (
    <section>
      <h1>Favourites</h1>
      <CardGroup>
       {favourites}
         
      </CardGroup>
    </section>
  );
}

