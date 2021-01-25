import React, { useEffect, useState, useMemo } from "react";
import { Table, Form  } from "react-bootstrap";
import axios from "axios";
import SmallRecipeCard from './SmallRecipeCard'

import "./Favourites.scss";
import { Prev } from "react-bootstrap/esm/PageItem";


export default function LocalSchedule (props) {
  const [ breakfast, setBreakfast] = useState([]);
  // console.log(">>>>breakfast: ", breakfast);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [freeRecipes, setFreeRecipes] = useState([]);
  const [freeRecipeNames, setFreeRecipeNames] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState();
  const id = 1 // ***** hard coded for now!!!!! *****
  let selRecipe;
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
      }),
      axios({
        method: 'GET',
        url: `/recipes/user/${id}/free`,
      })
    ])
      .then(axios.spread((data1, data2, data3, data4) => {
        // console.log("*** data1: ", data1)
        // console.log("*** data2: ", data2)
        // console.log("*** data3: ", data3)
        // console.log("*** data4: ", data4)

        const breakfastArray = new Array(7).fill(null);
        data1.data.forEach((item) => {
          if (item.day) {
            breakfastArray[item.day - 1] = item
          }
        })
        // console.log("VVVBreakfastArray: ", breakfastArray)
        setBreakfast(breakfastArray);
        const lunchArray = new Array(7).fill(null);
        data2.data.forEach((item) => {
          if (item.day) {
            lunchArray[item.day - 1] = item
          }
        })
        // console.log("VVVlunchArray: ", lunchArray)
        setLunch(lunchArray);

        const dinnerArray = new Array(7).fill(null);
        data3.data.forEach((item) => {
          if (item.day) {
            dinnerArray[item.day - 1] = item
          }
        })
        // console.log("VVVdinnerArray: ", dinnerArray)
        setDinner(dinnerArray);

        setFreeRecipes((prev) => [prev, ...data4.data]);
        const recipeNames = [];
        data4.data.forEach((item) => {
          recipeNames.push(item.name);
        })
        // console.log("freeRecipes: ", freeRecipes);
        // console.log("recipeNames: ", recipeNames);
        setFreeRecipeNames(prev => [prev, ...recipeNames]); //may not need this one.
        // setFreeRecipeNames(recipeNames);
        // console.log("freeRecipeNames: ", freeRecipeNames);
        
        // setLunch((prev) => [...prev, ...data2.data])
        // setDinner((prev) => [...prev, ...data3.data])
      }))
      .catch((err) => console.log(err));
  }, []);



  function handleClickAdd(day, timeSlot){
    // event.preventDefault();
    console.log('handleClickAdd selRecipe: ', selRecipe)
    if(selRecipe) {
      console.log("you called axios in handleClickAdd")
      axios({
        method: 'POST',
        url:`/recipes/${selRecipe}/user/${id}/add`,
        data:{ day, timeSlot }
      })
        .then(({
         data
        }) => {
            console.log("handleClickAdd data: ", data)
        })
        .catch((err) => console.log(err));
    }
  
  }
  
  // console.log(WEEKDAYS.map((day, index) => {
  //   if (breakfast[index] && index === breakfast[index].day ) {
  //     return breakfast[index]
  //   }
      
  //   // return breakfast.forEach(item => {
  //   //   // console.log("item", item)
  //   //    if (item.day === index) {
  //   //     return item
  //   //   }
  //   //   return "hello"
  //   // })  
  // }))

  const handleRemove = position => {
    // take item and find it on state and remove it from state (a copy of state remove that item from copy set state to that copy)
    // console.log("---position.day: ", position.day);
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
    setFreeRecipeNames(prev => [...prev, position.name])
    setFreeRecipes(prev => [...prev, {recipe_id: position.recipeId, name: position.name, user_id: position.userId}]);
    // {recipe_id: 1, name: "Breakfast Dish 1", user_id: 1}
  }

  const updateVal = (e) => {
    selRecipe = e.target.value;
    // setSelectedRecipe(e.target.value); 
    console.log('vvvv updateVal selRecipe', selRecipe);
    return selRecipe;
    // console.log('vvvv setSelectedRecipe', selectedRecipe); 
    
  
};
  
  const getSpotRecipes = (array, timeSlot) => { 
    // const arrayCopy = [...array];
    // const fixedArray = Array.from({ length: 7 });
    // // console.log("*** fixedArray inital: ", fixedArray);
    // arrayCopy.forEach( (recipe, index) => {
      //   fixedArray[recipe.day-1] = recipe;
      // })
      
      // console.log("*** fixedArray after fixing: ", fixedArray)
      // console.log("*** freeRecipeNames: ", freeRecipeNames)
      // console.log("@@@ freeRecipes: ", freeRecipes)
    
    return (
    array.map((day, index) => {
      if(day) {
          return (
              <td key={index}>
                <SmallRecipeCard key={index} recipeId={array[index].recipe_id} name={array[index].name} image={array[index].image} description={array[index].instructions} userId={id} onSuccess={handleRemove} day={array[index].day} time_slot={array[index].time_slot}/>
              </td>
          )
          } else {
            return (
                    <td key={index}>
                      
                      <Form key={index}>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Select recipe</Form.Label>
                      <Form.Control key={index} as="select" custom onChange={updateVal}>
                          {freeRecipes.map( recipe => {
                            return (<option key={recipe.recipe_id} value={recipe.recipe_id}>{recipe.name}</option>)
                            })
                          }
                      </Form.Control>
                      <button key={index} type="submit" onClick={() => handleClickAdd((index + 1), timeSlot)} style={{ border: "none",backgroundColor: "Transparent"}}>
                          <i class="fas fa-plus-circle"></i>
                      </button>
                      </Form.Group>
                      </Form>
          
                    </td>
                    
                    )

          }
      }
      ))
    //   if (recipe) { 
    //     console.log("recipe.recipe_id, index:", recipe.recipe_id, index)
    //     return (
    //   <td>
    //     <SmallRecipeCard key={recipe.recipe_id} recipeId={recipe.recipe_id} name={recipe.name} image={recipe.image} description={recipe.instructions} userId={id}/>
    //   </td>
    //       )
    //   } else {
    //     return (
    //       <td>
    //         <button type="submit" onClick={handleClickAdd()} style={{ border: "none",backgroundColor: "Transparent"}}>
    //             <i class="fas fa-plus-circle"></i>
    //         </button>
    //         <form>
    //         <Form.Group controlId="exampleForm.ControlSelect1">
    //         <Form.Label>Select recipe</Form.Label>
    //         <Form.Control as="select">
    //           {[<option>1</option>,
    //           <option>2</option>,
    //           <option>3</option>,
    //           <option>4</option>,
    //           <option>5</option>]}
    //         </Form.Control>
    //         </Form.Group>
    //         </form>

    //       </td>
          
    //       )
    //   }
    // } 
    //  ))
  };

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
          { getSpotRecipes(breakfast, 1) }

        </tr>
        <tr>
          <td>Lunch</td>
          {/* {Array.from({ length: 7 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))} */}
          { getSpotRecipes(lunch, 2) }

        </tr>
        <tr>
          <td>Dinner</td>
          {/* {Array.from({ length: 7 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))} */}
          { getSpotRecipes(dinner, 3) }
        </tr>
      </tbody>
    </Table>

      {/* <CardGroup>

        {myRecipes}

      </CardGroup> */}
    </section>
  );
}
