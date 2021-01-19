import { useEffect, useState } from "react";
import axios from "axios";
import CardGroup from 'react-bootstrap/CardGroup';

import RecipeCard from './RecipeCard'
import "./Favourites.scss";
import Search from "./Search";


export default function Favourites() {

  const [favs, setFavs] = useState([]);
  

  // function handleSubmit(event) {
  //    event.preventDefault();
  //   //  console.log(value)
  //   axios({
  //     method: 'POST',
  //     url: '/api/search',
  //     data:{
  //       value
  //     }
  //   })
  //     .then(({
  //       data
  //     }) => {
  //       console.log(data)
  //     })
  //     .catch((err) => console.log(err));
  // }

  
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

