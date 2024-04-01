"use client";

import AuthModal from "@/components/AuthModal";
// import Modal from "@/components/Modal";
import { useEffect, useState } from "react";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            {/* <Modal title="Test Modal" description="Modal Description" isOpen onChange={() => {}}>
                Test children
            </Modal> */}
            <AuthModal />
        </>
    );
}

export default ModalProvider;