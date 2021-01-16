import React from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

// import "./RecipeCard.scss";

export default function RecipeCard (props) {
  
  
  return (
    <Card style={{ minWidth: '30rem' }}>
    <Card.Img variant="top" src="images/recipe_sample.png" />
    <Card.Body>
      <Card.Title>Recipe Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the recipe title and make up the bulk of
        the card's content.
      </Card.Text>
      <div class="card-bottom">
        <Button variant="primary">View Recipe</Button>
        <div class="heart-container">
          <i class="fas fa-heart"></i>
        </div>
      </div>
    </Card.Body>
  </Card>
  );
}
