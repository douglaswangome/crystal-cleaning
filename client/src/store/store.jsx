// Redux - a state management library
// React Redux Toolkit - a package that makes it easier to work with Redux
// configures the store for the redux toolkit
import { configureStore } from "@reduxjs/toolkit";
// imports the userSlice reducer
import userReducer from "./slice";

// creates the store
const store = configureStore({ reducer: { user: userReducer } });

export default store;
