"use client"
import {Icons} from "@/components/icons";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

interface HeaderProps {
    setIsOpen: (open: boolean) => void;
}

const pageTitles: Record<string, string> = {
    "/": "Agents Workshop",
    "/tools": "Tools",
    "/phone-numbers": "Phone Numbers",
    "/voice-studio": "Voice Studio",
    "/api-keys": "API Keys",
    "/integrations": "Integrations",
    "/analytics": "Analytics",
    "/settings": "Settings",
    "/admin": "Admin Panel",
};

const notifications = [
    {
        id: 1,
        title: "Call Completed",
        description: "Sarah Support finished a 5m call. Sentiment: Positive.",
        time: "2m ago",
        color: "bg-emerald-500",
    },
    {
        id: 2,
        title: "Appointment Booked",
        description: "Max Market scheduled a demo for Tomorrow at 10 AM.",
        time: "15m ago",
        color: "bg-blue-500",
    },
    {
        id: 3,
        title: "System Update",
        description: "Gemini 2.5 Flash is now faster in your region.",
        time: "1h ago",
        color: "bg-blue-500",
    },
    {
        id: 4,
        title: "Line Alert",
        description: "High latency detected on +1 (800) line.",
        time: "3h ago",
        color: "bg-amber-500",
    },
];

export default function Header({setIsOpen}: HeaderProps) {
    const [mounted, setMounted] = useState(false);
    const {theme, setTheme} = useTheme();
    const pathname = usePathname();
    const currentTitle = pageTitles[pathname];

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div
            className="dark:bg-[#0f172a] h-16 px-4 sm:px-8 border-b border-slate-200 bg-white sticky top-0 z-40"></div>; // লোডিং স্কেলেটন
    }
    return (
        <header
            className="dark:bg-[#0f172a] h-16 border-b flex items-center justify-between px-4 sm:px-8 transition-colors duration-300 sticky top-0 z-40 border-slate-200 bg-white/70 backdrop-blur-md">
            <div className="flex items-center gap-4">
                <button
                    className="md:hidden p-2 text-slate-500 cursor-pointer"
                    onClick={() => setIsOpen(true)}
                >
                    <Icons.bar/>
                </button>
                <h2 className="hidden sm:block text-sm font-semibold text-slate-400 uppercase tracking-widest truncate max-w-[150px] sm:max-w-none">
                    {currentTitle}
                </h2>
            </div>
            <div className="flex items-center gap-4 relative">
                <div className="flex items-center gap-1 p-1 rounded-lg border bg-slate-100 border-slate-200">
                    <button
                        className="px-3 py-1 rounded-md text-[10px] font-black tracking-widest transition-all bg-blue-600 text-white shadow-sm">EN
                    </button>
                    <button
                        className="px-3 py-1 rounded-md text-[10px] font-black tracking-widest transition-all text-slate-400 hover:text-slate-600">ES
                    </button>
                </div>
                <button
                    className="cursor-pointer p-2 rounded-lg transition-colors text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                    {theme === "dark" ? (
                        <Icons.darkIcon className="w-5 h-5"/> // Sun Icon for Dark Mode
                    ) : (
                        <Icons.lightIcon className="w-5 h-5"/>  // Moon Icon for Light Mode
                    )}
                </button>
                <div className="relative">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button
                                className="cursor-pointer p-2 rounded-lg transition-colors relative text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                                <Icons.notification/>
                                <span
                                    className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                        </DropdownMenuTrigger>

                        {/* Dropdown Content */}
                        <DropdownMenuContent
                            align="end"
                            className="w-80 p-0 rounded-2xl overflow-hidden bg-white border-slate-200 shadow-2xl"
                        >
                            {/* Header */}
                            <div className="px-4 py-3 border-b flex justify-between items-center bg-slate-50">
                                <h4 className="font-bold text-sm text-slate-900">Notifications</h4>
                                <button className="cursor-pointer text-[10px] uppercase font-black text-blue-500 hover:underline transition-all">
                                    Mark all read
                                </button>
                            </div>

                            {/* Scrollable List */}
                            <ScrollArea className="max-h-[400px] overflow-y-auto custom-scrollbar">
                                <div className="flex flex-col">
                                    {notifications.map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-4 border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors relative group cursor-pointer"
                                        >
                                            <div className="flex gap-3">
                                                {/* Status Dot */}
                                                <div
                                                    className={`w-2 h-2 mt-1.5 shrink-0 rounded-full ${item.color}`}
                                                />

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start gap-2">
                                                        <h5 className="text-xs font-black leading-tight text-slate-900">
                                                            {item.title}
                                                        </h5>
                                                        <span className="text-[9px] text-slate-500 whitespace-nowrap">
                        {item.time}
                      </span>
                                                    </div>
                                                    <p className="text-[11px] leading-relaxed mt-0.5 text-slate-600">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}