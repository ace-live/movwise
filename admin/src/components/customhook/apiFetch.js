import axios from "axios";
import { baseUrl } from "../../constant";
// import { SessionExpiredLogout } from "../../../utilities";

let isSessionExpired = false; // Flag to prevent multiple logout calls

const ApiComponent = async ({
  method,
  endpoint,
  payload = null,
  customHeaders = {},
}) => {
  //     // GET
  // await ApiComponent({ method: "GET", endpoint: "/users", payload: "page=1&limit=10" });

  // // POST
  // await ApiComponent({ method: "POST", endpoint: "/users", payload: { name: "John", email: "john@example.com" } });

  // // PUT
  // await ApiComponent({ method: "PUT", endpoint: "/users/123", payload: { name: "Updated Name" } });

  // // PATCH
  // await ApiComponent({ method: "PATCH", endpoint: "/users/123", payload: { status: "active" } });

  // // DELETE
  // await ApiComponent({ method: "DELETE", endpoint: "/users/123" });

  try {
    const token = localStorage.getItem("auth") || "";
    const upperMethod = method.toUpperCase();

    // Prepare URL for GET request with query parameters
    let url = `${baseUrl}${endpoint}`;
    if (upperMethod === "GET" && payload) {
      url += `?${payload}`;
    }

    const config = {
      method: upperMethod,
      url,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        ...customHeaders,
      },
    };

    // Add request body for methods that support it
    if (!["GET", "DELETE"].includes(upperMethod)) {
      config.data = payload;
    }

    const response = await axios(config);

    if (response?.data?.detail === "Invalid or expired token") {
      if (!isSessionExpired) {
        isSessionExpired = true;
        // SessionExpiredLogout();
      }
      return;
    }

    return {
      data: response.data,
      error: null,
      authorization: response.headers?.authorization,
    };
  } catch (err) {
    return {
      data: null,
      error: err.response?.data?.message || err.message,
      authorization: err.response?.headers?.authorization,
    };
  }
};

export default ApiComponent;
