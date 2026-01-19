import {TopicData} from "@/types/analytics";

const TrendingTopicRow = ({ label, percentage, width }: TopicData) => (
    <div className="space-y-1">
        <div className="flex justify-between text-xs font-bold">
            <span className="text-slate-600">{label}</span>
            <span className="text-blue-500">{percentage}%</span>
        </div>
        <div className="h-2.5 w-full rounded-full overflow-hidden bg-slate-100">
            <div
                className="h-full bg-blue-500 rounded-full animate-in slide-in-from-left duration-1000"
                style={{ width: width }}
            ></div>
        </div>
    </div>
);

export default TrendingTopicRow;