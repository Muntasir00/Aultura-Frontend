"use client"
import React, {useState} from 'react';
import UpdateCardModal from "@/components/settings/update-card-modal";
import {Icons} from "@/components/icons";
import RecentInvoices from "@/components/settings/recent-invoices";
import CompanyBillingForm from "@/components/settings/company-billing-form";

const BillingSettings = () => {
    const [showModal, setShowModal] = useState(false);
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 border rounded-3xl bg-white border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="font-bold flex items-center gap-2">
                            <Icons.cardIcon/>
                            Card Information
                        </h4>
                        <button
                            className="cursor-pointer text-xs font-bold text-blue-500 hover:underline"
                            onClick={() => setShowModal(true)}
                        >
                            Update Card
                        </button>
                    </div>
                    <div className="relative group [perspective:1000px]">
                        <div
                            className="w-full h-44 rounded-2xl p-6 bg-gradient-to-br from-blue-600 to-indigo-900 text-white shadow-2xl transition-all group-hover:[transform:rotateY(12deg)]">
                            <div className="flex justify-between items-start">
                                <svg className="w-12 h-12 opacity-80" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M1 10h22v2H1v-2zm0 4h22v2H1v-2z" opacity=".2"></path>
                                    <rect x="1" y="4" width="22" height="16" rx="2" fill="none" stroke="currentColor"
                                          stroke-width="2"></rect>
                                </svg>
                                <span className="text-sm font-black italic tracking-widest">VISA</span></div>
                            <div className="mt-8 text-xl font-mono tracking-[0.2em]">•••• •••• •••• 4242</div>
                            <div className="mt-4 flex justify-between items-end">
                                <div>
                                    <div className="text-[10px] uppercase opacity-50 font-bold mb-1">Card Holder</div>
                                    <div className="text-sm font-bold truncate max-w-[150px]">JOHN DOE</div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase opacity-50 font-bold mb-1">Expires</div>
                                    <div className="text-sm font-bold">12 / 26</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 border rounded-3xl bg-white border-slate-200 shadow-sm">
                    <h4 className="font-bold mb-6 flex items-center gap-2">
                        <Icons.billingInfoIcon/>
                        Billing Info
                    </h4>
                    <CompanyBillingForm/>
                </div>
            </div>

            <RecentInvoices/>

            <UpdateCardModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            />

        </div>
    );
};

export default BillingSettings;