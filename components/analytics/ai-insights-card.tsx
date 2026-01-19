import React from 'react';
import {AiInsightsCardProps} from "@/types/analytics";

export const AiInsightsCard: React.FC<AiInsightsCardProps> = ({
                                                                  title = "AI Insights",
                                                                  badgeText = "Updated Just Now",
                                                                  content,
                                                                  recommendation
                                                              }) => {
    return (
        <div className="p-8 border rounded-3xl relative overflow-hidden transition-all duration-500 hover:shadow-2xl mb-8 bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
            {/*<div className="flex items-start gap-6 relative z-10">*/}
                {/* Icon Section */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg bg-blue-600 text-white shrink-0">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                </div>

                <div className="flex-1 w-full">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                        <h4 className="text-xl font-black text-slate-900">{title}</h4>
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                            {badgeText}
                        </span>
                    </div>

                    {/* Content Body */}
                    <div className="space-y-4">
                        <p className="text-sm leading-relaxed text-slate-700">
                            {content}
                        </p>

                        {/* Recommendation Box (Only renders if prop is provided) */}
                        {recommendation && (
                            <div className="p-4 rounded-2xl border bg-white border-slate-100 shadow-sm">
                                <h5 className="text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2 text-blue-600">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                    Action Recommendation
                                </h5>
                                <p className="text-xs leading-relaxed text-slate-600">
                                    {recommendation}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Background Effects */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>
    );
};