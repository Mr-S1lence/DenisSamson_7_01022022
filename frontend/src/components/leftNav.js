import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRocket, faUser } from "@fortawesome/free-solid-svg-icons";

const LeftNav = () => {
  return (
    <div>
      <div className="left-nav-container">
        <div className="icons">
          <div className="icons-bis">
            <NavLink
              to="/"
              className={({ isActive }) =>
                "left-nav" + (isActive ? " active-left-nav" : "")
              }
            >
              <FontAwesomeIcon icon={faHouse} size="2x" color="black" />
            </NavLink>
            <br />
            <NavLink
              to="/trending"
              className={({ isActive }) =>
                "left-nav" + (isActive ? " active-left-nav" : "")
              }
            >
              <FontAwesomeIcon icon={faRocket} size="2x" color="black" />
            </NavLink>
            <br />
            <NavLink
              to="/profil"
              className={({ isActive }) =>
                "left-nav" + (isActive ? " active-left-nav" : "")
              }
            >
              <FontAwesomeIcon icon={faUser} size="2x" color="black" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
