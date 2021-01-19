import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Heading from "./components/Heading";
import Favourites from './components/Favourites';
import Profile from "./components/Profile";
import RecipeForm from "./components/RecipeForm";
import Login from "./components/Login";
import Register from "./components/Register";
<<<<<<< HEAD
import Search from "./components/Search"
=======
import LocalRecipes from "./components/LocalRecipes"
>>>>>>> 4a151f78133e2ad76ed57658db2860d3224c36cb
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  return(
 <div className="App">
   <Router>
  <Heading />
  <Switch>
          <Route path="/"  exact component={Favourites} />
          <Route path="/register" component={Register} />
          <Route path="/login"  component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/new" component={RecipeForm} />
          <Route path="/search" component={Search} />
          <Route path="/recipes" component={LocalRecipes} />
          </Switch>
          </Router>
          
</div >
  )};

export default App;
