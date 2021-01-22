import React from "react";
import { Table } from "react-bootstrap";
import CardGroup from 'react-bootstrap/CardGroup'
import { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from './RecipeCard';
import LocalRecipeCard from './LocalRecipeCard'

import "./Favourites.scss";


export default function LocalSchedule (props) {
  const [userRecipes, setUserRecipes] = useState([]);
  const id = 1 // hard coded for now..
  const weekdays = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
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

  // const myRecipes = userRecipes.map((recipe) => <LocalRecipeCard key={recipe.id}  name={recipe.name} image={recipe.image} description={recipe.instructions} />)

  return (
    <section>
      <h1> Schedule </h1>
      {/* <ul> {JSON.stringify(userRecipes)} </ul> */}
      
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          {weekdays.map((weekday, index) => (
            <th key={index}>{weekday}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Breakfast</td>
          {/* {Array.from({ length: 7 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))} */}
          <td>eggs</td>
          <td>eggs and bacon</td>
          <td>pancakes</td>
          <td>breakfast poutine</td>
          <td>cereal</td>
          <td>eggs</td>
          <td>English Breakfast</td>
        </tr>
        <tr>
          <td>Lunch</td>
          {Array.from({ length: 7 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          <td>Dinner</td>
          {Array.from({ length: 7 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
      </tbody>
    </Table>

      {/* <CardGroup>

        {myRecipes}

      </CardGroup> */}
    </section>
  );
}
