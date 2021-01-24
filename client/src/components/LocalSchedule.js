import React, { useEffect, useState, useMemo } from "react";
import { Table, Form  } from "react-bootstrap";
import axios from "axios";
import SmallRecipeCard from './SmallRecipeCard'

import "./Favourites.scss";


export default function LocalSchedule (props) {
  const [ breakfast, setBreakfast] = useState([]);
  console.log(">>>>breakfast: ", breakfast)
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
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
      // axios({
      //   method: 'GET',
      //   url: `/recipes/user/${id}/free`,
      // })
    ])
      .then(axios.spread((data1, data2, data3) => {
        console.log("*** data1: ", data1)
        // console.log("*** data2: ", data2)
        // console.log("*** data3: ", data3)

        const breakfastArray = new Array(7).fill(null);
        data1.data.forEach((item) => {
          if (item.day) {
            breakfastArray[item.day - 1] = item
          }
        })
        console.log("VVVBreakfastArray: ", breakfastArray)
        setBreakfast(breakfastArray);
        const lunchArray = new Array(7).fill(null);
        data2.data.forEach((item) => {
          if (item.day) {
            lunchArray[item.day - 1] = item
          }
        })
        console.log("VVVlunchArray: ", lunchArray)
        setLunch(lunchArray);

        const dinnerArray = new Array(7).fill(null);
        data3.data.forEach((item) => {
          if (item.day) {
            dinnerArray[item.day - 1] = item
          }
        })
        console.log("VVVdinnerArray: ", dinnerArray)
        setDinner(dinnerArray);

        // setLunch((prev) => [...prev, ...data2.data])
        // setDinner((prev) => [...prev, ...data3.data])
      }))
      .catch((err) => console.log(err));
  }, []);

  function handleClickAdd(event){

    // event.preventDefault();
    // axios({
    //   method: 'POST',
    //   url:`/recipes/${props.recipeId}/user/${props.userId}/add`,
    //   data:{ }
    // })
    //   .then(({
    //    data
    //   }) => {
    //       console.log("handleClick data: ", data)
    //       // setRemoved((prev) => {...prev, ...data});
    //   })
    //   .catch((err) => console.log(err));
  
  }
  console.log(WEEKDAYS.map((day, index) => {
    if (breakfast[index] && index === breakfast[index].day ) {
      return breakfast[index]
    }
      
    // return breakfast.forEach(item => {
    //   // console.log("item", item)
    //    if (item.day === index) {
    //     return item
    //   }
    //   return "hello"
    // })  
  }))

  const handleRemove = position => {
    // take item and find it on state and remove it from state (a copy of state remove that item from copy set state to that copy)
    if (position[0] === 1) {
      const array = [...breakfast]
      array[position[1] - 1] = null;
      setBreakfast(array);
    } else if (position[0] === 2) {
      const array = [...lunch]
      array[position[1] - 1] = null;
      setLunch(array);
    } else if (position[0] === 3) {
      const array = [...dinner]
      array[position[1] - 1] = null;
      setDinner(array); 
    }
  }

  const getSpotRecipes = (array) => { 
    // const arrayCopy = [...array];
    // const fixedArray = Array.from({ length: 7 });
    // // console.log("*** fixedArray inital: ", fixedArray);
    // arrayCopy.forEach( (recipe, index) => {
    //   fixedArray[recipe.day-1] = recipe;
    // })

    // console.log("*** fixedArray after fixing: ", fixedArray)
    return (
    array.map((day, index) => {
      if(day) {
          return (
              <td>
                <SmallRecipeCard key={index} recipeId={array[index].recipe_id} name={array[index].name} image={array[index].image} description={array[index].instructions} userId={id} onSuccess={handleRemove} day={array[index].day} time_slot={array[index].time_slot}/>
              </td>
          )
          } else {
            return (
                    <td>
                      <button type="submit" onClick={handleClickAdd} style={{ border: "none",backgroundColor: "Transparent"}}>
                          <i class="fas fa-plus-circle"></i>
                      </button>
                      <form>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Select recipe</Form.Label>
                      <Form.Control as="select">
                        {[<option>1</option>,
                        <option>2</option>,
                        <option>3</option>,
                        <option>4</option>,
                        <option>5</option>]}
                      </Form.Control>
                      </Form.Group>
                      </form>
          
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
