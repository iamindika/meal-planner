import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Navbar,Nav,Button} from "react-bootstrap";
import Profile from "./Profile";
import RecipeForm from "./RecipeForm";
import Login from "./Login";
import Register from "./Register";

export default function Heading(){
  return (
    <Router>
 <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="/"><span>MP</span> Meal-Planner</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto"> 
    </Nav>
    <Nav>
    <Link style={{color:"white",padding:"10px"}} to="/register">Register</Link>
      <Link style={{color:"white",padding:"10px"}} to="/login">Login</Link>
      <Link style={{color:"white",padding:"10px"}} to="/profile">Profile</Link>
      <Button variant="secondary"><Link style={{color:"white"}} to="/new">Create New Recipe</Link></Button>{' '}
    </Nav>
  </Navbar.Collapse>
</Navbar>
<Switch>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/new">
            <RecipeForm />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          </Switch>
</Router>
)
}
 