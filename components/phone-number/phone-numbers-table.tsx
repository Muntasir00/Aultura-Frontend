"use client"
import React, {useState} from "react";
import {ManagePhoneNumberModal} from "@/components/phone-number/manage-phone-number-modal"; // আইকনের জন্য

// ১. ডেটা টাইপ ডিফাইন করা (TypeScript এর জন্য ভালো)
interface PhoneNumber {
    id: number;
    number: string;
    provider: string;
    type: string;
    label: string;
    agent: {
        name: string;
        icon: string; // ইমোজি বা আইকন URL
    };
    status: "active" | "inactive";
}

// ২. ডামি ডেটা তৈরি করা (API থেকে আসলে এটা রিপ্লেস হবে)
const phoneNumbers: PhoneNumber[] = [
    {
        id: 1,
        number: "+1 (415) 555-0123",
        provider: "Twilio",
        type: "local",
        label: "Primary Support Line",
        agent: {name: "Sarah Support", icon: "🎧"},
        status: "active",
    },
    {
        id: 2,
        number: "+1 (800) 123-4567",
        provider: "Vonage",
        type: "toll-free",
        label: "Main Sales Inbound",
        agent: {name: "Max Market", icon: "💼"},
        status: "active",
    },
    {
        id: 3,
        number: "+44 20 7123 4567",
        provider: "Twilio",
        type: "international",
        label: "UK Support",
        agent: {name: "John Doe", icon: "🇬🇧"},
        status: "inactive",
    },
];

export default function PhoneNumbersTable() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const selectedPhoneData = {
        label: "Primary Support Line",
        agentId: "1",
        phoneNumber: "+1 (415) 555-0123"
    };

    const handleSave = (data: any) => {
        console.log("Updating...", data);
        // API call simulation
        setTimeout(() => setIsModalOpen(false), 1000);
    };

    const handleRelease = () => {
        if (confirm("Are you sure you want to release this number?")) {
            console.log("Releasing number...");
            setIsModalOpen(false);
        }
    };
    return (
        <div className="border rounded-2xl overflow-hidden bg-white border-slate-200 shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[700px]">

                    {/* Table Header */}
                    <thead>
                    <tr className="text-[10px] uppercase tracking-widest font-black bg-slate-50 text-slate-400">
                        <th className="px-6 py-4 w-60 xl:w-auto">Number / Provider</th>
                        <th className="px-6 py-4 w-48 xl:w-auto">Label</th>
                        <th className="px-6 py-4 w-56 xl:w-auto">Linked Agent</th>
                        <th className="px-6 py-4 xl:w-auto">Status</th>
                        <th className="px-6 py-4 text-right xl:w-auto">Actions</th>
                    </tr>
                    </thead>

                    {/* Table Body with Mapping */}
                    <tbody className="divide-y divide-slate-100">
                    {phoneNumbers.map((item) => (
                        <tr
                            key={item.id}
                            className="text-sm group transition-colors hover:bg-slate-50"
                        >
                            {/* Column 1: Number & Provider */}
                            <td className="px-6 py-4">
                                <div className="font-bold text-slate-900">
                                    {item.number}
                                </div>
                                <div className="text-xs text-slate-500">
                                    {item.provider} • {item.type}
                                </div>
                            </td>

                            {/* Column 2: Label */}
                            <td className="px-6 py-4 font-medium">
                                {item.label}
                            </td>

                            {/* Column 3: Linked Agent */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl">{item.agent.icon}</span>
                                    <span className="font-semibold text-blue-600">
                                          {item.agent.name}
                                        </span>
                                </div>
                            </td>

                            {/* Column 4: Status (Conditional Styling) */}
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`w-2 h-2 rounded-full ${
                                            item.status === 'active'
                                                ? 'bg-emerald-500 animate-pulse'
                                                : 'bg-slate-300'
                                        }`}
                                    ></div>
                                    <span
                                        className={`text-[10px] font-black uppercase ${
                                            item.status === 'active'
                                                ? 'text-emerald-500'
                                                : 'text-slate-400'
                                        }`}
                                    >
                                      {item.status}
                                    </span>
                                </div>
                            </td>

                            {/* Column 5: Actions */}
                            <td className="px-6 py-4 text-right">
                                <button
                                    className="cursor-pointer p-2 rounded-lg transition-all hover:bg-slate-100 text-slate-500 hover:text-blue-600"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <ManagePhoneNumberModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={selectedPhoneData}
                onSave={handleSave}
                onRelease={handleRelease}
            />
        </div>
    );
}