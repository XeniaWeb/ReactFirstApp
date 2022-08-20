import React from "react";
import {useProducts} from "../../hooks/products";
import {Loader} from "../../components/Loader";
import {ErrorMessage} from "../../components/ErrorMessage";
import Modal from "../../components/Modal";
import CreateProduct from "../../components/CreateProduct/index";
import {Product} from "../../components/Product";

export default function HomePage() {
    const {products, loading, error} = useProducts();
    return (
        <>
            <div className="container mx-auto pt-16 max-w-4xl flex flex-wrap">
                {loading && <Loader/>}
                {error && <ErrorMessage error={error}/>}
                {products.map(product =>
                    <Product product={product} key={product.id}/>
                )}
                <Modal title="Create Product">
                    <CreateProduct/>
                </Modal>
            </div>
        </>

    );
};