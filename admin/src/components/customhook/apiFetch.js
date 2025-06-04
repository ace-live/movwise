import axios from "axios";
import { baseUrl } from "../../constant";
// import { SessionExpiredLogout } from "../../../utilities";

let isSessionExpired = false; // Flag to track session expiry

const ApiComponent = async ({ method, endpoint, payload = null, customHeaders = {} }) => {
    try {
        const token = localStorage.getItem("auth") || "";
        const isGet = method.toUpperCase() === "GET";
        const isDelete = method.toUpperCase() === "DELETE";

        const response = await axios({
            method,
            url: `${baseUrl}${endpoint}${isGet && payload ? `?${payload}` : ""}`,
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
                ...customHeaders,
            },
            ...(isGet || isDelete ? {} : { data: payload }),
        });
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
