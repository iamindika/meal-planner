import React from "react";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import SmallRecipeCard from './SmallRecipeCard'

import "./Favourites.scss";


export default function LocalSchedule (props) {
  const [ breakfast, setbreakfast] = useState([]);
  const [lunch, setlunch] = useState([]);
  const [dinner, setdinner] = useState([]);
  const id = 1 // ***** hard coded for now!!!!! *****
  const WEEKDAYS = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
  useEffect(() => {
    axios.all([
      axios({
        method: 'GET',
        url: `/recipes/user/${id}/slot/1`,
      }),
      axios({
        method: 'GET',
        url: `/recipes/user/${id}/slot/2`,
      }),
      axios({
        method: 'GET',
        url: `/recipes/user/${id}/slot/3`,
      })
    ])
      .then(axios.spread((data1, data2, data3) => {
        // console.log("*** data1: ", data1)
        // console.log("*** data2: ", data2)
        // console.log("*** data3: ", data3)
        setbreakfast((prev) => [...prev, ...data1.data])
        setlunch((prev) => [...prev, ...data2.data])
        setdinner((prev) => [...prev, ...data3.data])
      }))
      .catch((err) => console.log(err));
  }, []);


  const getSpotRecipes = (array) => { 
    const arrayCopy = [...array];
    const fixedArray = Array.from({ length: 7 });
    // console.log("*** fixedArray inital: ", fixedArray);
    arrayCopy.forEach( (recipe, index) => {
      fixedArray[recipe.day-1] = recipe;
    })
    // console.log("*** fixedArray after fixing: ", fixedArray)
    return (
    fixedArray.map((recipe) => {
      if (recipe) { 
        console.log("recipe.recipe_id:", recipe.recipe_id)
        return (
      <td>
        <SmallRecipeCard key={recipe.recipe_id} recipeId={recipe.recipe_id} name={recipe.name} image={recipe.image} description={recipe.instructions} userId={id}/>
      </td>
          )
      } else {
        return (<td><i class="fas fa-plus-circle"></i></td>)
      }
    } 
     )
  )};

  return (
    <section>
      <h1> Schedule </h1>
      {/* <ul> {JSON.stringify(breakfast)} </ul> */}
      
    <Table responsive>
      <thead>
        <tr>
          <th></th>
          {WEEKDAYS.map((weekday, index) => (
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
          { getSpotRecipes(breakfast) }

        </tr>
        <tr>
          <td>Lunch</td>
          {/* {Array.from({ length: 7 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))} */}
          { getSpotRecipes(lunch) }

        </tr>
        <tr>
          <td>Dinner</td>
          {/* {Array.from({ length: 7 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))} */}
          { getSpotRecipes(dinner) }
        </tr>
      </tbody>
    </Table>

      {/* <CardGroup>

        {myRecipes}

      </CardGroup> */}
    </section>
  );
}
