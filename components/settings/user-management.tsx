import React from 'react';
import UserTable from "@/components/settings/user-table";

const UserManagement = () => {
    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex justify-between flex-wrap gap-4 items-center mb-6">
                <div>
                    <h4 className="text-lg font-bold">
                        Team Members
                    </h4>
                    <p className="text-sm text-slate-500">
                        Collaborate with your team on AI agent development.
                    </p>
                </div>
                <button
                    className="cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-all">
                    Invite Member
                </button>
            </div>

            <div className="border rounded-2xl overflow-hidden bg-white border-slate-200 shadow-sm">
                <div className="overflow-x-auto">
                    <UserTable/>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;