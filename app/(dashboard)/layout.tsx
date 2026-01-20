import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import {cn} from "@/lib/utils";

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode;
}) {
    // TODO: আসল প্রোজেক্টে এই ভ্যালুটা সার্ভার সেশন বা অথ থেকে আসবে
    const isAdmin = true;

    return (
        <div className="flex min-h-screen transition-colors duration-300 bg-slate-50">
            {/*<div className="flex min-h-screen bg-gray-50 font-sans">*/}
            {/* Sidebar - Fixed width */}
            <div className="hidden md:block">
                <Sidebar isAdmin={isAdmin}/>
            </div>

            {/* Main Content Area */}
            {/*<div className="flex-1 flex flex-col md:ml-64 transition-all duration-300">*/}
            <main className="flex-1 transition-all duration-300 min-h-screen bg-slate-50 md:ml-64 dark:bg-[#0f172a]">
                <Header/>

                {/* Page Content (Scrollable) */}
                {/*<main className="flex-1 p-8 overflow-y-auto">*/}
                <div className="p-4 sm:p-8">
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}