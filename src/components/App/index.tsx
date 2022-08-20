import React from "react";
import './style.css';
import Navigation from "../Navigation";
import {Route, Routes} from "react-router-dom";
import HomePage from "../../pages/HomePage";
import FavouritesPage from "../../pages/FavouritesPage";

export default function App() {
    return (
        <>
            <Navigation/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/favourites" element={<FavouritesPage/>}/>
            </Routes>
        </>
    );
};
