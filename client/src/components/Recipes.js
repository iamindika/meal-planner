import React from "react";
import CardGroup from 'react-bootstrap/CardGroup'

import LocalRecipeCard from './LocalRecipeCard'
import "./Favourites.scss";

import useLocalRecipesData from "../hooks/useLocalRecipesData";

export default function Favourites (props) {
  const { state, dispatch } = useLocalRecipesData();
  const recipeList = state.recipes.map((recipe) => (<LocalRecipeCard key={recipe.id} id={recipe.id} name={recipe.name} image={recipe.image} instructions={recipe.instructions}>  {recipe.name} </LocalRecipeCard>));

  
  return (
    <section>
      <h1> Recipes </h1>
      {/* <ul> {recipeList} </ul> */}
      <CardGroup>

        {recipeList}

      </CardGroup>
    </section>
  );
}
