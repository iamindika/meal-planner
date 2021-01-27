import axios from "axios";
import { useEffect, useState, useContext } from 'react';
import {useHistory} from "react-router-dom";
import {AuthContext} from "../context/authContext";
import ProfileEdit from './ProfileEdit';
import ProfileShow from './ProfileShow';

export default function Profile(){
  const { user } = useContext(AuthContext);
  // console.log(user);
  const [state, setState] = useState({
    user,
    diet: "",
    avoidances: [],
    favorites: [],
    hasPreferences: false
  });

  useEffect(()=>{
      axios.get(`/profile/view/${user.id}`,
      {headers: {"x-auth-token": localStorage.getItem("token")}}
    )
      .then(({ data }) => {
        let userHasPreferences;
        let userDiet;
        let userAvoidances;
        let userFavorites;
        if (data.diet || data.avoidances.length > 0 || data.favs.length > 0) {
          userHasPreferences = true;
          userDiet = data.diet ? data.diet.name : "";
          userAvoidances = data.avoidances.length > 0 ? data.avoidances.map(avoidance => avoidance.name) : [];
          userFavorites = data.favs.length > 0 ? data.favs.map(fav => fav.name) : [];
        } else {
          userHasPreferences = false; 
        }
        if (userHasPreferences) {
          setState( (prev) => ({
            ...prev,
            diet: userDiet,
            avoidances: [...userAvoidances],
            favorites: [...userFavorites],
            hasPreferences: userHasPreferences
          }))
        } else {
          setState((prev) => ({
            ...prev,
            diet: "",
            avoidances: [],
            favorites: [],
            hasPreferences: userHasPreferences
          }))
        }
        console.log(state);
      })
      .catch((err) => console.log(err));
    },[])

  return (
    <>
      {state.hasPreferences ? 
        <ProfileShow user={state.user} diet={state.diet} favorites={state.favorites}
          avoidances={state.avoidances}/> : 
        <ProfileEdit />}
    </>
  )
}
  //  history.push("/profile")
