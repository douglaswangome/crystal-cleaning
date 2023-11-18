// createSlice is a function that accepts an initial state, an object full of reducer functions, and a "slice name", and automatically generates action creators and action types that correspond to the reducers and state.
import { createSlice } from "@reduxjs/toolkit";

// initialState is an object that contains the initial state of the slice
const initialState = {
	user: null,
};

// userSlice is an object that contains the reducers and the initial state
const userSlice = createSlice({
	// name - a string that is used as the prefix for generated action types
	name: "user",
	// initialState - an object that contains the initial state of the slice
	initialState,
	// reducers - an object that contains reducer functions
	reducers: {
		login: (state, action) => {
			state.user = action.payload;
		},
		logout: (state) => {
			state.user = null;
		},
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
