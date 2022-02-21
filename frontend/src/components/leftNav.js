import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRocket, faUser } from "@fortawesome/free-solid-svg-icons";

const LeftNav = () => {
  return (
    <div className="left-nav-container">
      <div className="icons">
        <div className="icons-bis">
          <NavLink
            to="/home"
            className={({ isActive }) => "left-nav" + (isActive ? ' active-left-nav' : '')}
          >
            <FontAwesomeIcon icon={faHouse} size="lg" color="#FD2D01" />
          </NavLink>
          <br />
          <NavLink
           to="/trending"
            className={({ isActive }) => "left-nav"+ (isActive ? ' active-left-nav' : '')}
          >
            <FontAwesomeIcon icon={faRocket} size="lg" color="#FD2D01" />
          </NavLink>
          <br />
          <NavLink
            to="/profil"
            className={({ isActive }) => "left-nav" + (isActive ? ' active-left-nav' : '')}
          >
            <FontAwesomeIcon icon={faUser} size="lg" color="#FD2D01" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;