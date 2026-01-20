import {Icons} from "@/components/icons";
import {AddAgentCardProps} from "@/types";

export default function AddAgentCard({onClick}: AddAgentCardProps) {
    return (
        <div
            className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-8 hover:border-blue-500 hover:bg-blue-600/5 transition-all cursor-pointer group h-full min-h-[250px] border-slate-200"
            onClick={onClick}
        >
            <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-all bg-slate-200 text-slate-400 group-hover:bg-blue-600 group-hover:text-white">
                <Icons.addIcon/>
            </div>
            <p className="font-bold group-hover:text-blue-600 transition-colors text-slate-600">New Agent</p>
        </div>
    )
}