"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Shadcn UI Components
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {AddNumberModalProps} from "@/types/phone-number";

const addNumberSchema = z.object({
    provider: z.enum(["Twilio", "Vonage", "Telnyx", "Custom SIP"], {
        message: "Please select a carrier provider",
    }),
    label: z.string().min(1, "Label is required"),
    agentId: z.string().optional(),
});

type AddNumberFormValues = z.infer<typeof addNumberSchema>;

const PROVIDERS = ["Twilio", "Vonage", "Telnyx", "Custom SIP"];

export const AddNumberModal: React.FC<AddNumberModalProps> = ({
                                                                  isOpen,
                                                                  onClose,
                                                                  isLoading = false,
                                                              }) => {

    // --- FORM SETUP ---
    const form = useForm<AddNumberFormValues>({
        resolver: zodResolver(addNumberSchema),
        defaultValues: {
            provider: undefined, // শুরুতে কিছুই সিলেক্টেড থাকবে না
            label: "",
            agentId: "",
        },
    });

    function onsubmit(data:AddNumberFormValues) {
        console.log("Purchasing Number:", data);
    }

    // মডাল খুললে ফর্ম রিসেট হবে
    useEffect(() => {
        if (isOpen) {
            form.reset();
        }
        // Body Scroll Lock
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen, form]);

    if (!isOpen) return null;

    return (
        // Overlay
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">

            {/* Modal Container */}
            <div className="w-full max-w-lg rounded-2xl shadow-2xl border overflow-hidden bg-white border-slate-200">

                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-slate-50 border-slate-100">
                    <h4 className="font-bold text-lg text-slate-900">Add New Number</h4>
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-slate-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-slate-200"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 space-y-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">

                            {/* STEP 1: Select Carrier Provider (Custom Grid Selection) */}
                            <FormField
                                control={form.control}
                                name="provider"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel className="block text-sm font-semibold text-slate-700">
                                            1. Select Carrier Provider
                                        </FormLabel>
                                        <FormControl>
                                            <div className="grid grid-cols-2 gap-3">
                                                {PROVIDERS.map((provider) => {
                                                    const isSelected = field.value === provider;
                                                    return (
                                                        <button
                                                            key={provider}
                                                            type="button" // Important so it doesn't submit form
                                                            onClick={() => field.onChange(provider)}
                                                            className={cn(
                                                                "cursor-pointer p-4 border rounded-xl font-bold transition-all text-sm flex items-center justify-center gap-2 relative",
                                                                isSelected
                                                                    ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500" // Selected State
                                                                    : "border-slate-200 hover:border-blue-300 text-slate-600 bg-white" // Default State
                                                            )}
                                                        >
                                                            {provider}
                                                            {isSelected && <CheckCircle2 className="w-4 h-4 absolute top-2 right-2 text-blue-500" />}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* STEP 2: Label Your Line */}
                            <FormField
                                control={form.control}
                                name="label"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-sm font-semibold text-slate-700">
                                            2. Label Your Line
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="e.g. Inbound Sales"
                                                className="w-full rounded-xl px-4 py-6 border bg-slate-50 border-slate-300 focus:border-blue-500 focus:ring-0 text-slate-900"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* STEP 3: Linked Agent */}
                            <FormField
                                control={form.control}
                                name="agentId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-sm font-semibold text-slate-700">
                                            Linked AI Agent
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full rounded-xl px-4 py-6 border bg-slate-50 border-slate-300 focus:border-blue-500 focus:ring-0 text-slate-900">
                                                    <SelectValue placeholder="Unlinked (No automation)" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="z-[250]">
                                                <SelectItem value="unlinked">Unlinked (No automation)</SelectItem>
                                                <SelectItem value="1">🎧 Sarah Support</SelectItem>
                                                <SelectItem value="2">💼 Max Market</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Footer / Submit Button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={cn(
                                        "cursor-pointer w-full flex items-center justify-center py-4 rounded-xl font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-all text-white",
                                        "bg-blue-600 hover:bg-blue-700",
                                        "disabled:opacity-50 disabled:cursor-not-allowed"
                                    )}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                                        </>
                                    ) : (
                                        "Provision & Purchase Line"
                                    )}
                                </button>
                            </div>

                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};