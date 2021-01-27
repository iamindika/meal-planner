import { Image, Col, Button} from "react-bootstrap";

export default function ProfileShow(props) {

  return (
    <Col md={{ span: 3, offset: 4 }}>
      <section>
        <h3>PROFILE</h3>
        <Image style={{textAlign:"center"}} src="https://cdn.dribbble.com/users/1070859/screenshots/5869416/gal-_dribbble__still_2x.gif?compress=1&resize=200x200" roundedCircle />
        <h3>Welcome <strong>{props.user.firstName +" "+ props.user.lastName}!</strong> </h3> 
        <p><strong>On this Page you find your information about your preferences</strong></p>
        <h5><strong>Diet</strong>: {props.diet ? props.diet : "No Diet Preferences"}</h5>
        <h5><strong>Favorite Ingredients</strong>:{props.favorites.length > 0 ? props.favorites.join(", ") : "No Favorites"}</h5>
        <h5><strong>Avoidances</strong>:{props.avoidances.length > 0 ? props.avoidances.join(", ") : "No Avoidances"}</h5>  
        <Button>Edit</Button>
      </section> 
    </Col>
  )
} 

// href="/new/profile"