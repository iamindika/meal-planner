import {
  useEffect,
  useReducer
} from 'react';
import dataReducer, {
  SET_RECIPES
} from '../reducer/data_reducer';
import axios from 'axios';

const useLocalRecipesData = () => {
  const [state, dispatch] = useReducer(dataReducer, {
      recipes: [],
      loading: true,
  });
  useEffect(() => {
      axios({
              method: 'GET',
              url: '/recipes',
          })
          .then(({
              data
          }) => {
              console.log(data);
              dispatch({
                  type: SET_RECIPES,
                  recipes: data
              });
          })
          .catch((err) => console.log(err));
  }, []);

  return {
      state,
      dispatch,
  };
};

export default useLocalRecipesData;