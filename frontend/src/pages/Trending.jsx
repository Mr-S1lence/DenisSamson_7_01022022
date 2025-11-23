import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/leftNav";
import Log from "../components/Log";

const Trending = () => {
  const uid = useContext(UidContext);
  return (
    <div>
      {uid ? (
        <div className="home">
          <LeftNav />
          <div className="main">
            <div>Construction de la page en cours</div>
          </div>
        </div>
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container"></div>
        </div>
      )}
    </div>
  );
};

export default Trending;
