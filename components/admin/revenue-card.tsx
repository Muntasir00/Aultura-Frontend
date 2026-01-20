import {RevenueStatItem} from "@/types/admin";

const RevenueCard = ({ item }: { item: RevenueStatItem }) => {
    return (
        <div className="p-6 border rounded-2xl flex flex-col transition-all bg-white border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
                {/* Icon Wrapper with Dynamic Color */}
                <div className={`p-2 rounded-lg bg-slate-900/50 ${item.iconColorClass}`}>
                    {item.icon}
                </div>

                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    {item.label}
                </span>
            </div>

            <div className="text-2xl lg:text-3xl font-black text-slate-900">
                {item.value}
            </div>

            <div className="text-xs text-slate-500 font-bold mt-1">
                {item.subtext}
            </div>
        </div>
    );
};

export default RevenueCard;