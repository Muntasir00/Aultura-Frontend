"use client"
import React, {useState} from 'react';
import {Tool} from "@/types/tool";
import {Icons} from "@/components/icons";
import {ToolDeleteModal} from "@/components/tools/tool-delete-modal";

const ToolCard = ({tool}: { tool: Tool }) => {
    // State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // State to track which item is being deleted
    const [selectedToolId, setSelectedToolId] = useState<string | null>(null);

    // 1. Function called when user clicks the Trash icon on a tool
    const initiateDelete = (id: string) => {
        setSelectedToolId(id);
        setIsModalOpen(true);
    };



    // 2. Function called when user clicks "Delete" inside the modal
    const handleConfirmDelete = () => {
        if (!selectedToolId) return;

        console.log(`Deleting tool with ID: ${selectedToolId}`);

        // ... Make your API call here ...

        // After success:
        setIsModalOpen(false);
        setSelectedToolId(null);
    };

    return (
        <div
            className="p-6 border rounded-2xl flex flex-col transition-all hover:shadow-lg bg-white border-slate-200 hover:border-blue-300 shadow-sm">
            {/* Header: Icon & Actions */}
            <div className="flex justify-between items-start mb-4">
                <div className="text-4xl">{tool.icon}</div>
                <div className="flex gap-1">
                    {/* Edit Button */}
                    <button className="cursor-pointer p-2 rounded-lg hover:bg-slate-100 text-slate-500">
                        <Icons.toolsEditIcon className="w-4 h-4"/>
                    </button>
                    {/* Delete Button */}
                    <button
                        className="cursor-pointer p-2 rounded-lg hover:text-red-500 transition-colors hover:bg-slate-100 text-slate-500"
                        onClick={() => initiateDelete('123')}
                    >
                        <Icons.toolsDeleteIcon className="w-4 h-4"/>
                    </button>
                </div>
            </div>

            {/* Content */}
            <h4 className="text-xl font-bold mb-2 text-slate-900">
                {tool.title}
            </h4>
            <div className="text-xs font-bold uppercase tracking-widest mb-3 text-blue-600">
                {tool.category}
            </div>
            <p className="text-sm leading-relaxed mb-6 flex-1 text-slate-600">
                {tool.description}
            </p>

            {/* --- PLUG THE MODAL IN HERE --- */}
            <ToolDeleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmDelete}
                // Optional overrides:
                // title="Remove Integration?"
                // description="Are you sure? This will break your agents."
            />
        </div>
    );
};

export default ToolCard;