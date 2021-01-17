import {
  NavLink
} from "react-router-dom";
import {Navbar,Nav,Button} from "react-bootstrap";

export default function Heading(){
  return (
    <section>
 <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="/"><NavLink style={{color:"white",padding:"10px"}} to="/" /><span>MP</span> Meal-Planner</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto"> 
    </Nav>
    <Nav>
    <NavLink style={{color:"white",padding:"10px"}} to="/register">Register</NavLink>
      <NavLink style={{color:"white",padding:"10px"}} to="/login">Login</NavLink>
      <NavLink style={{color:"white",padding:"10px"}} to="/profile">Profile</NavLink>
      <Button variant="secondary"><NavLink style={{color:"white"}} to="/new">Create New Recipe</NavLink></Button>{' '}
    </Nav>
  </Navbar.Collapse>
</Navbar>
</section>
)
}
  