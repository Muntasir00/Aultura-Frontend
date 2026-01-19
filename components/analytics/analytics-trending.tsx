import React from 'react';

const AnalyticsTrending = ({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) => (
    <div className="p-8 border rounded-3xl bg-white border-slate-200 shadow-sm">
        <div className="mb-8 text-center sm:text-left">
            <h4 className="text-xl font-bold text-slate-900">{title}</h4>
            <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
        {children}
    </div>
);

export default AnalyticsTrending;