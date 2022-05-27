import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
