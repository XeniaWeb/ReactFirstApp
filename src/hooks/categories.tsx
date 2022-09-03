import {useEffect, useState} from "react";
import {ICategory} from "../models/ICategory";
import axios, {AxiosError} from "axios";

export function useCategories() {
    const [listOfCategories, setListOfCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function fetchCategories() {
        try {
            setError('');
            setLoading(true);
            const response = await axios.get('https://shop-api/api/v1/categories');
            setListOfCategories(response.data.cats);
            setLoading(false);
        } catch (e: unknown) {
            //@todo вывод ошибок
            const error = e as AxiosError;
            setLoading(false);
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return {listOfCategories, loading, error};
}