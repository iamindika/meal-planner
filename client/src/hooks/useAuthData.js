import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  return (
    <AuthContextProvider.Provider 
      value={{
        loggedInUser,
        setLoggedInUser
      }}
      >
        {props.children}
      </AuthContextProvider.Provider>
  );
};

export default AuthContextProvider;