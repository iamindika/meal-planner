import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {Navbar,Nav,Button} from "react-bootstrap";
import { AuthContext } from "../context/authContext"

export default function Heading(){
  const { user, setUser } = useContext(AuthContext);
  // useEffect(() => {}, [user]);

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem('token');
  }

  return (
    <section>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/"><NavLink style={{color:"white",padding:"10px"}} to="/" /><span>MEE</span> Meal Eat Easy</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              { !user ?
                <>
                  <NavLink id="RouterNavLink" style={{color:"white",padding:"10px"}} to="/register">Register</NavLink>
                  <NavLink id="RouterNavLink" style={{color:"white",padding:"10px"}} to="/">Login</NavLink>
                </> :
                <>
                  <NavLink id="RouterNavLink" style={{color:"white",padding:"10px"}} to="/new/profile">Profile</NavLink>
                  <NavLink id="RouterNavLink" style={{color:"white",padding:"10px"}} to="/search">Search</NavLink>
                  <NavLink id="RouterNavLink" style={{color:"white",padding:"10px"}} to="/favorites">Favourites</NavLink>
                  <NavLink id="RouterNavLink" style={{color:"white"}} to="/new"><Button variant="secondary">Create New Recipe</Button>{' '}</NavLink>
                  <Button variant="primary" onClick={handleLogOut}>Log Out</Button>
                </>
              }
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </section>
  )
}
  