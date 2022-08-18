import React, {useState} from "react";

import {IProduct} from "../../models/IProduct";

interface ProductProps {
    product: IProduct
}

export function Product({product}: ProductProps) {
    const [desc, setDesc] = useState(false);
    const BtnBgClassName = desc ? 'bg-amber-600 text-amber-50' : 'bg-green-600 text-green-50';
    const BtnClasses = [' mt-1 px-4 py-2 text-2xl rounded-lg my-2', BtnBgClassName]
    return (
        <div className="border rounded flex flex-col items-center mb-2 py-2 px-4">
            <img src={product.image} alt={product.title} className="w-1/6"/>
            <h2 className="text-emerald-600 text-3xl border-b-2 py-2 px-4">{product.title}</h2>
            <p className="text-2xl font-bold">RUB {product.price}</p>
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
