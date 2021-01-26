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
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ViewProfile from './components/ViewProfile';

const fakeAuth = {
  isAuthenticated:  false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

function PrivateRoute({children, ...rest}) {
  return(
    <Route {...rest} render={() => {
      return fakeAuth.isAutheticated === true
        ? children
        : <Redirect to='/' />
    }} />
  )
}

const App = () => {
  return(
    <Router>
      <div className="App">
      <Heading />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/schedule" component={LocalSchedule} />
          <Route path="/profile" component={Profile} />
          <Route path="/search" component={Search} />
          <Route path="/favorites"  component={Favourites} />
          <Route path="/register" component={Register} />
          <Route path="/new" component={RecipeForm} />
          <Route path="/recipes" component={LocalRecipes} />
        </Switch>
      </div >
    </Router>
)};

export default App;

{/* <Route path="/new/profile" component={Profile} /> */}
{/* <Route path="/profile" component={ViewProfile} /> */}