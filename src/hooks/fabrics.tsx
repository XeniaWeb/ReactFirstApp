import {useEffect, useState} from "react";
import {IFabric} from "../models/IFabric";
import axios, {AxiosError} from "axios";

export function useFabrics() {
    const [fabrics, setFabrics] = useState<IFabric[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function fetchFabrics() {
        try {
            setError('');
            setLoading(true);
            const response = await axios.get<IFabric[]>('https://fakestoreapi.com/products?limit=6');
            setFabrics(response.data);
            setLoading(false);
        } catch (e: unknown) {
            const error = e as AxiosError;
            setLoading(false);
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchFabrics();
    }, []);

    return {fabrics, loading, error};
}