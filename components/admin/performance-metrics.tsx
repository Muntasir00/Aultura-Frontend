import {MetricItem} from "@/types/admin";
import MetricCard from "@/components/admin/metric-card";

const metricsData: MetricItem[] = [
    {
        id: "success",
        title: "Successful Calls",
        mainValue: "10,270",
        badgeText: "96%",
        badgeColorClass: "text-emerald-500",
        percentage: 96.1701,
        progressBarColorClass: "bg-emerald-500"
    },
    {
        id: "errors",
        title: "Workflow Errors",
        mainValue: "69",
        badgeText: "69 Errors",
        badgeColorClass: "text-red-500",
        percentage: 0.646128,
        progressBarColorClass: "bg-red-500"
    },
    {
        id: "engagement",
        title: "Engagement",
        mainValue: "10,679",
        badgeText: "3 Active",
        badgeColorClass: "text-blue-500",
        footerText: "Global Connections attempted"
    }
];


export default function PerformanceMetrics() {
    return (
        <>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-slate-400">Operational Health</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {metricsData.map((metric) => (
                    <MetricCard key={metric.id} item={metric}/>
                ))}
            </div>
        </>
    );
}