import React from 'react';
import LeftNav from '../leftNav';
import { useSelector } from "react-redux";
import UploadImg from './uploadImg';

const UpdateProfil = () => {
    const userData = useSelector((state) => state.userReducer);

    return (
        <div>
            <div className='profil-container'>
                <LeftNav />
                <h1>Profil de {userData.pseudo}</h1>
                <div className='update-container'>
                    <div className='left-part'>
                        <h3>Photo de profil</h3>
                        <img src={userData.picture} alt="avatar utilisateur"/>
                        <UploadImg />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfil;