"use client"
import React, {useState} from 'react';
import {ApiKeyData} from "@/types/api-keys";
import {ApiKeyRow} from "./api-key-row";
import {CreateKeyModal} from "@/components/api-key/create-key-modal";

interface ApiKeySectionProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    themeColor: "red" | "blue";
    keys: ApiKeyData[];
}

export const ApiKeySection = ({
                                  title,
                                  description,
                                  icon,
                                  themeColor,
                                  keys,
                              }: ApiKeySectionProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCreateKey = (data: { name: string }) => {
        setLoading(true);
        console.log("Creating Key:", data);

        // API Call Simulation
        setTimeout(() => {
            setLoading(false);
            setIsModalOpen(false);
        }, 1500);
    };

    const themeStyles = {
        red: "bg-red-500/10 text-red-500",
        blue: "bg-blue-500/10 text-blue-500",
    };

    return (
        <div className="border rounded-2xl overflow-hidden bg-white border-slate-200 shadow-sm">
            {/* Header */}
            <div
                className="p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-slate-100 bg-slate-50">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${themeStyles[themeColor]}`}>
                        {icon}
                    </div>
                    <div>
                        <h4 className="font-bold capitalize">{title}</h4>
                        <p className="text-xs text-slate-500">{description}</p>
                    </div>
                </div>
                {/* Create বাটন - এটাকে পরে চাইলে আলাদা ক্লায়েন্ট কম্পোনেন্ট বানাতে পারেন যদি মডাল খুলতে হয় */}
                <button
                    className="cursor-pointer text-xs font-bold text-blue-500 hover:underline flex items-center gap-1"
                    onClick={() => setIsModalOpen(true)}
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Create {title}
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[700px]">
                    <thead>
                    <tr className="text-[10px] uppercase tracking-widest font-black bg-slate-50 text-slate-400">
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Key</th>
                        <th className="px-6 py-4">Created</th>
                        <th className="px-6 py-4">Last Used</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {keys.map((key) => (
                        // এখানে আমরা ক্লায়েন্ট কম্পোনেন্ট কল করছি
                        <ApiKeyRow key={key.id} data={key}/>
                    ))}

                    {keys.length === 0 && (
                        <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-slate-500 text-sm">
                                No API keys found.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            <CreateKeyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateKey}
                isLoading={loading}
            />

        </div>
    );
};