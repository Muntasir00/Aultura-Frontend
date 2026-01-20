"use client"
import React, {useState} from "react";
import {cn} from "@/lib/utils";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useFormContext} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {EMOJI_LIST} from "@/components/create-agent/data";

export default function CreateAgent() {
    const [isIconOpen, setIsIconOpen] = useState(false)

    const form = useFormContext();

    return (
        <div className="p-8 border rounded-3xl bg-white border-slate-200 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-baseline">
                {/* Avatar & Name */}
                <div className="md:col-span-2 flex flex-wrap items-center gap-6">

                    <FormField
                        control={form.control}
                        name="icon"
                        render={({field}) => (
                            <FormItem>
                                <Popover open={isIconOpen} onOpenChange={setIsIconOpen}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <div className="relative group cursor-pointer">
                                                <button
                                                    type="button"
                                                    className="cursor-pointer w-20 h-20 rounded-2xl text-4xl flex items-center justify-center transition-all bg-slate-50 border border-slate-200 group-hover:bg-slate-100 group-hover:border-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                >
                                                    {field.value}
                                                </button>
                                                {/*<div*/}
                                                {/*    className="absolute -bottom-2 -right-2 bg-white rounded-full p-1.5 shadow-md border border-slate-100 text-xs font-bold text-slate-500">*/}
                                                {/*    ✏️*/}
                                                {/*</div>*/}
                                            </div>
                                        </FormControl>
                                    </PopoverTrigger>

                                    <PopoverContent
                                        className="w-[280px] sm:w-[320px] p-4 rounded-3xl shadow-xl border-slate-200 bg-white"
                                        align="start" sideOffset={10}>
                                        <div className="space-y-3">
                                            {/*<h4 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2">*/}
                                            {/*    Select Avatar*/}
                                            {/*</h4>*/}
                                            <div
                                                className="grid grid-cols-5 sm:grid-cols-6 gap-2 h-[240px] overflow-y-auto pr-1 custom-scrollbar">
                                                {EMOJI_LIST.map((emoji) => (
                                                    <button
                                                        key={emoji}
                                                        type="button"
                                                        onClick={() => {
                                                            field.onChange(emoji);
                                                            setIsIconOpen(false);
                                                        }}
                                                        className={cn(
                                                            "cursor-pointer w-9 h-9 sm:w-10 sm:h-10 text-2xl flex items-center justify-center rounded-xl transition-all hover:bg-slate-100 hover:scale-110",
                                                            field.value === emoji && "bg-blue-100 border border-blue-200 shadow-sm"
                                                        )}
                                                    >
                                                        {emoji}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="text-slate-700 font-semibold">Agent
                                        Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Sarah Support" {...field}
                                               className="bg-white border-slate-300 focus-visible:ring-blue-500"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                {/* Role */}
                <FormField
                    control={form.control}
                    name="role"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Internal
                                Role</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g. Customer Success" {...field}
                                       className="bg-white border-slate-300 focus-visible:ring-blue-500"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                {/* Description */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel
                                className="text-slate-700 font-semibold">Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Short summary for your dashboard" {...field}
                                       className="bg-white border-slate-300 focus-visible:ring-blue-500"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}