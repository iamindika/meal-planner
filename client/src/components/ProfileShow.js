import { Image, Col, Button} from "react-bootstrap";

export default function ProfileShow(props) {

  return (
    <Col md={{ span: 3, offset: 4 }}><section><h3 style={{color:"#26466D",fontFamily: "'Oxygen', sans-serif",margin:"30px",fontSize:"3em"}}><strong>Profile</strong></h3>
      <Image style={{textAlign:"center"}} src="https://cdn.dribbble.com/users/1070859/screenshots/5869416/gal-_dribbble__still_2x.gif?compress=1&resize=200x200" roundedCircle />
      <div style={{border:"solid #E5F1FF", borderRadius: "50px"}}>
       <h3 style={{color:"#26466D",fontFamily: "'Oxygen', sans-serif",margin:"30px",fontSize:"2em"}}>Welcome <strong>{props.user.firstName +" "+ props.user.lastName}!</strong> </h3> 

    <h5 style={{color:"#26466D",fontFamily: "'Oxygen', sans-serif",margin:"30px",fontSize:"1.5em"}}><strong>Diet</strong>: <span> {props.diet ? props.diet : "No Diet Preferences"}</span></h5>
   <h5 style={{color:"#26466D",fontFamily: "'Oxygen', sans-serif",margin:"30px",fontSize:"1.5em"}}><strong>Favourite Ingredients</strong>: <span>{props.favorites.length > 0 ? props.favorites.join(", ") : "No Favorites" }</span></h5>
   <h5 style={{color:"#26466D",fontFamily: "'Oxygen', sans-serif",margin:"30px",fontSize:"1.5em"}}><strong>Avoidances</strong>:  <span>{props.avoidances.length > 0 ? props.avoidances.join(", ") : "No Avoidances"}</span></h5>  </div> 
   
       
 </section> </Col>
  )
} 

{/* <Button variant="primary" size="lg" style={{backgroundColor:'#4B7DFE',margin:"30px"}} type="submit">
         Edit
</Button> */}