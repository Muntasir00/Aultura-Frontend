import React from 'react';
import {AccountRowProps} from "@/types/admin";
import {getStatusStyles} from "@/components/admin/helper";
import {Icons} from "@/components/icons";
import Link from "next/link";

const AccountRow = ({data, onStatusToggle}: AccountRowProps) => {
    // Helper to get colors (same as before)

    const statusStyle = getStatusStyles(data.status);

    // Check if user is active to decide which icon to show
    const isActive = data.status === 'Active';

    return (
        <tr className="text-sm group transition-colors cursor-pointer hover:bg-slate-50">
            {/* Account Info */}
            <td className="px-6 py-4">
                <div className="font-bold text-slate-900">{data.name}</div>
                <div className="text-xs text-slate-500">
                    {data.company} • {data.email}
                </div>
            </td>

            {/* Financials */}
            <td className="px-6 py-4">
                <div className="font-bold text-emerald-500">{data.revenue}</div>
                <span className="text-[10px] font-bold uppercase tracking-tight text-slate-400">
                    {data.tier}
                </span>
            </td>

            {/* Performance */}
            <td className="px-6 py-4">
                <div className="font-bold text-blue-500">{data.successRate} Success</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">
                    {data.callCount} Calls
                </div>
            </td>

            {/* Status Column */}
            <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${statusStyle.dot}`}></div>
                    <span className={`text-[10px] font-black uppercase ${statusStyle.text}`}>
                        {data.status}
                    </span>
                </div>
            </td>

            {/* Actions Column */}
            <td className="px-6 py-4 text-right">
                <div className="flex justify-end items-center gap-2">

                    {/* TOGGLE BUTTON */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent row click event
                            onStatusToggle(data.id);
                        }}
                        className={`cursor-pointer p-2 rounded-lg transition-all hover:bg-slate-100 ${isActive ? 'text-slate-500 hover:text-red-500' : 'text-slate-400 hover:text-emerald-500'}`}
                        title={isActive ? "Suspend Account" : "Activate Account"}
                    >
                        {isActive ? (
                            <Icons.suspendIcon/>
                        ) : (
                            <Icons.activateIcon/>
                        )}
                    </button>

                    <Link
                        href={`/admin/${data.id}`}>
                        <button
                            className="cursor-pointer px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all bg-slate-100 hover:bg-slate-200 text-slate-600">
                            View
                        </button>
                    </Link>
                </div>
            </td>
        </tr>
    );
};

export default AccountRow;