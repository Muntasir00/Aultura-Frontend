"use client";
import React, {useState} from "react";
import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";

export default function DashboardLayout({children}: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className=" h-screen overflow-hidden transition-colors duration-300 bg-slate-50 flex">
            {/*<div className="flex min-h-screen transition-colors duration-300 bg-slate-50">*/}

            <Sidebar
                isAdmin={true}
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            {/* মেইন কন্টেন্ট এরিয়া */}
            {/*<main className="flex-1 transition-all duration-300 min-h-screen bg-slate-50 md:ml-64 dark:bg-[#0f172a]">*/}

            <div className="flex-1 md:ml-64 transition-all duration-300 overflow-y-auto overflow-x-hidden">

                <Header setIsOpen={setSidebarOpen}/>

                <div className="p-4 md:p-8">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}