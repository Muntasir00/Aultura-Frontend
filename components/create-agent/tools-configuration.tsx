import React from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";

const AVAILABLE_TOOLS = [
    {
        id: "hangup",
        label: "Hang Up",
        description: "End call",
        icon: "🚪"
    },
    {
        id: "calendar",
        label: "G-Calendar",
        description: "Google calendar",
        icon: "📅"
    },
    {
        id: "slack",
        label: "Slack Alert",
        description: "Slack",
        icon: "💬"
    },
];

export default function ToolsConfiguration() {
    const form = useFormContext();

    return (
        <div className="animate-in fade-in duration-300">
            <FormField
                control={form.control}
                name="tools"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {AVAILABLE_TOOLS.map((tool) => {
                                    const isSelected = field.value?.includes(tool.id);
                                    return (
                                        <button
                                            key={tool.id}
                                            type="button"
                                            onClick={() => {
                                                // Toggle Logic: থাকলে ডিলিট করো, না থাকলে অ্যাড করো
                                                const newValue = isSelected
                                                    ? field.value.filter((val: string) => val !== tool.id)
                                                    : [...(field.value || []), tool.id];

                                                field.onChange(newValue);
                                            }}
                                            className={cn(
                                                "cursor-pointer p-4 border rounded-2xl flex items-center gap-4 transition-all text-left relative group",
                                                // Unselected Style
                                                "bg-white border-slate-200 ",
                                                // Selected Style
                                                isSelected && "border-blue-500 bg-blue-600/10 border"
                                            )}
                                        >
                                            {/* Check Icon for Selected State */}
                                            {/*{isSelected && (*/}
                                            {/*    <div className="absolute top-3 right-3 text-blue-600">*/}
                                            {/*        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
                                            {/*            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />*/}
                                            {/*        </svg>*/}
                                            {/*    </div>*/}
                                            {/*)}*/}

                                            <span className="text-3xl filter grayscale group-hover:grayscale-0 transition-all">
                                                {tool.icon}
                                              </span>

                                            <div>
                                                <div className={cn(
                                                    "font-bold text-sm  transition-colors",
                                                    isSelected ? "text-blue-500" : "text-slate-900"
                                                )}>
                                                    {tool.label}
                                                </div>
                                                <div className="text-[10px] text-slate-500 uppercase font-black">
                                                    {tool.description}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}