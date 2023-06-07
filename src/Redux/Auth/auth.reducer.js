import { getLsData, removeLsData, setLsData } from "../../Utils/ls";
import {
  AUTH_FAILURE,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REQUEST,
  UPDATE_SPEED_REC,
} from "./auth.actiontypes";
//
const user_data = getLsData("user_data_type_n_test") || {};
const intialState = {
  is_auth: user_data.username ? true : false,
  is_error: false,
  is_loading: false,
  username: user_data.username || "",
  speed_rec: user_data.speed_rec || 0,
};
export const authReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case AUTH_REQUEST: {
      return {
        ...state,
        is_loading: true,
      };
    }
    case AUTH_LOGIN_SUCCESS: {
      setLsData("user_data_type_n_test", payload);
      return {
        ...state,
        is_loading: false,
        is_error: false,
        username: payload.username,
        speed_rec: payload.speed_rec,
        is_auth: true,
      };
    }
    case AUTH_LOGOUT: {
      removeLsData("user_data_type_n_test");
      return {
        ...state,
        is_auth: false,
        username: "",
        speed_rec: 0,
      };
    }
    case UPDATE_SPEED_REC: {
      return {
        ...state,
        speed_rec: payload,
      };
    }
    case AUTH_FAILURE: {
      return {
        ...state,
        is_loading: false,
        is_error: true,
      };
    }
    default: {
      return state;
    }
  }
};
