import React, {useState} from "react";

import {IProduct} from "../../models/IProduct";

interface ProductProps {
    product: IProduct
}

export function Product({product}: ProductProps) {
    const [desc, setDesc] = useState(false);
    const BtnBgClassName = desc ? 'bg-amber-600 text-amber-50' : 'bg-green-700/90 text-green-50';
    const BtnClasses = [' mt-2 px-4 py-2 text-xl rounded-lg my-2', BtnBgClassName]
    return (
        <div className="border rounded flex flex-col items-center mb-2 py-2 px-4 w-[85%] md:w-[45%] mx-auto">
            <img src={product.image} alt={product.title} className="w-1/3 block  my-auto "/>
            <h2 className="text-emerald-600 text-xl py-2 px-4">{product.title}</h2>

            <p className=" text-2xl md:text-xl font-bold w-full text-center border-t-2">RUB {product.price}</p>
            <button
                className={BtnClasses.join(' ')}
                onClick={() => setDesc(prevState => !prevState)}
            >
                {desc ? 'Hide details' : 'Show details'}
            </button>
            {desc && <div className="">
                <p>{product.description}</p>
                <p className="text-2xl">
                    Rate: <span className="font-bold text-emerald-600">
                    {product.rating.rate}
                </span></p>
            </div>}
        </div>
    );
}
