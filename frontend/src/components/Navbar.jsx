import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import logo from "./../assets/logo-white.png";
import Logout from "./Log/logout";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);

  return (
    <nav>
      <div className="nav-container">
        <div  className={uid ? "logo" : "logo logo-signiIn"}>
          <NavLink to="/">
            <div>
              <img src={logo} alt="icon" />
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li className="user-img">
              <NavLink to="/profil">
                <img src={userData.picture} alt="user-img" />
              </NavLink>
            </li>
            <li className="welcome">
              <NavLink to="/profil">
                <h5>Bienvenue {userData.firstname}</h5>
              </NavLink>
            </li>
            <Logout />
          </ul>
        ) : (null)}
      </div>
    </nav>
  );
};

export default Navbar;
