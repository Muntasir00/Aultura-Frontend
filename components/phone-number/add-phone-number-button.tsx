"use client"

import {Icons} from "../icons";
import {useState} from "react";
import {AddNumberModal} from "@/components/phone-number/add-number-modal";

const AddPhoneNumberButton = () => {

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <>
            <button
                className="cursor-pointer px-6 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 flex items-center gap-2"
                onClick={() => setIsAddModalOpen(true)}
            >
                <Icons.addIcon/>
                Add a New Number
            </button>

            <AddNumberModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />

        </>
    );
};

export default AddPhoneNumberButton;