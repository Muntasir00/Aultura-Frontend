"use client"
import React, {useState} from 'react';
import {Icons} from "@/components/icons";
import {ToolFormData} from "@/types/tool";
import {CreateToolModal} from "@/components/tools/create-tool-modal";

const CreateToolButton = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    // Function to handle saving the data
    const handleSaveTool = (data: ToolFormData) => {
        console.log("Saving Tool Data:", data);

        // Add your API call here...

        // Then close modal
        setIsCreateModalOpen(false);
    };
    return (
        <>
            <button
                className="cursor-pointer px-6 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 flex items-center gap-2"
                onClick={() => setIsCreateModalOpen(true)}
            >
                <Icons.addIcon/>
                Create New Tool
            </button>
            <CreateToolModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSave={handleSaveTool}
            />
        </>
    );
};

export default CreateToolButton;