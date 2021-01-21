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
    <NavLink id="RouterNavLink" style={{color:"white",padding:"10px"}} to="/register">Register</NavLink>
      <NavLink id="RouterNavLink" style={{color:"white",padding:"10px"}} to="/login">Login</NavLink>
      <NavLink id="RouterNavLink" style={{color:"white",padding:"10px"}} to="/new/profile">Profile</NavLink>
      <NavLink id="RouterNavLink" style={{color:"white"}} to="/new/recipe"><Button variant="secondary">Create New Recipe</Button>{' '}</NavLink>
    </Nav>
  </Navbar.Collapse>
</Navbar>
</section>
)
}
  