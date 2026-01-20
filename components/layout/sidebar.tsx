"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {Icons} from "@/components/icons";

const navItems = [
    {label: "Agents", href: "/", icon: Icons.agent},
    {label: "Tools", href: "/tools", icon: Icons.tools},
    {label: "Phone Numbers", href: "/phone-numbers", icon: Icons.phoneNumber},
    {label: "Voice Studio", href: "/voice-studio", icon: Icons.voiceStudio},
    {label: "API Keys", href: "/api-keys", icon: Icons.apiKeys},
    {label: "Integrations", href: "/integrations", icon: Icons.integrations},
    {label: "Analytics", href: "/analytics", icon: Icons.analytics},
    {label: "Settings", href: "/settings", icon: Icons.settings},
];

export default function Sidebar({isAdmin = false}: { isAdmin?: boolean }) {
    const pathname = usePathname();

    return (

        <aside
            className="dark:bg-[#0f172a] w-64 border-r flex flex-col fixed inset-y-0 z-[70] transition-all duration-300 border-slate-200 bg-white -translate-x-full md:translate-x-0">
            <div className="p-6">
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 text-xl">
                            A
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Altura</h1></div>
                    <button className="md:hidden text-slate-500 cursor-pointer">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href === "/agents" && pathname === "/");
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                                    isActive
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40" // Active Style
                                        : "text-slate-500 hover:text-slate-900 hover:bg-slate-200" // Inactive Style
                                )}
                            >
                                {/* Dynamic Icon */}
                                <item.icon className="w-5 h-5"/>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}


                    {isAdmin && (() => {
                        const isActive = pathname === "/admin"
                        return (<div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                                <Link
                                    href="/admin"
                                    className={cn(
                                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                                        isActive
                                            ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40" // Active Style
                                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-200" // Inactive Style
                                    )}
                                >
                                    <Icons.adminPanel className="w-5 h-5"/>
                                    <span>Admin Panel</span>
                                </Link>
                            </div>
                        )
                    })()}

                </nav>
            </div>
            <div className="mt-auto p-6 border-t border-slate-200">
                <div className="flex items-center gap-3">
                    <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-slate-200 text-slate-700">JD
                    </div>
                    <div><p className="text-sm font-medium text-slate-900">John Doe</p><p
                        className="text-xs text-slate-500">Owner Access Access</p></div>
                </div>
            </div>
        </aside>

    );
}