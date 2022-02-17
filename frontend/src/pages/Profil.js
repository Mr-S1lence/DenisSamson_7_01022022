
import React from "react";
import Log from '../components/Log';
import logo from './../assets/icon-left-font.svg'

const Profil = () => {
    return (
        <div className="profil-page">
            <div className="log-container">
                <div className="img-container">
                    {/* <img src={logo} alt="logo groupomania"/> */}
                </div>
                <Log signin={false} signup={true} />
            </div>
        </div>
    )
}

export default Profil;