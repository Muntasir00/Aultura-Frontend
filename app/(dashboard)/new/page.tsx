"use client"

import React, {useState} from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {Braces} from "lucide-react"
import {
    Form,
} from "@/components/ui/form"
import {cn} from "@/lib/utils"
import VoiceConfiguration from "@/components/create-agent/voice-configuration";
import ToolsConfiguration from "@/components/create-agent/tools-configuration";
import AnalysisConfiguration from "@/components/create-agent/analysis-configuration";
import AdvancedConfiguration from "@/components/create-agent/advanced-configuration";
import ModelConfiguration from "@/components/create-agent/model-configuration";
import CreateAgent from "@/components/create-agent/create-agent";
import {AgentSummaryPanel} from "@/components/create-agent/agent-summary-panel";
import {useRouter} from "next/navigation";

// --- 1. Validation Schema ---
const agentFormSchema = z.object({
    icon: z.string().default("👤"),
    name: z.string().min(2, "Name is required"),
    role: z.string().min(2, "Role is required"),
    description: z.string().optional(),
    llmProvider: z.string(),
    model: z.string(),
    systemInstruction: z.string().min(10, "Instruction must be at least 10 characters"),
    firstMessage: z.string().min(2, "First message is required"),
    voiceProvider: z.string().default("ElevenLabs"),
    voiceSelection: z.string().default("zephyr-01"),
    stability: z.number().min(0).max(1).default(0.5),
    clarity: z.number().min(0).max(1).default(0.75),
    speed: z.number().min(0).max(5).default(1), // Speed can go higher usually
    styleExaggeration: z.number().min(0).max(1).default(0),
    backgroundSound: z.string().default("none"),
    tools: z.array(z.string()).default([]),
    enableCallSummary: z.boolean().default(true),
    evaluateSuccess: z.boolean().default(true),
    sentimentAnalysis: z.boolean().default(true),
    recordCalls: z.boolean().default(false),
    llmTemperature: z.number().min(0).max(2).default(0.7),
    silenceTimeout: z.number().min(500).max(5000).default(2000),
})

type AgentFormValues = z.infer<typeof agentFormSchema>

// Default Values
const defaultValues: AgentFormValues = {
    icon: "👤",
    name: "",
    role: "",
    description: "",
    llmProvider: "Google GenAI",
    model: "gemini-2.5",
    systemInstruction: "",
    firstMessage: "Hello, how can I help you today?",
    voiceProvider: "ElevenLabs",
    voiceSelection: "zephyr-01",
    stability: 0.5,
    clarity: 0.75,
    speed: 1,
    styleExaggeration: 0,
    backgroundSound: "",
    tools: [],
    enableCallSummary: true,
    evaluateSuccess: true,
    sentimentAnalysis: true,
    recordCalls: false,
    llmTemperature: 0.7,
    silenceTimeout: 2000
}

// --- 2. Main Page Component ---
export default function Page() {
    const [activeTab, setActiveTab] = useState("model")
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(agentFormSchema),
        defaultValues,
    })

    function onSubmit(data: AgentFormValues) {
        console.log("Creating Agent:", data)
        alert(JSON.stringify(data, null, 2))
    }

    const tabs = ["model", "voice", "tools", "analysis", "advanced"]

    return (
        <div className="max-w-5xl mx-auto pb-20 pt-10 px-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* --- LEFT COLUMN --- */}
                        <div className="flex-1 space-y-8">

                            {/* Header */}
                            <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
                                <h2 className="text-2xl font-black text-slate-900">Create New Agent</h2>
                                <button
                                    type="button"
                                    onClick={() => alert(JSON.stringify(form.watch(), null, 2))}
                                    className="cursor-pointer text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-500 flex items-center gap-1"
                                >
                                    <Braces className="w-3 h-3"/> View JSON Config
                                </button>
                            </div>

                            {/* Section 1: Agent Identity */}
                            <CreateAgent/>

                            {/* Section 2: Configuration Tabs */}
                            <div
                                className="border rounded-3xl overflow-hidden bg-white border-slate-200 shadow-sm ">
                                {/* Tab Navigation */}
                                <div
                                    className="flex border-b border-slate-700/50 overflow-x-auto no-scrollbar">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab}
                                            type="button"
                                            onClick={() => setActiveTab(tab)}
                                            className={cn(
                                                "cursor-pointer px-6 py-4 text-sm font-bold capitalize transition-all relative",
                                                activeTab === tab
                                                    ? "text-blue-600 "
                                                    : "text-slate-400 hover:text-slate-600"
                                            )}
                                        >
                                            {tab}
                                            {activeTab === tab && (
                                                <div
                                                    className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-t-full"></div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content Area */}
                                <div className="p-8">
                                    {activeTab === "model" && (
                                        <ModelConfiguration/>
                                    )}

                                    {/* Placeholder for other tabs */}
                                    {activeTab === "voice" && (
                                        <VoiceConfiguration/>
                                    )}
                                    {activeTab === "tools" && (
                                        <ToolsConfiguration/>
                                    )}
                                    {activeTab === "analysis" && (
                                        <AnalysisConfiguration/>
                                    )}
                                    {activeTab === "advanced" && (
                                        <AdvancedConfiguration/>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* --- RIGHT COLUMN (Sticky Sidebar) --- */}
                        <AgentSummaryPanel
                            latency="~470ms"
                            costPerMin="$0.05"
                            // isLoading={isSubmitting}
                            onCancel={() => router.push('/')}
                        />

                    </div>
                </form>
            </Form>
        </div>
    )
}