"use client"

import AgentCard from "@/components/agents/agent-card";
import AddAgentCard from "@/components/agents/add-agent-card";
import {useRouter} from "next/navigation";

const agentsData = [
    {
        id: 1,
        name: "Sarah Support",
        role: "Customer Success",
        description: "Specializes in empathetic problem solving and product guidance.",
        icon: "🎧",
    },
    {
        id: 2,
        name: "Max Market",
        role: "Sales Executive",
        description: "Persuasive, high-energy, and expert in product features.",
        icon: "💼",
    },
];

const AgentGrid = () => {
    const router = useRouter();

    const handleEdit = (id: number) => console.log("Edit", id);
    const handleDelete = (id: number) => console.log("Delete", id);
    const handleCall = (id: number) => console.log("Call", id);
    const handleChat = (id: number) => console.log("Chat", id);
    const handleAddNew = () => router.push("/new");

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* MAP THROUGH DATA */}
            {agentsData.map((agent) => (
                <AgentCard
                    key={agent.id}
                    agent={agent}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onCall={handleCall}
                    onChat={handleChat}
                />
            ))}

            {/* STATIC ADD BUTTON AT THE END */}
            <AddAgentCard onClick={handleAddNew}/>
        </div>
    )
}

export default AgentGrid;