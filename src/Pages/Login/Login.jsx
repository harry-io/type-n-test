import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { authLoginSuccess } from "../../Redux/Auth/auth.action";
import { useDispatch } from "react-redux";
import { setLsData } from "../../Utils/ls";

const Login = () => {
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
  //
  const handleSubmit = (event) => {
    event.preventDefault();
    const data_obj = {
      username,
      password,
    };
    //
    let matchEmail = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].username === username) {
        matchEmail = true;
      }
    }
    if (matchEmail) {
      let matchPassword = false;
      let payload = {};
      for (let i = 0; i < users.length; i++) {
        if (users[i].password === password) {
          matchPassword = true;
          payload.username = users[i].username;
          payload.speed_rec = users[i].speed_rec;
          setLsData("user_id_type_n_test", users[i].id);
          break;
        }
      }
      //
      if (matchPassword) {
        dispatch(authLoginSuccess(payload));
        toast("Login success!");
        navigate("/");
      } else {
        toast("Wrong password!");
      }
    } else {
      toast("User do not exist!");
    }
  };
  return (
    <div className="login_main">
      <div className="login_wrapper">
        <p className="login_title">login</p>
        <form className="login_form" onSubmit={handleSubmit}>
          <div className="hero_image">
            <img src="https://i.imgur.com/q0DepdF.png" alt="auth" />
          </div>
          <input
            type="text"
            className="login_input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            required
          />

          <input
            type="password"
            className="login_input"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ color: "#ff4400" }}
            required
          />
          <p className="auth_notes">
            Password should be more than 6 characters.
          </p>
          <input type="submit" value="LOGIN" className="login_input_btn" />
          <p className="new_acc">
            New user? <span onClick={() => navigate("/signup")}>Signup</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
