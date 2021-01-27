import React, { useEffect, useState, useContext } from "react";
import { Table, Form  } from "react-bootstrap";
import axios from "axios";
import SmallRecipeCard from './SmallRecipeCard'

import "./LocalSchedule.scss";
import { AuthContext } from "../context/authContext";

export default function LocalSchedule (props) {

  const { user } = useContext(AuthContext);
  const [ breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [freeRecipes, setFreeRecipes] = useState([]);
  let selRecipe;
  let recipeToAdd = {};
  const WEEKDAYS = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
  useEffect(() => {
    if(user) {
    axios.all([
      axios({
        method: 'GET',
        url: `/recipes/user/${user.id}/slot/1`,
      }),
      axios({
        method: 'GET',
        url: `/recipes/user/${user.id}/slot/2`,
      }),
      axios({
        method: 'GET',
        url: `/recipes/user/${user.id}/slot/3`,
      }),
      axios({
        method: 'GET',
        url: `/recipes/user/${user.id}/free`,
      })
    ])
      .then(axios.spread((data1, data2, data3, data4) => {

        const breakfastArray = new Array(7).fill(null);
        data1.data.forEach((item) => {
          if (item.day) {
            breakfastArray[item.day - 1] = item
          }
        });
        setBreakfast(breakfastArray);

        const lunchArray = new Array(7).fill(null);
        data2.data.forEach((item) => {
          if (item.day) {
            lunchArray[item.day - 1] = item
          }
        });
        setLunch(lunchArray);

        const dinnerArray = new Array(7).fill(null);
        data3.data.forEach((item) => {
          if (item.day) {
            dinnerArray[item.day - 1] = item
          }
        });
        setDinner(dinnerArray);

        setFreeRecipes((prev) => [prev, ...data4.data]);
        const recipeNames = [];
        data4.data.forEach((item) => {
          recipeNames.push(item.name);
        })
      }))
      .catch((err) => console.log(err));
    }
  }, []);
    
  function handleClickAdd(event, day, timeSlot){
    event.preventDefault();
    if(selRecipe && user) {
      axios({
        method: 'POST',
        url:`/recipes/${selRecipe}/user/${user.id}/add`,
        data:{ day, timeSlot }
      })
        .then(({
         data
        }) => {
            freeRecipes.forEach( recipe => {
              if(recipe.recipe_id == selRecipe) {
                recipeToAdd = recipe;
                recipeToAdd.time_slot = timeSlot;
                recipeToAdd.day = day;
              }
            });
              if (timeSlot === 1) {
                const array = [...breakfast]
                array[day - 1] = recipeToAdd;
                setBreakfast(array);
              } else if (timeSlot === 2) {
                const array = [...lunch]
                array[day - 1] = recipeToAdd;
                setLunch(array);
              } else if (timeSlot === 3) {
                const array = [...dinner]
                array[day - 1] = recipeToAdd;
                setDinner(array); 
              }
              // remove added dish from freeRecipeNames
              const arrayCopy = [ ...freeRecipes]
              const index = arrayCopy.indexOf(recipeToAdd)
              if (index !== -1) {
                arrayCopy.splice(index, 1);
                setFreeRecipes(arrayCopy);
              }
        })
        .catch((err) => console.log(err));
    }
  }
  
  const handleRemove = position => {
    // take item, find it on state and remove it (using a copy)
    if (position.time_slot === 1) {
      const array = [...breakfast]
      array[position.day - 1] = null;
      setBreakfast(array);
    } else if (position.time_slot === 2) {
      const array = [...lunch]
      array[position.day - 1] = null;
      setLunch(array);
    } else if (position.time_slot === 3) {
      const array = [...dinner]
      array[position.day - 1] = null;
      setDinner(array); 
    }
    // add removed dish to freeRecipeNames
    setFreeRecipes(prev => [...prev, {user_id: position.userId, recipe_id: position.recipeId, name: position.name, image: position.image, instructions: position.instructions, day: null, time_slot: null}]);
  }

  const updateVal = (e) => {
    selRecipe = e.target.value;
    return selRecipe;
};
  
  const getSpotRecipes = (array, timeSlot) => { 
    return (
    array.map((day, index) => {
      if(day) {
          return (
              <td key={`td-${index}`} className="recipe-slot">
                <SmallRecipeCard key={`src-${index}`} recipeId={array[index].recipe_id} name={array[index].name} image={array[index].image} instructions={array[index].instructions} userId={user.id} onSuccess={handleRemove} day={array[index].day} time_slot={array[index].time_slot}/>
              </td>
          )
          } else {
            return (
                    <td key={`td-${index}`} className="recipe-slot">
                      
                      <Form key={`form-${index}`}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label style={{color:"#26466D",fontFamily: "'Oxygen', sans-serif"}}>Select recipe</Form.Label>
                      <Form.Control key={`fcontrol-${index}`} as="select" custom onChange={updateVal}>
                          {freeRecipes.map( recipe => {
                            return (<option key={recipe.recipe_id} value={recipe.recipe_id}>{recipe.name}</option>)
                            })
                          }
                      </Form.Control>
                      <button key={`button-${index}`} type="submit" onClick={(event) => handleClickAdd(event, (index + 1), timeSlot)} style={{ border: "none",backgroundColor: "Transparent",color: "green",fontSize: "2rem"}}>
                      {/* <span style="font-size: 3rem;"> */}
                          <i className="fas fa-plus-circle" ></i>
                      {/* </span> */}
                      </button>
                      </Form.Group>
                      </Form>

                    </td>
                    
                    )

          }
      }
      ))
  };

  return (
    <section>
      <h1 style={{color:"#26466D",fontFamily: "'Oxygen', sans-serif",fontSize:"4em"}}> Schedule </h1>
      {/* <ul> {JSON.stringify(breakfast)} </ul> */}
      
    <Table responsive>
      <thead>
        <tr style={{color:"#26466D",fontFamily: "'Oxygen', sans-serif",fontSize:"2em"}}>
          <th></th>
          {WEEKDAYS.map((weekday, index) => (
            <th key={index}>{weekday}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{color:"#26466D",fontFamily: "'Oxygen', sans-serif",fontSize:"2em"}}><strong>Breakfast</strong></td>
          {/* {Array.from({ length: 7 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))} */}
          { user && getSpotRecipes(breakfast, 1) }

        </tr>
        <tr>
          <td style={{color:"#26466D",fontFamily: "'Oxygen', sans-serif",fontSize:"2em"}}><strong>Lunch</strong></td>
          {/* {Array.from({ length: 7 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))} */}
          { user && getSpotRecipes(lunch, 2) }

        </tr>
        <tr>
          <td style={{color:"#26466D",fontFamily: "'Oxygen', sans-serif",fontSize:"2em"}}><strong>Dinner</strong></td>
          {/* {Array.from({ length: 7 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))} */}
          { user && getSpotRecipes(dinner, 3) }
        </tr>
      </tbody>
    </Table>

      {/* <CardGroup>

        {myRecipes}

      </CardGroup> */}
    </section>
  );
}
