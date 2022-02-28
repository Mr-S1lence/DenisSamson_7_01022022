import React, { useContext } from "react";
import { UidContext } from "../components/AppContext";
import LeftNav from "../components/leftNav";
import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";
import Log from "../components/Log";

const Home = () => {
    const uid = useContext(UidContext);

    return (
        <div>
        {uid ? (
            <div className="home">
            <LeftNav />
            <div className="main">
                <div className="home-header">
                    {uid ? <NewPostForm /> :  <Log signin={true} signup={false}/>}
                </div>
                <Thread />
            </div>
        </div>
        ) : (    
            <div className="log-container">
            <Log signin={false} signup={true} />
                <div className="img-container">

                </div>
            </div>
        )}
        </div>
    )
}

export default Home;