import React, {ChangeEvent, useState} from 'react';
import {IFabric} from "../../models/IFabric";
import axios from "axios";
import {ErrorMessage} from "../../components/ErrorMessage";

const fabricData: IFabric = {
    title: 'test fabric',
    price: 13.5,
    description: 'lorem ipsum set',
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    category: 'electronic',
    rating: {
        rate: 0,
        count: 0
    }
}

export default function CreateFabric() {
    const [fabricTitle, setFabricTitle] = useState('');
    const [errorTitle, setErrorTitle] = useState('');
    const [fabricDesc, setFabricDesc] = useState('');
    const [errorDesc, setErrorDesc] = useState('');

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrorTitle('')
        if (fabricTitle.trim().length < 5 ) {
            setErrorTitle(`Please enter valid title. ${fabricTitle.trim().length}` )
        }
        fabricData.title = fabricTitle;
        fabricData.description =fabricDesc;

        await axios.post<IFabric>('https://fakestoreapi.com/products', fabricData)


    };

    // const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setErrorTitle('');
        setFabricTitle(event.target.value);
        if (fabricTitle.trim().length < 4 ) {
            setErrorTitle(`Please enter valid title min 5 characters.` )
        }
    };
    const changeDescHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setErrorDesc('');
        setFabricDesc(event.target.value);
        if (fabricDesc.trim().length < 4 ) {
            setErrorDesc(`Please enter valid description min 5 characters.` )
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="md:flex justify-between items-center mb-2">
                <label htmlFor="fabric-title" className="px-1 text-lg"> Fabric&nbsp;Title: </label>
                <input id="fabric-title" type="text"
                       className="border-2 rounded w-full md:w-3/4 p-2 outline-emerald-700/50"
                       placeholder="Enter fabric name..."
                       name="title"
                       value={fabricTitle}
                       onChange={changeTitleHandler}
                       autoFocus
                />
            </div>
            <ErrorMessage error={errorTitle} />

            <div className="md:flex justify-between items-center mb-2">
                <label htmlFor="fabric-desc" className="px-1 text-lg"> Fabric&nbsp;Description: </label>
                <input id="fabric-desc" type="text"
                       className="border-2 rounded w-full md:w-3/4 p-2 outline-emerald-700/50"
                       placeholder="Fabric description..."
                       name="description"
                       value={fabricDesc}
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