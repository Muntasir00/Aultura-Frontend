"use client";

import { useState } from "react";
import { ApiKeyData } from "@/types/api-keys";

interface ApiKeyRowProps {
    data: ApiKeyData;
}

export const ApiKeyRow = ({ data }: ApiKeyRowProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    // Copy Handler
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(data.value);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy", err);
        }
    };

    // Delete/Revoke Handler (Simulated)
    const handleRevoke = () => {
        // এখানে Server Action কল করা যেতে পারে
        console.log("Revoking key:", data.id);
        alert(`Revoking ${data.name}`);
    };

    return (
        <tr className="text-sm group transition-colors hover:bg-slate-50">
            <td className="px-6 py-4 font-bold text-slate-900">{data.name}</td>
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <code className="font-mono bg-slate-900/50 px-2 py-1 rounded text-xs text-slate-600">
                        {isVisible ? data.value : "••••••••••••••••••••"}
                    </code>
                    <button
                        onClick={() => setIsVisible(!isVisible)}
                        className="text-slate-500 hover:text-blue-500 p-1 transition-colors"
                    >
                        {isVisible ? (
                            // Eye Off Icon
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        ) : (
                            // Eye Icon
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </td>
            <td className="px-6 py-4 text-slate-500 text-xs">{data.created}</td>
            <td className="px-6 py-4 text-slate-500 text-xs">{data.lastUsed}</td>
            <td className="px-6 py-4 text-right">
                <div className="flex justify-end items-center gap-2">
                    <button
                        onClick={handleCopy}
                        className="p-2 rounded-lg transition-all hover:bg-slate-100 text-slate-500"
                        title="Copy Key"
                    >
                        {isCopied ? (
                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                            </svg>
                        )}
                    </button>
                    <button
                        onClick={handleRevoke}
                        className="p-2 rounded-lg transition-all hover:text-red-500 hover:bg-slate-100 text-slate-500"
                        title="Revoke Key"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            </td>
        </tr>
    );
};