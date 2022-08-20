import React, {ChangeEvent, useState} from 'react';

export default function CreateProduct() {
    const [value, setValue] = useState('');

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <form onSubmit={submitHandler}>
            <input type="text"
                   className="border-2 rounded w-full p-2"
                   placeholder="Enter product name..."
                   value={value}
                   onChange={changeHandler}
            />
            <button type="submit" className="px-4 py-2 mt-4 border rounded-lg bg-green-800 hover:bg-green-700 text-lg text-white">
                Save
            </button>
        </form>
    );
}