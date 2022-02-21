import React, {useState} from 'react';
import LeftNav from '../leftNav';
import { useDispatch, useSelector } from "react-redux";
import UploadImg from './uploadImg';
import { updateBio } from '../../actions/user.actions';

const UpdateProfil = () => {
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleUpdate = () => {
        dispatch(updateBio(userData._id, bio))
        setUpdateForm(false);
    }

    return (
        <div>
            <LeftNav />
            <div className='profil-container'>
                
                <h1>Profil de {userData.pseudo}</h1>
                <div className='update-container'>
                    <div className='left-part'>
                        <h3>Photo de profil</h3>
                        <img src={userData.picture} alt="avatar utilisateur"/>
                        <UploadImg />
                    </div>
                    <div className='right-part'>
                        <div className='bio-update'>
                            <h3>Bio</h3>
                            {updateForm === false && (
                                <>
                                    <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                                    <button onClick={() => setUpdateForm(!updateForm)}>Modifier ma bio</button>
                                </>
                            )}
                            {updateForm && (
                                <>
                                    <textarea type="text" defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                                    <button onClick={handleUpdate}>Valider modification</button>
                                </>
                            )}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfil;