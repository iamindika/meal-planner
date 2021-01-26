import axios from "axios";
import { useEffect, useState,useContext } from 'react';
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/authContext";
import ProfileEdit from './ProfileEdit';
import ProfileShow from './ProfileShow';

export default function Profile(){
  const [state, setState] = useState({
    user: useContext(AuthContext),
    diet: "Vegetarian",
    avoidances: ["Eggs", "Bacon", "Dairy"],
    favorites: ["Peanut", "Caffeine", "Peanut"],
    hasPreferences: true
  });
  const history = useHistory();

  return (
    <>
      {state.hasPreferences ? 
        <ProfileShow user={state.user} diet={state.diet} favorites={state.favorites}
          avoidances={state.avoidances}/> : 
        <ProfileEdit/>}
    </>
  )
}

// const [diet,setDiet] = useState("");
// const [avoidances,setAvoidances] = useState([]);
// const [favorites,setFavorites] = useState("");
// const {user} = useContext(AuthContext);


// function handleSubmit(event){
// event.preventDefault();
// axios.post('/profile/new',
//   {diet, avoidances, favorites,id:user.id},
//   {headers: {"x-auth-token": localStorage.getItem("token")}}
// )
//   .then(({
//    data
//   }) => {
//      console.log(data)
//   })
//   .catch((err) => console.log(err));
//    history.push("/profile");
// }

// const {user} = useContext(AuthContext);
// const [diet,setDiet] = useState([]);
// const [avoidances, setAvoidances] = useState([]);
// const [favs,setFavs] = useState([]);
// //  console.log(user)
  // useEffect(()=>{
  //   axios.get(`/profile/view/${user.id}`,
  //   {headers: {"x-auth-token": localStorage.getItem("token")}}
  // )
  //   .then(({
  //    data
  //   }) => {
  //       setDiet(data.diet.name);
  //      setAvoidances(data.avoidances);
  //       setFavs(data.favs);
  //   })
  //   .catch((err) => console.log(err));
  // },[user.id])

//   const userAvoidances = avoidances.map((avoid)=>{
//     return avoid.name
//   });

//   const userFavs = favs.map((fav)=>{
//     return fav.name
//   })

//   