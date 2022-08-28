import React, {useState} from "react";
import {useFabrics} from "../../hooks/fabrics";
import {Loader} from "../../components/Loader";
import {ErrorMessage} from "../../components/ErrorMessage";
import Modal from "../../components/Modal";
import CreateFabric from "../../forms/CreateFabric/index";
import {Fabric} from "../../components/Fabric";

export default function HomePage() {

    const {fabrics, loading, error} = useFabrics();
    const [modal, setModal] = useState(false);
    return (
        <>
            <div className="container mx-auto pt-16 max-w-4xl flex flex-wrap">
                {loading && <Loader/>}
                {error && <ErrorMessage error={error}/>}
                {fabrics.map(fabric =>
                    <Fabric fabric={fabric} key={fabric.id}/>
                )}
                {modal && <Modal title="Create Fabric">
                    <CreateFabric/>
                </Modal>}
                {!modal && <button
                    className="px-4 py-2 fixed right-10 bottom-10 bg-amber-600 hover:bg-amber-600/80 text-2xl text-white rounded-lg"
                    onClick={event => setModal(true)}
                >
                    Add new
                </button>}
            </div>
        </>
    );
};