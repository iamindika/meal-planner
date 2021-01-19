import axios from "axios"
import React, {useState, useEffect} from "react";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import "./RecipeCard.scss";

export default function RecipeCard (props) {
  // console.log(props)
  // const [value, setValue] = useState();
  // const [results, setSearchResults] = useState("");
  // // console.log(props)
  // function handleClick(event){
  //   event.preventDefault();
  //   //  console.log(value)
  //   axios({
  //     method: 'POST',
  //     url: '/api/recipe/:id',
  //     data:{
  //       value
  //     }
  //   })
  //     .then(({
  //      data
  //     }) => {
  //       var json = JSON.parse(data);
  //       setSearchResults(json.results)
  //     })
  //     .catch((err) => console.log(err));
  // }
  
  return (
    <Card>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
         {props.description}
        </Card.Text>
        <div class="card-bottom">
          <Button variant="primary" >View Recipe</Button>
          <div class="heart-container">
            <i class="fas fa-heart"></i>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
