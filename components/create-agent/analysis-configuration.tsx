import React from "react";
import {useFormContext} from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import {Switch} from "@/components/ui/switch";


const analysisSettings = [
    {
        name: "enableCallSummary",
        label: "Enable Call Summary",
        description: "Generate a summary after every call",
    },
    {
        name: "evaluateSuccess",
        label: "Evaluate Success (Binary)",
        description: "AI determines if the call goal was met",
    },
    {
        name: "sentimentAnalysis",
        label: "Customer Sentiment Analysis",
        description: "Track user mood throughout the call",
    },
    {
        name: "recordCalls",
        label: "Record All Calls",
        description: "Save audio recordings for quality assurance",
    },
];

export default function AnalysisConfiguration() {
    const form = useFormContext();

    return (
        <div className="animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h6 className="text-xs font-black uppercase text-slate-500 tracking-widest">
                        Call Metrics
                    </h6>

                    {analysisSettings.map((setting) => (
                        <FormField
                            key={setting.name}
                            control={form.control}
                            name={setting.name}
                            render={({field}) => (
                                <FormItem
                                    className="flex flex-row items-center justify-between p-3 rounded-xl bg-slate-900/30 ">
                                    {/* border border-slate-200 bg-slate-50 transition-all hover:bg-slate-100 hover:border-blue-200*/}
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-sm font-medium text-slate-400 cursor-pointer">
                                            {setting.label}
                                        </FormLabel>
                                        {/* Optional Description if needed */}
                                        {/* <p className="text-[10px] text-slate-400">{setting.description}</p> */}
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="cursor-pointer w-10 h-5 data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-700 transition-colors [&_span]:h-3 [&_span]:w-3 [&_span]:data-[state=checked]:translate-x-[24px] [&_span]:data-[state=unchecked]:translate-x-0.5"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
}