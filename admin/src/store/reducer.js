import { combineReducers } from "redux";
import { createSlice } from "@reduxjs/toolkit";

// 🔐 Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: null,
    loading: false,
    error: null,
  },
  reducers: {
    getLoginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getLoginSuccess: (state, action) => {
      state.loading = false;
      state.login = action.payload;
    },
    getLoginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

//get user
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    getUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    getUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

//get user
const conveyencerSlice = createSlice({
  name: "conveyencerList",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    getConveyencerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getConveyencerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    getConveyencerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export Actions
export const { getLoginStart, getLoginSuccess, getLoginFailure } =
  authSlice.actions;
export const { getUserStart, getUserSuccess, getUserFailure } =
  userSlice.actions;
export const {
  getConveyencerStart,
  getConveyencerFailure,
  getConveyencerSuccess,
} = conveyencerSlice.actions;

// Combine Reducers
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  userData: userSlice.reducer,
  conveyencerData: conveyencerSlice.reducer,
});

export default rootReducer;
