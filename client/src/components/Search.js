import {useState,useContext} from "react";
import axios from "axios";
import {Form,Button,Col,CardGroup} from "react-bootstrap"
import RecipeCard from "./RecipeCard";
import {AuthContext} from "../context/authContext";


export default function Search(){
  const [value,setValue] = useState();
  const [searchResults,setSearchResults] = useState([])
  const {user} = useContext(AuthContext);

  function handleSubmit(event){
  
    event.preventDefault();
    //  console.log(value)
    axios.post(`/api/search`,
    {value,userId:user.id},
    {headers: {"x-auth-token": localStorage.getItem("token")}})
      .then(({
       data
      }) => {
        var json = JSON.parse(data);
      //  console.log(json.results)
       setSearchResults(json.results)
      })
      .catch((err) => console.log(err));
  }

  function handleChange(event) {
   setValue(event.target.value)
  }

  
  const finalResults = searchResults.map((result)=>{
    return <RecipeCard  id={result.id} key={result.id} title={result.title} image={"https://spoonacular.com/recipeImages/" + result.image} description={result.sourceUrl} />
  })


  return <div>
   <Col md={{ span: 4, offset: 4 }} xs={2}>
  <Form onSubmit={handleSubmit} role="form" style={{paddingTop:"40px"}}>
  <Form.Control  style={{paddingTop:"10px"}}
                type="text"
                name="search"
                value={value}
                onChange={handleChange}
              />
    <br />
    <Button type="submit">Search</Button>
  </Form>
  <h1>Search results</h1>
      <CardGroup>
         {finalResults}  
      </CardGroup>
  </Col>
</div>
}

