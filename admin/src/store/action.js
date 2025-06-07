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

// Status Update details
export const fetchStatusUpdate =
  (userId, currentStatus) => async (dispatch) => {
    dispatch(getStatusUpdateStart()); // Dispatch loading state
    const response = await ApiComponent({
      method: "PATCH",
      endpoint: `/users/${userId}/status`,
      payload: {
        status: !currentStatus,
        status_desc: currentStatus ? "Inactive" : "Active", // Toggle status description
      },
    });

    if (response?.error) {
      dispatch(getStatusUpdateFailure(response?.error)); // Dispatch failure action
    } else {
      dispatch(getStatusUpdateSuccess(response?.data)); // Dispatch success action
    }
  };
