import React from 'react';
import {DeleteModalProps} from "@/types/tool";

export const ToolDeleteModal: React.FC<DeleteModalProps> = ({
                                                                isOpen,
                                                                onClose,
                                                                onConfirm,
                                                                title = "Delete Tool?",
                                                                description = "This action cannot be undone. Removing this tool will also disconnect it from any AI agents currently using it.",
                                                                isDeleting = false
                                                            }) => {
    if (!isOpen) return null;
    return (
        <div
            className="fixed inset-0 z-[300] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            // onClick={onClose}
        >
            <div
                className="w-full max-w-md rounded-2xl shadow-2xl border overflow-hidden p-8 text-center bg-white border-slate-200"
                onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
            >
                <div
                    className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl bg-red-600/10 text-red-500">
                    ⚠️
                </div>

                <h4 className="text-xl font-bold mb-2 text-slate-900">
                    {title}
                </h4>

                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                    {description}
                </p>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-red-900/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="flex-1 py-3 rounded-xl font-bold transition-all bg-slate-200 hover:bg-slate-300 text-slate-700 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};


// Prop	Type	Description
// isOpen	boolean	true shows the modal, false hides it.
//     onClose	function	Called when the user clicks "Cancel" or the background overlay.
//     onConfirm	function	Called when the user clicks the red "Delete" button.
//     title	string	(Optional) Replaces "Delete Tool?".
//     description	string	(Optional) Replaces the warning text.
//     isDeleting	boolean	(Optional) If true, disables buttons and shows "Deleting...".