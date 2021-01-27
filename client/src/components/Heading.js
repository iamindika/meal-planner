import { useContext } from "react";
import { NavLink } from "react-router-dom";
import {Navbar,Nav,Button} from "react-bootstrap";
import { AuthContext } from "../context/authContext";
import "./Heading.scss";

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
        <Navbar.Brand href="/"><NavLink style={{color:"white",padding:"10px"}} to="/" /><span><i class="fas fa-utensils fa-3x" style={{color:"#FFCC11"}}></i> <span style={{fontSize:"1.75em"}}><strong>M</strong>ake <strong>E</strong>at <strong>E</strong>asy</span></span></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              { !user ?
                <>
                  <NavLink id="RouterNavLink" style={{color:"white",padding:"10px",fontSize:"1.75em",fontFamily: "'Oxygen', sans-serif"}} to="/register">Register</NavLink>
                  <NavLink id="RouterNavLink" style={{color:"white",padding:"10px",fontSize:"1.75em",fontFamily: "'Oxygen', sans-serif"}} to="/">Login</NavLink>
                </> :
                <>
                  <NavLink id="RouterNavLink" style={{color:"white",padding:"10px",fontSize:"1.75em",fontFamily: "'Oxygen', sans-serif"}} to="/new/profile">Profile</NavLink>
                  <NavLink id="RouterNavLink" style={{color:"white",padding:"10px",fontSize:"1.75em",fontFamily: "'Oxygen', sans-serif"}} to="/search">Search</NavLink>
                  <NavLink id="RouterNavLink" style={{color:"white",padding:"10px",fontSize:"1.75em",fontFamily: "'Oxygen', sans-serif"}} to="/favorites">Favourites</NavLink>
                  <NavLink id="RouterNavLink" style={{color:"white",padding:"10px",fontSize:"1.75em",fontFamily: "'Oxygen', sans-serif"}} to="/schedule">Schedule</NavLink>
                  <NavLink id="RouterNavLink" style={{color:"white",padding:"10px",fontSize:"1.75em",fontFamily: "'Oxygen', sans-serif"}} to="/new">Create New Recipe</NavLink>
                  <Button variant="primary" size="sm" style={{backgroundColor:'#4B7DFE',fontSize:"1.75em",fontFamily: "'Oxygen', sans-serif",borderRadius:"10px"}} onClick={handleLogOut}>Log Out</Button>
                </>
              }
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    </section>
  )
}
  