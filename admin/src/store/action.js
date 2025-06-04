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
  getConveyencerStart,
  getConveyencerFailure,
  getConveyencerSuccess,
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
    endpoint: "/users",
  });

  if (response?.error) {
    dispatch(getUserFailure(response?.error)); // Dispatch failure action
  } else {
    dispatch(getUserSuccess(response?.data)); // Dispatch success action
  }
};

// GET Conveyencer list
export const fetchConveyencerList = () => async (dispatch) => {
  dispatch(getConveyencerStart()); // Dispatch loading state
  const response = await ApiComponent({
    method: "GET",
    endpoint: "/conveyancers?is_verified=false&name=Ravi",
  });

  if (response?.error) {
    dispatch(getConveyencerFailure(response?.error)); // Dispatch failure action
  } else {
    dispatch(getConveyencerSuccess(response?.data)); // Dispatch success action
  }
};
