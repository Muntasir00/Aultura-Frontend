import React from 'react';
import {StatItem} from "@/types/analytics";

const AnalyticsStatCard = ({item}: { item: StatItem }) => {
    return (
        <div className="p-6 border rounded-3xl bg-white border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                {/* Icon Container with dynamic color */}
                <div className={`p-2 rounded-lg bg-slate-50 ${item.iconColorClass}`}>
                    {item.icon}
                </div>
                {/* Trend Badge with dynamic color */}
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${item.trendColorClass}`}>
                    {item.trend}
                </span>
            </div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                {item.title}
            </div>
            <div className="text-3xl font-black text-slate-900">
                {item.value}
            </div>
        </div>
    );
};

export default AnalyticsStatCard;
