import React from "react";
import './style.css';
import {Product} from "../Product";
import {useProducts} from "../../hooks/products";
import {Loader} from "../Loader";
import {ErrorMessage} from "../ErrorMessage";

export default function App() {
    const {products, loading, error} = useProducts();
    return (
        <div className="container mx-auto max-w-4xl">
            {loading && <Loader/>}
            {error && <ErrorMessage error={error}/>}
            {products.map(product =>
                <Product product={product} key={product.id}/>
            )}
        </div>
    );
};
