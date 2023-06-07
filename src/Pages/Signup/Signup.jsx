import React, { useEffect, useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, signupUser } from "../../Redux/Auth/auth.api";
import axios from "axios";
import { toast } from "react-hot-toast";

const Signup = () => {
  const store = useSelector((store) => store);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  // .
  useEffect(() => {
    axios
      .get("https://mock-api-fjrj.onrender.com/users")
      .then((res) => setUsers(res.data))
      .catch(() => toast("Error while getting all the users."));
  }, []);
  //
  const handleSubmit = (event) => {
    event.preventDefault();
    //
    console.log("pressed");
    const data_obj = {
      username,
      password,
      speed_rec: 0,
    };
    let match = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        match = true;
      }
    }
    if (!match) {
      dispatch(signupUser(data_obj, navigate));
    } else {
      toast("User already exists!");
    }
    //
  };
  return (
    <div className="login_main">
      <div className="login_wrapper">
        <p className="login_title">signup</p>
        <form className="login_form" onSubmit={handleSubmit}>
          <div className="hero_image">
            <img src="https://i.imgur.com/q0DepdF.png" alt="auth" />
          </div>
          <input
            type="text"
            className="login_input"
            placeholder="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="login_input"
            placeholder="password"
            style={{ color: "#ff4400" }}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="auth_notes">
            Password should be more than 6 characters.
          </p>
          <input type="submit" value="SIGNUP" className="login_input_btn" />
          <p className="already_acc">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
