import { useEffect,useContext, useState } from "react"
import {Image,Col,Button} from "react-bootstrap";
import {AuthContext} from "../context/authContext";
import axios from "axios"

export default function ViewProfile(){
const {user} = useContext(AuthContext);
const [diet,setDiet] = useState([]);
const [avoidances, setAvoidances] = useState([]);
const [favs,setFavs] = useState([]);
//  console.log(user.id)
  useEffect(()=>{
    axios.get(`/profile/view/${user.id}`,
    {headers: {"x-auth-token": localStorage.getItem("token")}}
  )
    .then(({
     data
    }) => {
       setDiet(data[0].name);
      //  console.log(data[1].name,data[2])
       setAvoidances(data[1]);
       setFavs(data[2]);
    })
    .catch((err) => console.log(err));
  },[])

  const userAvoidances = avoidances.map((avoid)=>{
    return avoid.name
  });

  const userFavs = favs.map((fav)=>{
    return fav.name
  })

  return <Col md={{ span: 3, offset: 4 }}><section><h3>PROFILE</h3>
      <Image style={{textAlign:"center"}} src="https://cdn.dribbble.com/users/1070859/screenshots/5869416/gal-_dribbble__still_2x.gif?compress=1&resize=200x200" roundedCircle />

    <p><strong>On this Page you find your information about your prefernces</strong></p>
    <h5><strong>Diet</strong>:{diet}</h5>
   <h5><strong>Favorite Ingredients</strong>: {userFavs + ", "}</h5>
   <h5><strong>Avoidances</strong>:{userAvoidances + ", "}</h5>  
   <Button variant="primary" type="submit">
         Edit
        </Button>
 </section> </Col>
}