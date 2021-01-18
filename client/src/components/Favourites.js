import {useEffect, useState} from "react";
import axios from "axios";
import CardGroup from 'react-bootstrap/CardGroup';
import response from "../responseData.json";

import RecipeCard from './RecipeCard'
import "./Favourites.scss";

export default function Favourites () {

  const [favs,setFavs] = useState([]);

  useEffect(() => {
    setFavs(response);
}, []);

const favourites = favs.map((recipe)=> <RecipeCard title={recipe.title} image={recipe.image}/>)

  return (
    <section>
      <h1>Favourites</h1>
      <CardGroup>
        {favourites}
      </CardGroup>
    </section>
  );
}

