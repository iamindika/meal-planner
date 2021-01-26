import { useEffect,useContext, useState } from "react"
import {Image,Col,Button} from "react-bootstrap";
import {AuthContext} from "../context/authContext";
import axios from "axios"

export default function ViewProfile(){
const {user} = useContext(AuthContext);
const [diet,setDiet] = useState([]);
const [avoidances, setAvoidances] = useState([]);
const [favs,setFavs] = useState([]);
//  console.log(user)
  useEffect(()=>{
    axios.get(`/profile/view/${user.id}`,
    {headers: {"x-auth-token": localStorage.getItem("token")}}
  )
    .then(({
     data
    }) => {
        setDiet(data.diet.name);
       setAvoidances(data.avoidances);
        setFavs(data.favs);
    })
    .catch((err) => console.log(err));
  },[user.id])

  const userAvoidances = avoidances.map((avoid)=>{
    return avoid.name
  });

  const userFavs = favs.map((fav)=>{
    return fav.name
  })

  return <Col md={{ span: 3, offset: 4 }}><section><h3 style={{color:"#26466D",fontFamily: "'Oxygen', sans-serif",margin:"30px"}}><strong>Profile</strong></h3>
      <Image style={{textAlign:"center"}} src="https://cdn.dribbble.com/users/1070859/screenshots/5869416/gal-_dribbble__still_2x.gif?compress=1&resize=200x200" roundedCircle />
      <div style={{border:"solid #E5F1FF", borderRadius: "50px"}}>
       <h3 style={{color:"#26466D",fontFamily: "'Oxygen', sans-serif",margin:"30px"}}>Welcome <strong>{user.firstName +" "+ user.lastName}!</strong> </h3> 

    <h5 style={{color:"#26466D",fontFamily: "'Oxygen', sans-serif",margin:"30px"}}><strong>Diet</strong>: <span> {diet}</span></h5>
   <h5 style={{color:"#26466D",fontFamily: "'Oxygen', sans-serif",margin:"30px"}}><strong>Favourite Ingredients</strong>: <span>{userFavs.join(", ") }</span></h5>
   <h5 style={{color:"#26466D",fontFamily: "'Oxygen', sans-serif",margin:"30px"}}><strong>Avoidances</strong>:  <span>{userAvoidances.join(", ")}</span></h5>  </div> 
   <Button variant="primary" size="lg" style={{backgroundColor:'#4B7DFE',margin:"30px"}} type="submit">
         Edit
        </Button>
       
 </section> </Col>
}