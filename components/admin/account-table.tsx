"use client"
import React, {useState} from 'react';
import {Account} from "@/types/admin";
import AccountRow from "@/components/admin/account-row";

export const accountsData: Account[] = [
    {
        id: "1",
        name: "Alice Cooper",
        company: "Globex Corp",
        email: "alice@globex.com",
        revenue: "$1,624.00",
        tier: "Enterprise",
        successRate: "95%",
        callCount: 1240,
        status: "Active"
    },
    {
        id: "2",
        name: "Bob Vance",
        company: "Acme Inc",
        email: "bob@acme.io",
        revenue: "$329.99",
        tier: "Pro",
        successRate: "91%",
        callCount: 450,
        status: "Active"
    },
    {
        id: "3",
        name: "Sarah Connor",
        company: "Cyberdyne",
        email: "s.connor@cyberdyne.tech",
        revenue: "$551.50",
        tier: "Enterprise",
        successRate: "90%",
        callCount: 89,
        status: "Suspended"
    },
    {
        id: "4",
        name: "Gavin Belson",
        company: "Hooli",
        email: "gavin@hooli.xyz",
        revenue: "$6,749.00",
        tier: "Enterprise",
        successRate: "97%",
        callCount: 8900,
        status: "Active"
    },
    {
        id: "5",
        name: "Jared Dunn",
        company: "Pied Piper",
        email: "jared@piedpiper.com",
        revenue: "$29.99",
        tier: "Pro",
        successRate: "100%",
        callCount: 0,
        status: "Pending"
    },
];

export const AccountTable = () => {
    const [accounts, setAccounts] = useState<Account[]>(accountsData);
    const handleStatusToggle = (id: string) => {
        setAccounts((prevAccounts) =>
            prevAccounts.map((account) => {
                if (account.id === id) {
                    // Logic: If Active -> Suspended, else -> Active
                    const newStatus = account.status === 'Active' ? 'Suspended' : 'Active';
                    return {...account, status: newStatus};
                }
                return account;
            })
        );
    };

    return (
        <div className="border rounded-2xl overflow-hidden bg-white border-slate-200 shadow-sm">
            <div
                className="p-6 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50">
                <h4 className="font-bold">Account Management</h4>
                <div className="flex gap-2 flex-wrap w-full sm:w-auto">
                    <input
                        placeholder="Search..."
                        className="flex-1 sm:w-64 px-4 py-2 rounded-xl text-sm border focus:outline-none focus:border-blue-500 bg-white border-slate-200"
                        type="text"
                    />
                    <button
                        className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-900/20">
                        Filter
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left min-w-[800px]">
                    <thead>
                    <tr className="text-[10px] uppercase tracking-widest font-black bg-slate-50 text-slate-400">
                        <th className="px-6 py-4">Account / Company</th>
                        <th className="px-6 py-4">Financials MTD</th>
                        <th className="px-6 py-4">Performance</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {accounts.map((account) => (
                        <AccountRow
                            key={account.id}
                            data={account}
                            onStatusToggle={handleStatusToggle}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};