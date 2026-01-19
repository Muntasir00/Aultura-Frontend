"use client";

import {useState} from "react";
import {useForm, useFieldArray} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {cn} from "@/lib/utils";

import {
    Form,
    FormControl,
    FormField,
    FormItem, FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {ToolFormProps} from "@/types/tool";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {ChevronDown, ChevronUp} from "lucide-react";

const ICONS = [
    "🛠️", "📞", "🔍", "🚪", "📼", "🌐", "🧩", "💬",
    "📊", "📅", "🏗️"
];

// --- 1. ZOD SCHEMA ---
const toolFormSchema = z.object({
    // Tool Settings
    toolName: z.string().min(1, "Tool name is required"),
    toolType: z.string().default("Custom tool"),
    icon: z.string().default("🛠️"),
    description: z.string().max(1000, "Max 1000 characters"),

    // Server Settings
    serverUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    timeout: z.coerce.number().min(1).max(300),
    authType: z.string().default("none"),

    // Dynamic Fields
    headers: z.array(
        z.object({
            key: z.string().min(1, "Key required"),
            value: z.string().min(1, "Value required"),
        })
    ),
    encryptedPaths: z.array(
        z.object({
            path: z.string().min(1, "Path required"),
        })
    ),
});

type ToolFormValues = z.infer<typeof toolFormSchema>;

export default function ToolForm({formId, onSuccess}: ToolFormProps) {
    const [isServerSettingsOpen, setIsServerSettingsOpen] = useState(true);
    const [open, setOpen] = useState(false);

    // --- 2. FORM INITIALIZATION ---
    const form = useForm({
        resolver: zodResolver(toolFormSchema),
        defaultValues: {
            toolName: "",
            toolType: "",
            icon: "🛠️",
            description: "",
            serverUrl: "",
            timeout: 20,
            authType: "none",
            headers: [],       // Start empty
            encryptedPaths: [], // Start empty
        },
    });

    // Dynamic Fields Managers
    const {fields: headerFields, append: appendHeader, remove: removeHeader} =
        useFieldArray({control: form.control, name: "headers"});

    const {fields: pathFields, append: appendPath, remove: removePath} =
        useFieldArray({control: form.control, name: "encryptedPaths"});

    // Watch description length for the counter
    const descriptionValue = form.watch("description") || "";

    // --- 3. SUBMIT HANDLER ---
    function onSubmit(data: ToolFormValues) {
        onSuccess(data);
        console.log("Form Data:", data);
        alert("Form Submitted! Check console.");
    }

    return (
        <Form {...form}>
            <form id={formId} onSubmit={form.handleSubmit(onSubmit)} className="p-8 space-y-10 max-w-4xl mx-auto">

                <section className="p-6 rounded-2xl border bg-slate-50 border-slate-200">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center bg-white text-slate-500 shadow-sm">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                            </svg>
                        </div>
                        <div>
                            <h5 className="font-bold text-sm text-slate-900">Tool Settings</h5>
                            <p className="text-xs text-slate-500 font-medium">Configure the basic settings for this
                                tool</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Tool Name */}
                        <FormField
                            control={form.control}
                            name="toolName"
                            render={({field}) => (
                                <FormItem>
                                    <label
                                        className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                                        Tool Name
                                    </label>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="e.g., google_sheets_tool"
                                            className="w-full rounded-xl px-4 py-6 border focus:outline-none focus:ring-0 focus:border-blue-500 transition-all font-medium bg-white border-slate-200 text-slate-900 shadow-none"
                                        />
                                    </FormControl>
                                    <p className="text-[10px] text-slate-600 mt-2 font-medium">
                                        The tool name that will be used internally for this request.
                                    </p>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />


                        <div className="grid sm:grid-cols-2 gap-6 items-baseline">
                            {/* Tool Type */}
                            <FormField
                                control={form.control}
                                name="toolType"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel
                                            className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                                            Tool Type
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    className="w-full flex items-center justify-between px-4 py-3 !h-[50px] rounded-xl border bg-white border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-blue-500 transition-all"
                                                >
                                                    <SelectValue placeholder="Select tool type"/>
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent className="z-[250]">
                                                <SelectGroup>
                                                    <SelectItem value="custom-tool">Custom tool</SelectItem>
                                                    <SelectItem value="DTMF">DTMF</SelectItem>
                                                    <SelectItem value="Query">Query</SelectItem>
                                                    <SelectItem value="end-call">End call</SelectItem>
                                                    <SelectItem value="Voicemail">Voicemail</SelectItem>
                                                    <SelectItem value="API-Request">API Request</SelectItem>
                                                    <SelectItem value="Google-sheets">Google sheets</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                        {/* ৩. এরর মেসেজ দেখানোর জন্য এটা জরুরি */}
                                        <FormMessage className="text-xs text-red-500"/>
                                    </FormItem>
                                )}
                            />

                            {/* Tool Icon (Visual Only for now) */}
                            <FormField
                                control={form.control}
                                name="icon" // আপনার zod schema তে 'icon' ফিল্ড থাকতে হবে
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel
                                            className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                                            TOOL ICON
                                        </FormLabel>

                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <button
                                                        type="button"
                                                        role="combobox"
                                                        aria-expanded={open}
                                                        className={cn(
                                                            "w-full flex items-center justify-between px-4 py-3 h-[50px] rounded-xl border bg-white border-slate-200 text-slate-900 transition-all",
                                                            "focus:outline-none focus:border-blue-500",
                                                            open && "border-blue-500 ring-2 ring-blue-100"
                                                        )}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-2xl">{field.value || "🛠️"}</span>
                                                            <span
                                                                className={cn("text-sm font-medium", !field.value && "text-slate-500")}>
                                                                {/*{field.value ? "Icon Selected" : "Choose icon"}*/}
                                                              </span>
                                                        </div>
                                                        {open ? <ChevronUp className="w-4 h-4 text-slate-400"/> :
                                                            <ChevronDown className="w-4 h-4 text-slate-400"/>}
                                                    </button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-[--radix-popover-trigger-width]  p-3 rounded-2xl shadow-xl bg-white z-[250]"
                                                align="start"
                                                sideOffset={5}
                                            >
                                                <div className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-7 gap-2">
                                                    {ICONS.map((emoji) => (
                                                        <button
                                                            key={emoji}
                                                            type="button"
                                                            onClick={() => {
                                                                field.onChange(emoji);
                                                                setOpen(false);
                                                            }}
                                                            className={cn(
                                                                "w-10 h-10 flex items-center justify-center text-xl rounded-xl transition-all",
                                                                field.value === emoji
                                                                    ? "bg-blue-600 text-white shadow-md scale-110" // সিলেক্টেড স্টাইল
                                                                    : "hover:bg-slate-100 text-slate-900" // সাধারণ স্টাইল
                                                            )}
                                                        >
                                                            {emoji}
                                                        </button>
                                                    ))}
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage className="text-xs text-red-500"/>
                                    </FormItem>
                                )}
                            />
                        </div>


                        {/* Description */}
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <div className="flex justify-between items-center mb-2">
                                        <label
                                            className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                            Description
                                        </label>
                                        <span className="text-[10px] text-slate-600 font-bold">
                      {descriptionValue.length}/1000
                    </span>
                                    </div>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            rows={5}
                                            placeholder="Describe the tool in a few sentences"
                                            className="w-full rounded-xl px-4 py-3 !h-[96px] border focus:outline-none focus:ring-0 focus:border-blue-500 transition-all bg-white border-slate-200 text-slate-900 resize-none shadow-none"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-xs"/>
                                </FormItem>
                            )}
                        />
                    </div>
                </section>

                {/* ==========================================
            SECTION 2: SERVER SETTINGS
           ========================================== */}
                <section className="p-6 rounded-2xl border bg-slate-50 border-slate-200 transition-all">
                    <div
                        className="flex items-center justify-between mb-8 cursor-pointer group"
                        onClick={() => setIsServerSettingsOpen(!isServerSettingsOpen)}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center bg-white text-slate-500 shadow-sm">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M5 12h14M5 12l4-4m-4 4l4 4"/>
                                </svg>
                            </div>
                            <div>
                                <h5 className="font-bold text-sm text-slate-900">Server Settings</h5>
                                <p className="text-xs text-slate-500 font-medium">Configure your server URL and
                                    connection settings</p>
                            </div>
                        </div>
                        <svg
                            className={cn("w-4 h-4 text-slate-700 transition-transform duration-200", isServerSettingsOpen ? "rotate-180" : "")}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </div>

                    {/* Collapsible Content */}
                    {isServerSettingsOpen && (
                        <div className="space-y-6">
                            {/* Server URL */}
                            <FormField
                                control={form.control}
                                name="serverUrl"
                                render={({field}) => (
                                    <FormItem>
                                        <label
                                            className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                                            Server URL
                                        </label>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="url"
                                                placeholder="https://api.example.com/function"
                                                className="w-full rounded-xl px-4 py-6 border focus:outline-none focus:ring-0 focus:border-blue-500 transition-all bg-white border-slate-200 text-slate-900 shadow-none"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs"/>
                                    </FormItem>
                                )}
                            />

                            {/* Timeout */}
                            <FormField
                                control={form.control}
                                name="timeout"
                                render={({field}) => (
                                    <FormItem>
                                        <label
                                            className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
                                            Timeout (seconds)
                                        </label>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="number"
                                                min="1" max="300"
                                                value={field.value as number}
                                                className="w-full rounded-xl px-4 py-6 border focus:outline-none focus:ring-0 focus:border-blue-500 transition-all bg-white border-slate-200 text-slate-900 shadow-none"
                                            />
                                        </FormControl>
                                        <p className="text-[10px] text-slate-600 mt-2 font-medium italic">
                                            Must be between 1 and 300 seconds.
                                        </p>
                                    </FormItem>
                                )}
                            />

                            {/* Authorization */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label
                                        className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                        Authorization
                                    </label>
                                    <button type="button"
                                            className="text-[10px] font-black text-blue-500 hover:underline flex items-center gap-1">
                                        + Add New
                                        <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                        </svg>
                                    </button>
                                </div>
                                <p className="text-[10px] text-slate-600 mb-3 font-medium">
                                    Select a custom credential to authenticate API requests
                                </p>
                                <FormField
                                    control={form.control}
                                    name="authType"
                                    render={({field}) => (
                                        <select
                                            {...field}
                                            className="w-full rounded-xl px-4 py-3 border focus:outline-none focus:border-blue-500 transition-all text-sm font-medium bg-white border-slate-200 text-slate-900 h-[50px]"
                                        >
                                            <option value="none">No authentication</option>
                                            <option value="ak_1">Main Production Key</option>
                                        </select>
                                    )}
                                />
                            </div>

                            {/* Custom Credential Placeholder */}
                            {form.watch("authType") === "none" && (
                                <div
                                    className="p-10 border border-dashed rounded-2xl flex flex-col items-center justify-center text-center bg-white border-slate-200">
                                    <div
                                        className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                        <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                        </svg>
                                    </div>
                                    <div className="font-bold text-sm mb-1 text-slate-400">No custom credentials
                                        available
                                    </div>
                                    <p className="text-xs text-slate-600 mb-6">Create a custom credential to
                                        authenticate your API requests</p>
                                    <button type="button"
                                            className="px-6 py-2 rounded-xl text-xs font-bold border transition-all bg-white border-slate-200 text-slate-600 hover:bg-slate-50">
                                        + Create Credential
                                    </button>
                                </div>
                            )}

                            <div className="pt-6 border-t border-slate-800/5">

                                {/* --- DYNAMIC HTTP HEADERS --- */}
                                <div className="flex justify-between items-center mb-6">
                                    <label
                                        className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                        HTTP Headers
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => appendHeader({key: "", value: ""})}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase border transition-all border-slate-200 text-slate-600 hover:bg-slate-100 bg-white"
                                    >
                                        + Add Header
                                    </button>
                                </div>

                                {headerFields.length > 0 ? (
                                    <div
                                        className="p-6 border border-dashed rounded-xl space-y-3 bg-slate-50 border-slate-200">
                                        {headerFields.map((field, index) => (
                                            <div key={field.id} className="flex gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`headers.${index}.key`}
                                                    render={({field}) => (
                                                        <Input {...field} placeholder="Key"
                                                               className="flex-1 rounded-lg px-3 py-1.5 text-xs border bg-white border-slate-200 h-9"/>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name={`headers.${index}.value`}
                                                    render={({field}) => (
                                                        <Input {...field} placeholder="Value"
                                                               className="flex-1 rounded-lg px-3 py-1.5 text-xs border bg-white border-slate-200 h-9"/>
                                                    )}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeHeader(index)}
                                                    className="p-2 text-slate-600 hover:text-red-500"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                                         stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div
                                        className="p-6 border border-dashed rounded-xl flex items-center justify-center text-center italic text-xs text-slate-600 bg-slate-50 border-slate-200">
                                        No headers configured. Click &#34;Add Header&#34; to add your first header.
                                    </div>
                                )}
                            </div>

                            {/* Encryption Settings Block */}
                            <div className="p-6 rounded-2xl border bg-white border-slate-200">
                                <div className="flex items-center gap-2 mb-4">
                                    <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                    </svg>
                                    <h6 className="font-bold text-sm text-slate-900">Encryption Settings</h6>
                                </div>

                                <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 flex gap-4 mb-6">
                                    <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <p className="text-xs text-blue-500 leading-relaxed font-medium">
                                        Specify JSON paths to encrypt in the request body before sending. This requires
                                        a credential with an encryption plan configured.
                                    </p>
                                </div>

                                {/* --- DYNAMIC ENCRYPTED PATHS --- */}
                                <div className="flex justify-between items-center mb-4">
                                    <label
                                        className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                        Encrypted Paths
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => appendPath({path: ""})}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase border transition-all border-slate-200 text-slate-600 hover:bg-slate-100"
                                    >
                                        + Add Path
                                    </button>
                                </div>

                                {pathFields.length > 0 ? (
                                    <div
                                        className="p-6 border border-dashed rounded-xl space-y-3 bg-slate-50 border-slate-200">
                                        {pathFields.map((field, index) => (
                                            <div key={field.id} className="flex gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`encryptedPaths.${index}.path`}
                                                    render={({field}) => (
                                                        <Input {...field} placeholder="e.g. user.ssn"
                                                               className="flex-1 rounded-lg px-3 py-1.5 text-xs border bg-white border-slate-200 h-9"/>
                                                    )}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removePath(index)}
                                                    className="p-2 text-slate-600 hover:text-red-500"
                                                >
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                                                         stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth="2"
                                                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div
                                        className="p-6 border border-dashed rounded-xl flex items-center justify-center text-center italic text-xs text-slate-600 bg-slate-50 border-slate-200">
                                        No encrypted paths configured. Click &#34;Add Path&#34; to specify fields to
                                        encrypt.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </section>

                {/* Submit Button (Optional, for testing) */}
                {/*<div className="flex justify-end">*/}
                {/*    <button type="submit"*/}
                {/*            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">*/}
                {/*        Save Tool Settings*/}
                {/*    </button>*/}
                {/*</div>*/}

            </form>
        </Form>
    );
}