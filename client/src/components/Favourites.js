import React from "react";
import CardGroup from 'react-bootstrap/CardGroup'

import RecipeCard from './RecipeCard'
import "./Favourites.scss";

export default function Favourites (props) {
  

  
  return (
    <section>
      <h1>Favourites</h1>
      <CardGroup>
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </CardGroup>
    </section>
  );
}
