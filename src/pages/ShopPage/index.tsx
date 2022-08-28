import React, {useState} from "react";
import {useProducts} from "../../hooks/products";
import {Loader} from "../../components/Loader";
import {ErrorMessage} from "../../components/ErrorMessage";
import Modal from "../../components/Modal";
import CreateProduct from "../../forms/CreateProduct/index";
import {Product} from "../../components/Product";

export default function ShopPage() {

    const {products, loading, error} = useProducts();

    const [modal, setModal] = useState(false);
    return (
        <>
            <div className="container mx-auto pt-16 max-w-4xl flex flex-wrap">
                {loading && <Loader/>}
                {error && <ErrorMessage error={error}/>}
                {products.map(product =>
                    <Product product={product} key={product.id}/>
                )}
                {modal && <Modal title="Create Product">
                    <CreateProduct/>
                </Modal>}
                {!modal && <button
                    className="px-4 py-2 fixed right-10 bottom-10 bg-amber-600 hover:bg-amber-600/80 text-2xl text-white rounded-lg"
                    onClick={event => setModal(true)}
                >
                    Add new
                </button>}
            </div>
        </>
    );
};