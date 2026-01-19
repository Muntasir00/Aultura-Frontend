"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {Icons} from "@/components/icons";

const tabs = [
    {id: "general", label: "General Profile"},
    {id: "users", label: "User Management", icon: Icons.users},
    {id: "billing", label: "Billing & Payments", icon: Icons.billingIcon},
];

export const SettingsTabs = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // URL থেকে বর্তমান ট্যাব নেওয়া, না থাকলে 'general' ডিফল্ট
    const activeTab = searchParams.get("tab") || "general";

    const handleTabChange = (tabId: string) => {
        // URL আপডেট করা (পেজ রিলোড হবে না)
        router.push(`/settings?tab=${tabId}`, {scroll: false});
    };

    return (
        <div className="flex gap-8 border-b mb-8 overflow-x-auto ">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`cursor-pointer pb-4 flex items-center gap-2 text-sm font-bold transition-all relative whitespace-nowrap ${
                            isActive
                                ? "text-blue-500"
                                : "text-slate-400 hover:text-slate-600"
                        }`}
                    >
                        {/* আইকন (আপনার SVG এখানে বসবে) */}
                        {tab.icon && <tab.icon/>}

                        {tab.label}

                        {/* নীল বর্ডার লাইন */}
                        {isActive && (
                            <div
                                className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-t-full animate-in fade-in zoom-in duration-200"/>
                        )}
                    </button>
                );
            })}
        </div>
    );
};