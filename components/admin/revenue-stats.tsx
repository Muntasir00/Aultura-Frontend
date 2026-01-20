import RevenueCard from "@/components/admin/revenue-card";
import {RevenueStatItem} from "@/types/admin";
import {Icons} from "@/components/icons";

const revenueData: RevenueStatItem[] = [
    {
        id: "total",
        label: "Total Revenue",
        value: "$9,284.48",
        subtext: "Combined Monthly",
        iconColorClass: "text-emerald-500",
        icon: <Icons.revenueIcon/>
    },
    {
        id: "plan",
        label: "Plan Revenue",
        value: "$1,556.98",
        subtext: "Fixed MRR",
        iconColorClass: "text-blue-500",
        icon: <Icons.planIcon/>
    },
    {
        id: "usage",
        label: "Usage Revenue",
        value: "$7,727.50",
        subtext: "From 30,910 mins",
        iconColorClass: "text-purple-500",
        icon: <Icons.usageIcon/>
    }
];

export default function RevenueStats() {
    return (
        <>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-slate-400">Revenue Stream</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {revenueData.map((item) => (
                    <RevenueCard key={item.id} item={item}/>
                ))}
            </div>
        </>
    );
}