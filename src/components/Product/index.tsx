import React, {useState} from "react";

import {IProduct} from "../../models/IProduct";

interface ProductProps {
    product: IProduct
}

export function Product({product}: ProductProps) {
    const [desc, setDesc] = useState(false);
    const BtnBgClassName = desc ? 'bg-amber-600/80 text-amber-50 font-medium' : 'bg-green-700/90 text-green-50';
    const BtnClasses = ['hidden sm:block min-w-[150px] transition-all mt-2 px-4 py-2 text-xl rounded-lg my-2 hover:shadow-xl', BtnBgClassName]

    return (
        <div
            className="transition-all ease-in-out delay-100 hover:shadow-lg relative border rounded flex flex-col items-center mb-2 py-2 px-4 w-[85%] md:w-[45%] mx-auto">
            <img src={product.image} alt={product.title} className="w-2/3 block  my-auto "/>
            <h2 className="text-emerald-600 text-xl py-2 px-4 break-all">{product.title}</h2>

            <p className=" text-2xl md:text-xl font-bold w-full text-center border-t-2">RUB {product.price}</p>
            <button
                className={BtnClasses.join(' ')}
                // onClick={() => setDesc(prevState => !prevState)}
                onClick={() => setDesc(false)}
                onMouseOver={() => setDesc(prevState => !prevState)}
                onMouseOut={() => setDesc(false)}
            >
                {desc ? 'Hide details' : 'Show details'}
            </button>
            <div className="hidden sm:block">
                {desc && <div
                    className="z-20 absolute top-[98%] left-2 right-2 bg-amber-50/95 p-4 border rounded-lg shadow-md">
                    <p><span className="font-black"></span>{product.description}</p>
                    {product?.comment && <p className="text-md italic mt-2"><span className="font-semibold">Comment: </span>{product?.comment}</p>}
                    <p className="text-xl mt-2">
                        Category: <span className="font-bold text-emerald-600">
                    {product.categoryId}
                </span></p>
                </div>}
            </div>
            <div className="sm:hidden p-4 mb-2">
                <p><span className="font-black"></span>{product.description}</p>
                {product?.comment && <p className="text-md italic mt-2"><span className="font-semibold">Comment: </span>{product?.comment}</p>}
                <p className="text-xl mt-2">
                    Category: <span className="font-bold text-emerald-600">
                    {product.categoryId}
                </span></p>
            </div>
        </div>
    );
}
