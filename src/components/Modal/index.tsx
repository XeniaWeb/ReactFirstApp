import React from 'react';

interface ModalProps {
    children: React.ReactNode;
    title: string;
}
export default function Modal({children, title}: ModalProps) {
    return (
        <>
            <div className="fixed top-0 bottom-0 left-0 right-0 bg-green-900/60" />
            <div className="w-[600px] m-2 absolute p-5 rounded top-20 left-1/2 -translate-x-1/2 bg-stone-50">
                <h1 className="text-center text-2xl mb-2 text-emerald-900">{title}</h1>
                {children}
            </div>
        </>
    );
}
