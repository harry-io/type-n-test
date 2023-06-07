import axios from "axios";
import { authFailure, authLogout, authRequest } from "./auth.action";
import { toast } from "react-hot-toast";
import { UPDATE_SPEED_REC } from "./auth.actiontypes";
//
//
export const signupUser = (data, navigate) => (dispatch) => {
  dispatch(authRequest());
  //
  axios
    .post("https://mock-api-fjrj.onrender.com/users", data)
    .then((res) => {
      toast("Signup success !");
      navigate("/login");
    })
    .catch(() => dispatch(authFailure()));
};
//
//
export const logoutUser = (dispatch) => {
  dispatch(authLogout());
};
//
export const updateSpeed_rec = (id, data) => (dispatch) => {
  axios
    .patch(`https://mock-api-fjrj.onrender.com/users/${id}`, data)
    .then((res) => {
      dispatch({ type: UPDATE_SPEED_REC, payload: data.speed_rec });
      toast("New data updated!");
    })
    .catch((error) => console.log(error));
};
//
