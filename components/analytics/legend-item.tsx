import {LegendItemProps} from "@/types/analytics";

const LegendItem = ({ color, label, percentage }: LegendItemProps) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
            <span className="text-xs font-bold text-slate-500">{label}</span>
        </div>
        <span className="text-xs font-black text-slate-900">{percentage}%</span>
    </div>
);
export default LegendItem;