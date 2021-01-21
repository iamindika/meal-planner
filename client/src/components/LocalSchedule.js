import React from "react";
import CardGroup from 'react-bootstrap/CardGroup'
import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from './RecipeCard';

// import LocalRecipeCard from './LocalRecipeCard'
import "./Favourites.scss";


export default function LocalSchedule (props) {
  const [userRecipes, setUserRecipes] = useState([]);
  const id = 1 // hard coded for now..
  useEffect(() => {
    axios({
      method: 'GET',
      url: `/recipes/user/${id}`,
    })
      .then(({
        data
      }) => {
        console.log("*** data: ", data)
        setUserRecipes((prev) => [...prev, ...data])
      })
      .catch((err) => console.log(err));
  }, []);

  const myRecipes = userRecipes.map((recipe) => <RecipeCard key={recipe.id}  title={recipe.name} image={recipe.image} description={recipe.instructions} />)

  return (
    <section>
      <h1> User Recipes </h1>
      {/* <ul> {JSON.stringify(userRecipes)} </ul> */}
      <CardGroup>

        {myRecipes}

      </CardGroup>
    </section>
  );
}
