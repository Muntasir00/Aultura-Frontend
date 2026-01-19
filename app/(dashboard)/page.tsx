import AgentGrid from "@/components/agents/agent-grid";


export default function AgentsPage() {
    return (
        <>
            <div className="mb-10 text-center md:text-left"><h3
                className="text-2xl sm:text-3xl font-extrabold mb-3 text-slate-900">
                Altura Call Automation
            </h3>
                <p
                    className="max-w-2xl text-lg text-slate-600">
                    Deploy custom-built voices for any use case. Connect them
                    to your phone lines in seconds.
                </p>
            </div>
            <AgentGrid/>
        </>
    );
}