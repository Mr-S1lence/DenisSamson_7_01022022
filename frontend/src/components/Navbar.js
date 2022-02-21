import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import logo from './../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import Logout from "./Log/logout";


const Navbar = () => {
    const uid = useContext(UidContext);

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink to ="/">
                        <div className="logo">
                            <img src={ logo } alt="icon" />
                        </div>
                    </NavLink>
                </div>
                {uid ? (
                    <ul>
                        <li></li>
                        <li className="welcome">
                            <NavLink to="/profil">
                                <h5>Bienvenue</h5>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                 ) : (
                     <ul>
                         <li></li>
                         <li>
                             <NavLink to="/profil">
                             <FontAwesomeIcon icon={ faArrowRightToBracket}  size="lg" color="#FD2D01"/>
                             </NavLink>
                         </li>
                     </ul>
                 )}
            </div>
        </nav>
    )
}

export default Navbar;