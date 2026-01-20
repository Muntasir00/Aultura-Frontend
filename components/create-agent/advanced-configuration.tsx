import React from "react";
import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import {cn} from "@/lib/utils";

export default function AdvancedConfiguration() {
    const form = useFormContext();

    const customSliderStyles = cn(
        // ১. ট্র্যাক (Track) এর হাইট এবং কালার
        "![&_.bg-secondary]:bg-slate-700 ![&_.bg-secondary]:h-1.5",

        // ২. ফিল্ড রেঞ্জ (Range) এর কালার (নীল)
        "[&_.bg-primary]:bg-blue-600",

        // ৩. থাম্ব (Thumb/Handle) এর কালার (নীল) এবং বর্ডার
        "[&_.border-primary]:border-blue-600 [&_.border-primary]:bg-blue-600",

        // ৪. থাম্ব এর সাইজ একটু ছোট করা (অপশনাল, ডিজাইনের সাথে মিল রাখার জন্য)
        "[&_span[role=slider]]:h-4 [&_span[role=slider]]:w-4"
    );

    return (
        <div className="animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

                {/* 1. LLM Temperature Slider */}
                <FormField
                    control={form.control}
                    name="llmTemperature"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-between items-center mb-2">
                                <FormLabel className="text-xs font-bold text-slate-500 uppercase">
                                    LLM Temperature
                                </FormLabel>
                                <span className="text-xs font-mono text-blue-500">
                                    {field.value}
                                </span>
                            </div>
                            <FormControl>
                                <Slider
                                    min={0}
                                    max={2}
                                    step={0.1}
                                    defaultValue={[field.value]}
                                    onValueChange={(vals) => field.onChange(vals[0])}
                                    className={customSliderStyles}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* 2. Silence Timeout Slider */}
                <FormField
                    control={form.control}
                    name="silenceTimeout"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-between items-center mb-2">
                                <FormLabel className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                    Silence Timeout
                                </FormLabel>
                                <span className="text-xs font-mono text-blue-500">
                                    {field.value}
                                </span>
                            </div>
                            <FormControl>
                                <Slider
                                    min={500}
                                    max={5000}
                                    step={100}
                                    defaultValue={[field.value]}
                                    onValueChange={(vals) => field.onChange(vals[0])}
                                    className={customSliderStyles}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

            </div>
        </div>
    );
}