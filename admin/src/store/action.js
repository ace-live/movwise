import ApiComponent from "../components/customhook/apiFetch";

import {
  //login
  getLoginStart,
  getLoginSuccess,
  getLoginFailure,
  //user details
  getUserStart,
  getUserSuccess,
  getUserFailure,
  getConveyancerStart,
  getConveyancerFailure,
  getConveyancerSuccess,
  getStatusUpdateFailure,
  getStatusUpdateStart,
  getStatusUpdateSuccess,
  getConveyancerApprovalFailure,
  getConveyancerApprovalStart,
  getConveyancerApprovalSuccess,
  //edit user details
  getEditUserDetailsStart,
  getEditUserDetailsSuccess,
  getEditUserDetailsFailure,
  getConveyancerDeactivateStart,
  getConveyancerDeactivateSuccess,
  getConveyancerDeactivateFailure,
   // Disputes List
  getDisputesStart,
  getDisputesSuccess,
  getDisputesFailure,
  setDisputesFilters,
  deleteDisputeSuccess,
  
  // Single Dispute
  getDisputeStart,
  getDisputeSuccess,
  getDisputeFailure,
  updateDisputeStatusSuccess,
  clearCurrentDispute,
  
  // Conversations
  getConversationsStart,
  getConversationsSuccess,
  getConversationsFailure,
  sendMessageSuccess
} from "../store/reducer";

// GET login
export const fetchLogin = (loginData) => async (dispatch) => {
  dispatch(getLoginStart()); // Dispatch loading state

  const response = await ApiComponent({
    method: "POST",
    endpoint: "/login",
    payload: loginData, // Pass login data here
  });

  if (response?.error) {
    dispatch(getLoginFailure(response?.error)); // Dispatch failure action
    // swal.fire({
    //   text: "Your credentials seem incorrect. Please try again.",
    //   icon: "error",
    //   showConfirmButton: false,
    //   timer: 3000,
    // });
  } else {
    dispatch(getLoginSuccess(response?.data)); // Dispatch success action
    localStorage.setItem("auth", response.authorization);
    // swal.fire({
    //   text: "You're good to go!",
    //   icon: "success",
    //   showConfirmButton: false,
    //   timer: 3000,
    // });
  }
};

// GET User details
export const fetchUser = () => async (dispatch) => {
  dispatch(getUserStart()); // Dispatch loading state
  const response = await ApiComponent({
    method: "GET",
    endpoint: "/user",
  });

  if (response?.error) {
    dispatch(getUserFailure(response?.error)); // Dispatch failure action
  } else {
    dispatch(getUserSuccess(response?.data)); // Dispatch success action
  }
};

// edit user details
export const fetchEditUserDetails = (values) => async (dispatch) => {
  dispatch(getEditUserDetailsStart()); // Dispatch loading state
  const response = await ApiComponent({
    method: "PUT",
    endpoint: `/users/${values?.id}`,
    payload: {
      name: values?.name,
      email: values?.email,
      status_desc: values?.status_description,
      status: values?.status,
    },
  });

  if (response?.error) {
    dispatch(getEditUserDetailsFailure(response?.error)); // Dispatch failure action
  } else {
    dispatch(fetchUser()); // Fetch updated user data
    dispatch(getEditUserDetailsSuccess(response?.data)); // Dispatch success action
  }
};

// Status Update details
export const fetchStatusUpdate =
  (userId, currentStatus) => async (dispatch) => {
    dispatch(getStatusUpdateStart()); // Dispatch loading state
    const response = await ApiComponent({
      method: "PATCH",
      endpoint: `/user/${userId}/status`,
      payload: {
        status: !currentStatus,
        status_desc: currentStatus ? "Inactive" : "Active", // Toggle status description
      },
    });

    if (response?.error) {
      dispatch(getStatusUpdateFailure(response?.error)); // Dispatch failure action
    } else {
      dispatch(fetchUser()); // Fetch updated user data
      dispatch(getStatusUpdateSuccess(response?.data)); // Dispatch success action
    }
  };

// GET Conveyancer list
export const fetchConveyancerList = () => async (dispatch) => {
  dispatch(getConveyancerStart()); // Dispatch loading state
  const response = await ApiComponent({
    method: "GET",
    endpoint: "/conveyancer",
  });

  if (response?.error) {
    dispatch(getConveyancerFailure(response?.error)); // Dispatch failure action
  } else {
    dispatch(getConveyancerSuccess(response?.data)); // Dispatch success action
  }
};

// Conveyancer Approval details
export const fetchConveyancerApproval =
  (userId, currentStatus) => async (dispatch) => {
    dispatch(getConveyancerApprovalStart()); // Dispatch loading state
    const response = await ApiComponent({
      method: "PATCH",
      endpoint: `/conveyancer/${userId}/approve`,
      payload: {
        // status: !currentStatus,
        // status_desc: currentStatus ? "Inactive" : "Active", // Toggle status description
      },
    });

    if (response?.error) {
      dispatch(getConveyancerApprovalFailure(response?.error)); // Dispatch failure action
    } else {
      dispatch(fetchConveyancerList()); // Fetch updated conveyancer data
      dispatch(getConveyancerApprovalSuccess(response?.data)); // Dispatch success action
    }
  };

// Conveyancer deactivate details
export const fetchConveyancerDeactivate =
  (userId, currentStatus) => async (dispatch) => {
    dispatch(getConveyancerDeactivateStart()); // Dispatch loading state
    const response = await ApiComponent({
      method: "PATCH",
      endpoint: `/conveyancer/${userId}/soft-delete`,
      payload: {
        // status: !currentStatus,
        // status_desc: currentStatus ? "Inactive" : "Active", // Toggle status description
      },
    });

    if (response?.error) {
      dispatch(getConveyancerDeactivateFailure(response?.error)); // Dispatch failure action
    } else {
      dispatch(fetchConveyancerList()); // Fetch updated conveyancer data
      dispatch(getConveyancerDeactivateSuccess(response?.data)); // Dispatch success action
    }
  };

// GET Disputes list
export const fetchDisputes = (filters = {}) => async (dispatch) => {
  dispatch(getDisputesStart());
  console.log("Fetching disputes with filters:", filters);
  const params = new URLSearchParams();
  if (filters.status) params.append('status', filters.status);
  if (filters.requester_id) params.append('requester_id', filters.requester_id);
  
  const endpoint = `/dispute?${params.toString()}`;
  
  const response = await ApiComponent({
    method: "GET",
    endpoint
  });

  if (response?.error) {
    dispatch(getDisputesFailure(response.error));
  } else {
    dispatch(getDisputesSuccess(response.data));
  }
};

// SET Disputes filters
export const setFilters = (filters) => (dispatch) => {
  dispatch(setDisputesFilters(filters));
  dispatch(fetchDisputes(filters));
};

// GET Single dispute
export const fetchDispute = (disputeId) => async (dispatch) => {
  dispatch(getDisputeStart());
  
  const response = await ApiComponent({
    method: "GET",
    endpoint: `/dispute/${disputeId}`
  });

  if (response?.error) {
    dispatch(getDisputeFailure(response.error));
  } else {
    dispatch(getDisputeSuccess(response.data));
  }
};

// PATCH Update dispute status
export const updateDisputeStatus = (disputeId, statusData) => async (dispatch) => {
  dispatch(getDisputeStart());
  console.log("Updating dispute status for ID:", disputeId, "with data:", statusData);
  
  const response = await ApiComponent({
    method: "PATCH",
    endpoint: `/dispute/${disputeId}/status`,
    payload: {
      status: statusData.status,
      resolution: statusData.resolution || "", // Optional resolution notes
    },
    
  });

  if (response?.error) {
    dispatch(getDisputeFailure(response.error));
  } else {
    dispatch(updateDisputeStatusSuccess(response.data));
  }
};

// GET Dispute conversations
export const fetchConversations = (disputeId) => async (dispatch) => {
  dispatch(getConversationsStart());
  
  const response = await ApiComponent({
    method: "GET",
    endpoint: `/dispute/${disputeId}/conversations`
  });

  if (response?.error) {
    dispatch(getConversationsFailure(response.error));
  } else {
    dispatch(getConversationsSuccess(response.data));
  }
};

// POST Send message
export const sendMessage = (disputeId, messageData) => async (dispatch) => {
  const response = await ApiComponent({
    method: "POST",
    endpoint: `/dispute/${disputeId}/conversations`,
    payload: {
      dispute_id: disputeId,
      message: messageData.message,
      sender_id: messageData.sender_id, 
      receiver_id: messageData.receiver_id 
    }
  });

  if (!response?.error) {
    dispatch(sendMessageSuccess(response.data));
  }
};

// DELETE Dispute
export const deleteDispute = (disputeId) => async (dispatch) => {
  const response = await ApiComponent({
    method: "DELETE",
    endpoint: `/dispute/${disputeId}`
  });

  if (!response?.error) {
    dispatch(deleteDisputeSuccess(disputeId));
  }
};

// Clear current dispute
export const clearDispute = () => (dispatch) => {
  dispatch(clearCurrentDispute());
};
