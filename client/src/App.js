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
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return(
    <div className="App">
      <Router>
        <Heading />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/schedule" >
            <LocalSchedule />
          </PrivateRoute>
          <PrivateRoute path="/profile" >
            <Profile />
          </PrivateRoute>
          <PrivateRoute path="/search" >
            <Search />
          </PrivateRoute>
          <PrivateRoute path="/favorites" >
            <Favourites />
          </PrivateRoute>
          <PrivateRoute path="/new" >
            <RecipeForm />
          </PrivateRoute>
          <PrivateRoute path="/recipes" >
            <LocalRecipes />
          </PrivateRoute>
        </Switch>
      </Router>
    </div >
  )
};

export default App;

{/* <Route path="/new/profile" component={Profile} /> */}
{/* <Route path="/profile" component={ViewProfile} /> */}