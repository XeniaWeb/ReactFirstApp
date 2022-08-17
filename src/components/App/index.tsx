import React from "react";
import './style.css';
import {Product} from "../Product";
import {products} from "../../data/products";

export default function App() {
    return (
        <div className="container mx-auto max-w-4xl">
            <Product product={products[0]}/>
            <Product product={products[1]}/>
        </div>
    )
};
