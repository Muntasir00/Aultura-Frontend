import {Tool} from "@/types/tool";
import ToolCard from "@/components/tools/tool-card";
import {Icons} from "@/components/icons";
import CreateToolButton from "@/components/tools/create-tool-button";

const toolsData: Tool[] = [
    {
        id: 1,
        icon: "🔍",
        title: "Knowledge Query",
        category: "Query",
        description: "Search the knowledge base for specific information during a call.",
    },
    {
        id: 2,
        icon: "🚪",
        title: "Hang Up",
        category: "End call",
        description: "Gracefully terminate the call after finishing the objective.",
    },
    {
        id: 3,
        icon: "📅",
        title: "G-Calendar",
        category: "Google calendar",
        description: "Sync events and check availability in Google Calendar.",
    },
    {
        id: 4,
        icon: "💬",
        title: "Slack Alert",
        category: "Slack",
        description: "Send a notification to a Slack channel when a call ends.",
    },
];

export default function Page() {
    return (
        <>
            <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h3 className="text-3xl font-extrabold mb-3 text-slate-900">Tools</h3>
                    <p className="max-w-2xl text-lg text-slate-600">
                        Extend your agents&#39; capabilities with custom webhooks,
                        knowledge queries, and third-party integrations.
                    </p>
                </div>
                <CreateToolButton/>
                {/*<button*/}
                {/*    className="cursor-pointer px-6 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 flex items-center gap-2">*/}
                {/*    <Icons.addIcon/>*/}
                {/*    Create New Tool*/}
                {/*</button>*/}
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {toolsData.map((tool) => (
                    <ToolCard key={tool.id} tool={tool}/>
                ))}
            </div>

        </>
    )
}