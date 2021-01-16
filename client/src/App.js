import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Heading from "./components/Heading";
import Favourites from './components/Favourites';

const App = () => {
  return(
 <div className="App">
  <Heading />

  <Favourites />
</div >
  )};

export default App;
