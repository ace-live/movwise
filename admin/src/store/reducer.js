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

//edit user
const editUserSlice = createSlice({
  name: "edituser",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    getEditUserDetailsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getEditUserDetailsSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    getEditUserDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

//status Update
const statusUpdateSlice = createSlice({
  name: "status",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    getStatusUpdateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getStatusUpdateSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getStatusUpdateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

//get conveyancer list
const conveyancerSlice = createSlice({
  name: "conveyancerList",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    getConveyancerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getConveyancerSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getConveyancerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

//Conveyancer Status
const ConveyancerStatusSlice = createSlice({
  name: "conveyancerStatus",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    getConveyancerStatusStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getConveyancerStatusSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getConveyancerStatusFailure: (state, action) => {
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
  getEditUserDetailsFailure,
  getEditUserDetailsSuccess,
  getEditUserDetailsStart,
} = editUserSlice.actions;
export const {
  getConveyancerStart,
  getConveyancerFailure,
  getConveyancerSuccess,
} = conveyancerSlice.actions;
export const {
  getStatusUpdateStart,
  getStatusUpdateSuccess,
  getStatusUpdateFailure,
} = statusUpdateSlice.actions;
export const {
  getConveyancerStatusStart,
  getConveyancerStatusSuccess,
  getConveyancerStatusFailure,
} = ConveyancerStatusSlice.actions;

// Combine Reducers
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  userData: userSlice.reducer,
  editUserData: editUserSlice.reducer,
  conveyancerData: conveyancerSlice.reducer,
  statusUpdate: statusUpdateSlice.reducer,
  conveyancerStatus: ConveyancerStatusSlice.reducer,
});

export default rootReducer;
