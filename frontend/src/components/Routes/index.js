import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';

const index = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Profil" element={<Profil />} />
                <Route path="/Trending" element={<Trending />} />
                <Route
        path="*"
        element={<Navigate to="/" />}
    />
            </Routes>
        </BrowserRouter>

    )
}

export default index;