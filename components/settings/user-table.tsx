import React from 'react';
import {User} from "@/types/settings";

const usersData: User[] = [
    {
        id: 1,
        initials: "JD",
        name: "John Doe",
        email: "john@altura.ai",
        role: "Admin",
        status: "Active"
    },
    {
        id: 2,
        initials: "SS",
        name: "Sarah Smith",
        email: "sarah@altura.ai",
        role: "Member",
        status: "Active"
    },
    {
        id: 3,
        initials: "MC",
        name: "Michael Chen",
        email: "michael@external.io",
        role: "Viewer",
        status: "Pending"
    },
];

// 3. Helper for Badge Colors
const getRoleBadgeClass = (role: string) => {
    if (role === 'Admin') return "bg-purple-500/10 text-purple-500";
    return "bg-blue-500/10 text-blue-500";
};

// 4. Helper for Status Dot Colors
const getStatusDotClass = (status: string) => {
    if (status === 'Active') return "bg-emerald-500";
    if (status === 'Pending') return "bg-amber-500";
    return "bg-slate-300";
};

const UserTable = () => {
    return (
        <table className="w-full text-left">
            <thead>
            <tr className="text-[10px] uppercase tracking-widest font-black bg-slate-50 text-slate-400">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
            {usersData.map((user) => (
                <tr key={user.id} className="text-sm">
                    {/* User Column */}
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs bg-slate-100 text-slate-600">
                                {user.initials}
                            </div>
                            <div>
                                <div className="font-bold text-slate-900">{user.name}</div>
                                <div className="text-[10px] text-slate-500">{user.email}</div>
                            </div>
                        </div>
                    </td>

                    {/* Role Column */}
                    <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-tight ${getRoleBadgeClass(user.role)}`}>
                                {user.role}
                            </span>
                    </td>

                    {/* Status Column */}
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${getStatusDotClass(user.status)}`}></div>
                            <span className="text-xs font-medium">{user.status}</span>
                        </div>
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4 text-right">
                        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                            </svg>
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default UserTable;