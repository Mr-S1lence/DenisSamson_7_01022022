import React, { useState } from "react";
import LeftNav from "../leftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./uploadImg";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../Utils";
import DesactivateAccount from "./desactivateAccount";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.userError);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  return (
    <div>
      <LeftNav />
      <div className="profil-container">
        <h1>{userData.firstname} {userData.lastname}</h1>
        <div className="update-container">
          <div className="left-part">
            <img src={userData.picture} alt="avatar utilisateur" />
            <UploadImg />
            <p>{error.maxSize}</p>
            <p>{error.format}</p>
          </div>
          <div className="right-part">
            <div className="bio-update">
              <h3>Bio</h3>
              {updateForm === false && (
                <>
                  <p onClick={() => setUpdateForm(!updateForm)}>
                    {userData.bio}
                  </p>
                  <button onClick={() => setUpdateForm(!updateForm)}>
                    Modifier ma bio
                  </button>
                </>
              )}
              {updateForm && (
                <>
                  <textarea
                    type="text"
                    defaultValue={userData.bio}
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                  <br />
                  <button onClick={handleUpdate}>Valider modification</button>
                </>
              )}
            </div>
            <h4>Membre depuis le : </h4><span>{dateParser(userData.createdAt)}</span>
            <h5>
              Abonnements :{" "}
              {userData.following ? userData.following.length : ""}
            </h5>
            <h5>
              Abonnés : {userData.followers ? userData.followers.length : ""}
            </h5>
            <DesactivateAccount userId={userData._id}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
