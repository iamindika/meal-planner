// import logo from './logo.svg';
import './App.css';
import useApplicationData from "./hooks/useApplicationData"
import {Alert} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeCard from './components/RecipeCard';
import Favourites from './components/Favourites'

const App = () => {
  const {
      state,
      dispatch
  } = useApplicationData();
    const userList = state.users.map((user) => (<li key={user.id} > {user.first_name} {user.last_name} {user.email} </li>
));
return (
<div className="App" >

<Favourites />
</div >
);
};

export default App;
