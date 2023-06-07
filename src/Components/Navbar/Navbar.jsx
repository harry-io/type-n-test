import React, { useEffect } from "react";
import "./Navbar.css";
import { MdSpeed } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import { authLogout } from "../../Redux/Auth/auth.action";

const Navbar = () => {
  const dispatch = useDispatch();
  const { username, speed_rec, is_auth } = useSelector(
    (store) => store.authReducer
  );
  const navigate = useNavigate();

  return (
    <div className="navbar_main">
      <div className="navbar_wrapper">
        {/* SECTION A */}
        <div className="navbar_section_a" onClick={() => navigate("/")}>
          <MdSpeed style={{ marginTop: "0.2rem", fontSize: "2.2rem" }} />
          <span>type n test</span>
        </div>
        {/* SECTION B */}
        <div className="navbar_section_b">
          {is_auth && (
            <div>
              <AiOutlineUser />
              {username}
            </div>
          )}
          {is_auth && (
            <div onClick={() => navigate("/login")}>Speed : {speed_rec}</div>
          )}
          {!is_auth && <div onClick={() => navigate("/login")}>Login</div>}
          {is_auth && <div onClick={() => dispatch(authLogout())}>Logout</div>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
