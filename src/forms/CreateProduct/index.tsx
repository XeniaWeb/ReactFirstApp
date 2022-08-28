import React, {ChangeEvent, useState} from 'react';
import {IProduct} from "../../models/IProduct";
import axios from "axios";
import {ErrorMessage} from "../../components/ErrorMessage";

const productData: IProduct = {
    title: 'test product',
    price: 13.5,
    description: 'lorem ipsum set',
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    categoryId: 2,
}

export default function CreateProduct() {
    const [productTitle, setProductTitle] = useState('');
    const [errorTitle, setErrorTitle] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [errorDesc, setErrorDesc] = useState('');

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorTitle('')
        if (productTitle.trim().length < 5 ) {
            setErrorTitle(`Please enter valid title. ${productTitle.trim().length}` )
        }
        productData.title = productTitle;
        productData.description =productDesc;

        await axios.post<IProduct>('https://fakestoreapi.com/products', productData)


    };

    // const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setErrorTitle('');
        setProductTitle(event.target.value);
        if (productTitle.trim().length < 4 ) {
            setErrorTitle(`Please enter valid title min 5 characters.` )
        }
    };
    const changeDescHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setErrorDesc('');
        setProductDesc(event.target.value);
        if (productDesc.trim().length < 4 ) {
            setErrorDesc(`Please enter valid description min 5 characters.` )
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="md:flex justify-between items-center mb-2">
                <label htmlFor="product-title" className="px-1 text-lg"> Product&nbsp;Title: </label>
                <input id="product-title" type="text"
                       className="border-2 rounded w-full md:w-3/4 p-2 outline-emerald-700/50"
                       placeholder="Enter product name..."
                       name="title"
                       value={productTitle}
                       onChange={changeTitleHandler}
                       autoFocus
                />
            </div>
            <ErrorMessage error={errorTitle} />

            <div className="md:flex justify-between items-center mb-2">
                <label htmlFor="product-desc" className="px-1 text-lg"> Product&nbsp;Description: </label>
                <input id="product-desc" type="text"
                       className="border-2 rounded w-full md:w-3/4 p-2 outline-emerald-700/50"
                       placeholder="Product description..."
                       name="description"
                       value={productDesc}
                       onChange={changeDescHandler}
                />
            </div>
            <ErrorMessage error={errorDesc} />
            <button type="submit"
                    className="outline-emerald-700/30 outline-offset-2 px-4 py-2 mt-4 border rounded-lg bg-green-800 hover:bg-green-700 text-lg text-white">
                Save
            </button>
        </form>
    );
}