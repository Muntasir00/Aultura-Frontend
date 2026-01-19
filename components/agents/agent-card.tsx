import {Icons} from "../icons";
import React from "react";
import {AgentCardProps} from "@/types";

const AgentCard = ({agent, onEdit, onDelete, onCall, onChat}: AgentCardProps) => {
    return (
        <div
            className="border rounded-xl p-6 transition-all group relative flex flex-col h-full bg-white border-slate-200 hover:border-blue-400 hover:shadow-lg shadow-sm">
            <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">
                    {agent.icon}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(agent.id)}
                        className="cursor-pointer p-1 rounded-md transition-colors text-slate-400 hover:text-blue-500 hover:bg-slate-100"
                        title="Edit Agent"
                    >
                        <Icons.editIcon/>
                    </button>
                    <button
                        onClick={() => onDelete(agent.id)}
                        className="cursor-pointer p-1 rounded-md transition-colors text-slate-400 hover:text-red-500 hover:bg-slate-100"
                        title="Delete Agent"
                    >
                        <Icons.deleteIcon/>
                    </button>
                </div>
            </div>

            <h3 className="text-xl font-bold mb-1 text-slate-900">
                {agent.name}
            </h3>
            <p className="text-blue-500 text-sm font-semibold mb-3">
                {agent.role}
            </p>
            <p className="text-sm line-clamp-2 mb-6 flex-1 text-slate-600">
                {agent.description}
            </p>

            <div className="flex flex-col gap-2 mt-auto">
                <button
                    onClick={() => onCall(agent.id)}
                    className=" cursor-pointer w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-bold flex items-center justify-center gap-2 shadow-md"
                >
                    <Icons.callAgentIcon/>
                    Call Agent
                </button>
                <button
                    onClick={() => onChat(agent.id)}
                    className="cursor-pointer w-full py-2.5 border rounded-lg transition-colors font-bold flex items-center justify-center gap-2 border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                    <Icons.chatAgentIcon/>
                    Chat Agent
                </button>
            </div>
        </div>
    );
};

export default AgentCard;