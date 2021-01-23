import { useEffect, useState } from "react";
import axios from "axios";
import CardGroup from 'react-bootstrap/CardGroup';
import LocalRecipeCard from "./LocalRecipeCard";
import "./Favourites.scss";


export default function Favourites(props) {

  const [showInstructions,setShowInstructions] = useState(false);
  const [userFav,setUserFav] = useState(false)
  
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

  function handleClick(event) {
    event.preventDefault();
    setShowInstructions(!showInstructions);
    // console.log("clickee")

  }

  function handleSubmit(id) {
    axios({
      method: 'POST',
      url: `api/favorites/remove`,
      data: {
        id
      }
    })
      .then(({
        data
      }) => {
        console.log(data)
      })
      .catch((err) => console.log(err));
  }

  const favourites = favs.map((recipe) =><LocalRecipeCard name={recipe.recipe.recipeName} image={recipe.recipe.recipeImage} instructions={recipe.recipe.recipeInstructions} ingredients={recipe.ingredients} onClick={handleClick} onSubmit={handleSubmit} value={recipe.recipe.recipeId} />
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

