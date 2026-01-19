import React, {useEffect} from 'react';
import {CreateToolModalProps} from "@/types/tool";
import ToolForm from "@/components/tools/tool-form";


export const CreateToolModal: React.FC<CreateToolModalProps> = ({
                                                                    isOpen,
                                                                    onClose,
                                                                    onSave
                                                                }) => {

    const handleFormSubmit = (data: any) => {
        console.log("Valid Form Data:", data);
        // ১. এখানে ডেটা সেভ করার লজিক লিখুন (API Call)
        if (onSave) onSave(data);
        // ২. কাজ শেষ হলে মডাল বন্ধ করুন
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        // Cleanup function (যখন component unmount হবে)
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        // Backdrop
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">

            {/* Modal Container */}
            <div
                className="w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border flex flex-col overflow-hidden bg-white border-slate-200">

                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-slate-50 border-slate-100">
                    <h4 className="font-bold text-lg text-slate-900">Create New Tool</h4>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-red-500 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>

                {/* Scrollable Form Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar">

                    <ToolForm
                        formId="tool-editor-form"
                        onSuccess={handleFormSubmit}
                    />

                </div>

                {/* Footer Buttons */}
                <div className="p-6 border-t flex justify-end gap-4 bg-slate-50 border-slate-200">
                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer px-12 py-3 rounded-xl font-bold transition-all active:scale-95 bg-slate-200 hover:bg-slate-300 text-slate-700"
                    >
                        Cancel
                    </button>
                    <button
                        form="tool-editor-form"
                        type="submit"
                        className="cursor-pointer px-12 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 active:scale-95 transition-all whitespace-nowrap"
                    >
                        Save Tool
                    </button>
                </div>

            </div>
        </div>
    );
};