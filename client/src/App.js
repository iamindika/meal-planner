import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Heading from "./components/Heading";
import Favourites from './components/Favourites';
import Profile from "./components/Profile";
import RecipeForm from "./components/RecipeForm";
import Login from "./components/Login";
import Register from "./components/Register";
import Search from "./components/Search"
import LocalRecipes from "./components/LocalRecipes"
import LocalSchedule  from "./components/LocalSchedule"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ViewProfile from './components/ViewProfile';

const App = () => {
  return(
 <div className="App">
   <Router>
  <Heading />
  <Switch>
          <Route path="/"  exact component={Favourites} />
          <Route path="/register" component={Register} />
          <Route path="/login"  component={Login} />
          <Route path="/new/profile" component={Profile} />
          <Route path="/new" component={RecipeForm} />
          <Route path="/search" component={Search} />
          <Route path="/recipes" component={LocalRecipes} />
          <Route path="/profile" component={ViewProfile} />
          <Route path="/schedule" component={LocalSchedule} />
          </Switch>
          </Router>
          
</div >
  )};

export default App;
