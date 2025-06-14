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

//Conveyancer approval
const ConveyancerApprovalSlice = createSlice({
  name: "conveyancerApproval",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    getConveyancerApprovalStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getConveyancerApprovalSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getConveyancerApprovalFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

//Conveyancer deactivate
const ConveyancerDeactivateSlice = createSlice({
  name: "conveyancerDeactivate",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    getConveyancerDeactivateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getConveyancerDeactivateSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getConveyancerDeactivateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Disputes List Slice
const disputeListSlice = createSlice({
  name: "disputeList",
  initialState: {
    data: null,
    loading: false,
    error: null,
    filters: {
      status: '',
      requester_id: '',
    }
  },
  reducers: {
    getDisputesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getDisputesSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getDisputesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setDisputesFilters: (state, action) => {
      state.filters = action.payload;
    },
    deleteDisputeSuccess: (state, action) => {
      state.data = state.data.filter(dispute => dispute.id !== action.payload);
    }
  }
});

// Single Dispute Slice
const disputeSlice = createSlice({
  name: "dispute",
  initialState: {
    data: null,
    loading: false,
    error: null,
    filters: {}
  },
  reducers: {
    getDisputeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getDisputeSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getDisputeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateDisputeStatusSuccess: (state, action) => {
      state.data = action.payload;
    },
    clearCurrentDispute: (state) => {
      state.data = null;
    }
  }
});

// Conversations Slice
const conversationsSlice = createSlice({
  name: "conversations",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    getConversationsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getConversationsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    getConversationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    sendMessageSuccess: (state, action) => {
      state.data = [...(state.data || []), action.payload];
    }
  }
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
  getConveyancerApprovalStart,
  getConveyancerApprovalSuccess,
  getConveyancerApprovalFailure,
} = ConveyancerApprovalSlice.actions;
export const {
  getConveyancerDeactivateStart,
  getConveyancerDeactivateSuccess,
  getConveyancerDeactivateFailure,
} = ConveyancerDeactivateSlice.actions;

export const {
  getDisputesStart,
  getDisputesSuccess,
  getDisputesFailure,
  setDisputesFilters,
  deleteDisputeSuccess
} = disputeListSlice.actions;

export const {
  getDisputeStart,
  getDisputeSuccess,
  getDisputeFailure,
  updateDisputeStatusSuccess,
  clearCurrentDispute
} = disputeSlice.actions;

export const {
  getConversationsStart,
  getConversationsSuccess,
  getConversationsFailure,
  sendMessageSuccess
} = conversationsSlice.actions;

// Combine Reducers
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  userData: userSlice.reducer,
  editUserData: editUserSlice.reducer,
  conveyancerData: conveyancerSlice.reducer,
  statusUpdate: statusUpdateSlice.reducer,
  conveyancerApproval: ConveyancerApprovalSlice.reducer,
  conveyancerDeactivate: ConveyancerDeactivateSlice.reducer,
  disputeList: disputeListSlice.reducer,
  dispute: disputeSlice.reducer,
  conversations: conversationsSlice.reducer,
});

export default rootReducer;
