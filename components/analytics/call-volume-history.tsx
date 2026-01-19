"use client"
import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

// ডামি ডাটা (আপনার অরিজিনাল গ্রাফের শেপ অনুযায়ী)
const data = [
    { name: 'Jan', volume: 200 },
    { name: 'Feb', volume: 450 },
    { name: 'Mar', volume: 400 },
    { name: 'Apr', volume: 250 },
    { name: 'May', volume: 700 },
    { name: 'Jun', volume: 550 },
    { name: 'Jul', volume: 400 },
    { name: 'Aug', volume: 650 },
    { name: 'Sep', volume: 750 },
    { name: 'Oct', volume: 400 },
    { name: 'Nov', volume: 550 },
    { name: 'Dec', volume: 300 },
];

const CallVolumeHistory = () => {
    return (
        <div className="p-8 border rounded-3xl mb-8 bg-white border-slate-200 shadow-sm">
            {/* হেডার সেকশন (অপরিবর্তিত) */}
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h4 className="text-xl font-black text-slate-900">Call Volume History</h4>
                    <p className="text-xs text-slate-500 font-medium">
                        Global call traffic over the selected timeline
                    </p>
                </div>
                <div className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-100 bg-slate-50 text-slate-600">
                    Interval: Daily
                </div>
            </div>

            {/* চার্ট সেকশন */}
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                    >
                        {/* গ্রেডিয়েন্ট ডেফিনিশন (আপনার SVG এর মত) */}
                        <defs>
                            <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        {/* গ্রিড লাইন (ড্যাশড এবং হালকা) */}
                        <CartesianGrid
                            strokeDasharray="4 4"
                            vertical={false}
                            stroke="rgba(0,0,0,0.05)"
                        />

                        {/* X-Axis (মাসগুলোর নাম) */}
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold',  }}
                            dy={10}
                        />

                        {/* টুলটিপ (হোভার করলে ডাটা দেখাবে) */}
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }}
                            itemStyle={{ color: '#3b82f6', fontSize: '12px', fontWeight: 'bold' }}
                            cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
                        />

                        {/* মেইন এরিয়া গ্রাফ */}
                        <Area
                            type="monotone"
                            dataKey="volume"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorVolume)"
                            activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default CallVolumeHistory;