import {StatItem} from "@/types/analytics";
import AnalyticsStatCard from "@/components/analytics/analytics-stat-card";

const statsData: StatItem[] = [
    {
        id: "calls",
        title: "Total Calls",
        value: "4,529",
        iconColorClass: "text-blue-500",
        trend: "+12%",
        trendColorClass: "bg-emerald-500/10 text-emerald-500",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
        )
    },
    {
        id: "success",
        title: "Success Rate",
        value: "94.2%",
        iconColorClass: "text-emerald-500",
        trend: "+0.5%",
        trendColorClass: "bg-emerald-500/10 text-emerald-500",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        )
    },
    {
        id: "duration",
        title: "Avg Duration",
        value: "3m 42s",
        iconColorClass: "text-purple-500",
        trend: "-15s",
        trendColorClass: "bg-red-500/10 text-red-500", // Notice the red color here
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        )
    },
    {
        id: "cost",
        title: "Total Cost",
        value: "$224.10",
        iconColorClass: "text-amber-500",
        trend: "+5%",
        trendColorClass: "bg-emerald-500/10 text-emerald-500",
        icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
        )
    }
];

export default function AnalyticsStatsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {statsData.map((stat) => (
                <AnalyticsStatCard key={stat.id} item={stat}/>
            ))}
        </div>
    );
}