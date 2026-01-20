import React from "react";
import {RECENT_INVOICES} from "@/components/settings/data";
import {Invoice} from "@/types/settings";
import {StatusBadge} from "@/components/settings/status-badge";
import {Icons} from "@/components/icons";

export default function RecentInvoices() {
    return (
        <div className="border rounded-3xl overflow-hidden bg-white border-slate-200 shadow-sm">

            {/* Header Section */}
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                <h4 className="font-bold text-slate-900">Recent Invoices</h4>
                <button className="cursor-pointer text-xs font-bold text-blue-500 hover:underline transition-all">
                    Download All
                </button>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                    <tr className="text-[10px] uppercase tracking-widest font-black bg-slate-50 text-slate-400">
                        <th className="px-6 py-4">Invoice ID</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Invoice</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    {RECENT_INVOICES.map((invoice) => (
                        <InvoiceRow key={invoice.id} invoice={invoice}/>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Sub-component for individual rows to keep main file clean
function InvoiceRow({invoice}: { invoice: Invoice }) {
    return (
        <tr className="text-sm group hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 font-bold text-slate-700">
                {invoice.id}
            </td>
            <td className="px-6 py-4 text-slate-500 font-medium">
                {invoice.date}
            </td>
            <td className="px-6 py-4 font-black text-slate-900">
                {invoice.amount}
            </td>
            <td className="px-6 py-4">
                <StatusBadge status={invoice.status}/>
            </td>
            <td className="px-6 py-4 text-right">
                <button
                    aria-label={`Download invoice ${invoice.id}`}
                    className="cursor-pointer p-2 rounded-lg transition-all hover:bg-slate-200 text-slate-400 hover:text-slate-600"
                >
                    <Icons.downLoadIcon/>
                </button>
            </td>
        </tr>
    );
}