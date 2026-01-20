import React from 'react';
import {MetricItem} from "@/types/admin";

const MetricCard = ({item}: { item: MetricItem }) => {
    return (
        <div className="p-6 border rounded-2xl bg-white border-slate-200 shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {item.title}
                </span>
                <span className={`text-xs font-bold ${item.badgeColorClass}`}>
                    {item.badgeText}
                </span>
            </div>

            {/* Main Big Number */}
            <div className="text-2xl lg:text-3xl font-black text-slate-900">
                {item.mainValue}
            </div>

            {/* Footer Logic: Renders Progress Bar OR Text based on data */}
            {item.percentage !== undefined ? (
                <div className="w-full h-1.5 bg-slate-700 rounded-full mt-4 overflow-hidden">
                    <div
                        className={`h-full ${item.progressBarColorClass}`}
                        style={{width: `${item.percentage}%`}}
                    ></div>
                </div>
            ) : (
                item.footerText && (
                    <div className="text-[10px] text-slate-500 mt-4 font-bold uppercase tracking-widest">
                        {item.footerText}
                    </div>
                )
            )}
        </div>
    );
};

export default MetricCard;