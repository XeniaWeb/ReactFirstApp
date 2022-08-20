import React from 'react';
import {Link} from "react-router-dom";

export default function Navigation() {
    return (
        <div className="bg-green-900/60 text-white shadow-md fixed w-screen">
            <nav className=" mx-auto flex justify-between items-center text-2xl max-w-7xl h-14 top-0 left-0 right-0">
                <Link className="px-10" to="/">LOGO</Link>
                <Link className="px-10" to="/favourites">Favourites</Link>
            </nav>
        </div>
    );
};
