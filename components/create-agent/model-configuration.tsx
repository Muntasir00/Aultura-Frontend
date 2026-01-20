import React from 'react';
import {useFormContext} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {models} from "@/components/create-agent/data";

export default function ModelConfiguration () {
    const form = useFormContext();
    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LLM Provider */}
                <FormField
                    control={form.control}
                    name="llmProvider"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">LLM
                                Provider</FormLabel>
                            <Select onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger
                                        className="bg-white border-slate-300 w-full">
                                        <SelectValue placeholder="Select provider"/>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Google GenAI">
                                        Google GenAI
                                    </SelectItem>
                                    <SelectItem value="OpenAI">OpenAI</SelectItem>
                                    <SelectItem value="Anthropic">Anthropic</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />

                {/* Model Selection */}
                <FormField
                    control={form.control}
                    name="model"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">
                                Model Selection
                            </FormLabel>

                            <Select onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger id="model-trigger"
                                                   className="[&_.model-desc]:hidden w-full border-slate-200 bg-white text-slate-900 font-medium h-auto">
                                        <SelectValue placeholder="Select a model"/>
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent
                                    className="p-2 rounded-xl shadow-xl bg-white border-slate-100">
                                    {models.map((model) => (
                                        <SelectItem
                                            key={model.id}
                                            value={model.id}
                                            textValue={model.name}

                                            className="
                                                                                my-1 rounded-lg px-2 py-2 cursor-pointer transition-colors
                                                                                text-slate-700 focus:bg-slate-50 focus:text-slate-900

                                                                                /* Selected State Styling */
                                                                                data-[state=checked]:bg-blue-600
                                                                                data-[state=checked]:text-white
                                                                                data-[state=checked]:focus:bg-blue-600
                                                                              "
                                        >
                                            <div
                                                className="flex flex-col items-start gap-1 text-left">
                                                                                    <span
                                                                                        className="font-bold text-base leading-none">
                                                                                      {model.name}
                                                                                    </span>
                                                <span
                                                    className="model-desc text-xs font-normal opacity-70 data-[state=checked]:text-blue-100">
                                                                                      {model.description}
                                                                                    </span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

            </div>

            {/* System Instruction */}
            <FormField
                control={form.control}
                name="systemInstruction"
                render={({field}) => (
                    <FormItem>
                        <FormLabel className="text-slate-700 font-semibold">System
                            Instruction</FormLabel>
                        <FormControl>
                            <Textarea
                                rows={10}
                                placeholder="Define the agent's personality and goals..."
                                {...field}
                                className="h-28 bg-white border-slate-300 font-mono text-xs focus-visible:ring-blue-500"
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />

            {/* First Message */}
            <FormField
                control={form.control}
                name="firstMessage"
                render={({field}) => (
                    <FormItem>
                        <FormLabel className="text-slate-700 font-semibold">First
                            Message</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="What the agent says when the call starts"
                                {...field}
                                className="bg-white border-slate-300 focus-visible:ring-blue-500"
                            />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>
    );
};
