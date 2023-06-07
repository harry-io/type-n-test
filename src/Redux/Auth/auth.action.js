import {
  AUTH_FAILURE,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REQUEST,
  AUTH_SIGNUP_SUCCESS,
} from "./auth.actiontypes";

export const authRequest = () => {
  return { type: AUTH_REQUEST };
};
export const authFailure = () => {
  return { type: AUTH_FAILURE };
};
export const authLoginSuccess = (payload) => {
  return { type: AUTH_LOGIN_SUCCESS, payload: payload };
};
export const authSignupSuccess = () => {
  return { type: AUTH_SIGNUP_SUCCESS };
};

export const authLogout = () => {
  return { type: AUTH_LOGOUT };
};
