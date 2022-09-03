import React, {ChangeEvent, useRef, useState} from 'react';
import {IProduct} from "../../models/IProduct";
import axios from "axios";
import {ErrorMessage} from "../../components/ErrorMessage";
import {useCategories} from "../../hooks/categories";

interface CreateProductProps {
    onCreate: (product: IProduct) => void;
}

export default function CreateProduct({onCreate}: CreateProductProps) {
    const fileInput: any = useRef(null)
    const [productTitle, setProductTitle] = useState('');
    const [errorTitle, setErrorTitle] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [errorPrice, setErrorPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [errorCategory, setErrorCategory] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [errorDesc, setErrorDesc] = useState('');
    const [productComment, setProductComment] = useState('');
    const [errorComment, setErrorComment] = useState('');
    const [errorImage, setErrorImage] = useState('');
    const {listOfCategories} = useCategories();

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        let formData: FormData = new FormData();
        if (!productTitle) {
            setErrorTitle('Form error: The title field is required.')
            return;
        } else {
            formData.append('title', productTitle);
        }
        formData.append('price', productPrice);
        if (productComment) {
            formData.append('comment', productComment);
        }
        formData.append('categoryId', productCategory);
        formData.append('description', productDesc);
        if (fileInput.current.files[0]) {
            formData.append('image', fileInput.current.files[0], 'mfm.jpg');
        }

        await axios.post<IProduct>('https://shop-api/api/v1/products', formData)
            .then((response) => {
                onCreate(response.data);
            })
            .catch((error) => {
                //@todo сделать обработку ошибок
                // Error
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    if (error.response.data.errors.title) {
                        setErrorTitle(error.response.data.errors.title[0])
                    } else if (error.response.data.errors.price) {
                        setErrorPrice(error.response.data.errors.price[0]);
                    } else if (error.response.data.errors.description) {
                        setErrorDesc(error.response.data.errors.description[0]);
                    } else if (error.response.data.errors.comment) {
                        setErrorComment(error.response.data.errors.comment[0]);
                    } else if (error.response.data.errors.categoryId) {
                        setErrorCategory(error.response.data.errors.categoryId[0]);
                    } else if (error.response.data.errors.image) {
                        setErrorImage(error.response.data.errors.image[0]);
                    }
                    // console.log(error.response.data.errors.price[0]);
                    // console.log(error.response.statusText);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // 'error.request' is an instance of XMLHttpRequest in the
                    // browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
        // @todo получение ответа сервера код 200
    };

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setErrorTitle('');
        setProductTitle(event.target.value);
        if (productTitle.trim().length < 4) {
            setErrorTitle(`Please enter valid title min 5 characters.`)
        }
    };
    const changePriceHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setErrorPrice('');
        setProductPrice(event.target.value);
    };
    const changeDescHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setErrorDesc('');
        setProductDesc(event.target.value);
        if (productDesc.trim().length < 4) {
            setErrorDesc(`Please enter valid description min 5 characters.`)
        }
    };
    const changeCategoryHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setErrorCategory('');
        setProductCategory(event.target.value);
    };
    const changeCommentHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setErrorComment('');
        setProductComment(event.target.value);
        if (productComment.trim().length < 10) {
            setErrorComment(`Please enter valid Comment min 10 characters.`)
        }
    };
    const categoryOptions = listOfCategories.map((cat) =>
        <option key={cat.id} value={cat.id}>
            Cat. {cat.id} - {cat.title}
        </option>
    );
    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="md:flex justify-between items-center mb-2">
                    <label htmlFor="product-title" className="px-1 text-lg"> Product&nbsp;Title <span
                        className="text-red-600">* </span>: </label>
                    <input id="product-title"
                           type="text"
                           className="border-2 rounded w-full md:w-3/4 p-2 outline-emerald-700/50"
                           placeholder="Enter product name..."
                           name="title"
                           required={true}
                           value={productTitle}
                           onChange={changeTitleHandler}
                           autoFocus
                    />
                </div>
                <ErrorMessage error={errorTitle}/>
                <div className="md:flex justify-between items-center mb-2">
                    <label htmlFor="product-price" className="px-1 text-lg">Price <span
                        className="text-red-600">* </span>: </label>
                    <input id="product-price"
                           type="number"
                           className="border-2 rounded w-full md:w-3/4 p-2 outline-emerald-700/50"
                           placeholder="Enter product price..."
                           name="price"
                           required={true}
                           value={productPrice}
                           onChange={changePriceHandler}
                    />
                </div>
                <ErrorMessage error={errorPrice}/>
                <div className="md:flex justify-between items-center mb-2">
                    <label htmlFor="product-category" className="px-1 text-lg">Category <span
                        className="text-red-600">* </span>: </label>
                    <select name="categoryId"
                            id="product-category"
                            className="border-2 rounded w-full md:w-3/4 p-2 outline-emerald-700/50"
                            required={true}
                            value={productCategory}
                            onChange={changeCategoryHandler}
                    >
                        <option value="null" selected>Select category ...</option>
                        {categoryOptions}
                    </select>
                </div>
                <ErrorMessage error={errorCategory}/>
                <div className="md:flex justify-between items-center mb-2">
                    <label htmlFor="product-desc" className="px-1 text-lg"> Description <span
                        className="text-red-600">* </span>: </label>
                    <input id="product-desc" type="text"
                           className="border-2 rounded w-full md:w-3/4 p-2 outline-emerald-700/50"
                           placeholder="Product description..."
                           name="description"
                           required={true}
                           value={productDesc}
                           onChange={changeDescHandler}
                    />
                </div>
                <ErrorMessage error={errorDesc}/>
                <div className="md:flex justify-between items-center mb-2">
                    <label htmlFor="product-comment" className="px-1 text-lg"> Comment: </label>
                    <input id="product-comment" type="text"
                           className="border-2 rounded w-full md:w-3/4 p-2 outline-emerald-700/50"
                           placeholder="Comment..."
                           name="comment"
                           required={false}
                           value={productComment}
                           onChange={changeCommentHandler}
                    />
                </div>
                <ErrorMessage error={errorComment}/>
                <div className="md:flex justify-between items-center mb-2">
                    <label htmlFor="product-image"
                           className="py-2 px-1 text-lg">
                        Product Photo <span className="text-red-600 font-bold">* </span>:
                    </label>
                    <input id="product-image"
                           type="file"
                           ref={fileInput}
                           multiple={false}
                           required={true}
                           className="border-2 rounded w-full md:w-3/4 p-2 outline-emerald-700/50"
                           name="image"
                    />

                </div>
                <ErrorMessage error={errorImage}/>

                <button type="submit"
                        className="outline-emerald-700/30 outline-offset-2 px-4 py-2 mt-4 border rounded-lg bg-green-800 hover:bg-green-700 text-lg text-white">
                    Save
                </button>
            </form>
        </>
    );
}