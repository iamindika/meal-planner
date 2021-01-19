export const SET_USERS = 'SET_USERS';
export const SET_RECIPES = 'SET_RECIPES';

const dataReducer = (state, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users,
                    loading: false,
            };
        case SET_RECIPES:
          return {
            ...state,
            recipes: action.recipes,
            loading: false,
          };
        default:
            return state;
    }
};

export default dataReducer;