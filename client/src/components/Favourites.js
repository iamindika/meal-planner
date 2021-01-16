import React from "react";
import CardGroup from 'react-bootstrap/CardGroup'

import RecipeCard from './RecipeCard'

export default function Favourites (props) {
  
  
  return (
  <CardGroup>
    <RecipeCard />
    <RecipeCard />
    <RecipeCard />
    <RecipeCard />
    <RecipeCard />
    <RecipeCard />
  </CardGroup>
  );
}
