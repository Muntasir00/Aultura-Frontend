import React from 'react';
import {VoiceProps} from "@/types/voice-studio";

export const VoiceCard: React.FC<VoiceProps> = ({
                                                    name,
                                                    icon,
                                                    description,
                                                    latency,
                                                    onPlay
                                                }) => {
    return (
        <div className="p-6 border rounded-2xl flex flex-col transition-all bg-white border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-slate-100">
                    {icon}
                </div>
                <button
                    onClick={onPlay}
                    className="p-3 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div>
            <h4 className="text-xl font-bold mb-1 text-slate-900">{name}</h4>
            <p className="text-sm leading-relaxed mb-6 flex-1 text-slate-600">
                {description}
            </p>
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-700/50">
        <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">
          Latency Impact
        </span>
                <span className="text-xs font-bold text-emerald-500">
          {latency}
        </span>
            </div>
        </div>
    );
};