import {Image,Col,Button} from "react-bootstrap"

export default function ViewProfile(){

  
  return <Col md={{ span: 3, offset: 4 }}><section><h3>PROFILE</h3>
      <Image style={{textAlign:"center"}} src="https://cdn.dribbble.com/users/1070859/screenshots/5869416/gal-_dribbble__still_2x.gif?compress=1&resize=200x200" roundedCircle />

    <p><strong>On this Page you find your information about your prefernces</strong></p>
    <h5><strong>Diet</strong>: Vegetarian</h5>
   <h5><strong>Favorite Ingredients</strong>: Bacon, Steak</h5>
   <h5><strong>Avoidances</strong>: Tree Nut</h5>  
   <Button variant="primary" type="submit">
         Edit
        </Button>
 </section> </Col>
}