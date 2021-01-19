import { useEffect, useState } from "react";
import axios from "axios";
import CardGroup from 'react-bootstrap/CardGroup';
import RecipeCard from './RecipeCard'
import "./Favourites.scss";

export default function Favourites() {

  const [favs, setFavs] = useState([]);
  
  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/recipes',
    })
      .then(({
        data
      }) => {
        setFavs(data)
      })
      .catch((err) => console.log(err));
  }, []);

  const favourites = favs.map((recipe) => <RecipeCard title={recipe.title} image={recipe.image} description={recipe.instructions} />)

  return (
    <section>
      <h1>Favourites</h1>
      <CardGroup>
        {favourites}
      </CardGroup>
    </section>
  );
}

