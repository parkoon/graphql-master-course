import React, { createContext, useReducer } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

if (localStorage.getItem("jwt")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwt"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwt");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  login: (user) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user) => {
    localStorage.setItem("jwt", user.token);
    dispatch({
      type: "LOGIN",
      payload: user,
    });
  };
  const logout = () => {
    localStorage.removeItem("jwt");

    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
