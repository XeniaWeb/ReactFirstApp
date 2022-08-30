import React from "react";
import {useFabrics} from "../../hooks/fabrics";
import {Loader} from "../../components/Loader";
import {ErrorMessage} from "../../components/ErrorMessage";
import {Fabric} from "../../components/Fabric";

export default function HomePage() {

    const {fabrics, loading, error} = useFabrics();
    return (
        <>
            <div className="container mx-auto pt-16 max-w-4xl flex flex-wrap">
                {loading && <Loader/>}
                {error && <ErrorMessage error={error}/>}
                {fabrics.map(fabric =>
                    <Fabric fabric={fabric} key={fabric.id}/>
                )}
            </div>
        </>
    );
};