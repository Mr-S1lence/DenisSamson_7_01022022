import React from "react";
import axios from "axios";
import cookie from "js-cookie";
import { useSelector } from "react-redux";

const DesactivateAccount = () => {
  const userData = useSelector((state) => state.userReducer);

  const removeCookie = (key) => {
    if (window !== "undefined") {
      cookie.remove(key, { expires: 1 });
    }
  };

  const desactivateAccount = async () => {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/desactivate/${userData._id}`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/";
  };
  return (
    <div>
      <button
        onClick={() => {
          if (window.confirm("Voulez-vous vraiment désactiver votre compte ?"))
            desactivateAccount();
        }}
      >
        Désactiver le compte
      </button>
    </div>
  );
};

export default DesactivateAccount;
