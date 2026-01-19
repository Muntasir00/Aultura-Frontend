"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Loader2 } from "lucide-react";

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
import {ManagePhoneNumberModalProps} from "@/types/phone-number";


const phoneNumberSchema = z.object({
    label: z.string().min(1, "Label is required"),
    agentId: z.string().optional(), // Agent সিলেক্ট না করলে সমস্যা নেই
});

type PhoneNumberFormValues = z.infer<typeof phoneNumberSchema>;



export const ManagePhoneNumberModal: React.FC<ManagePhoneNumberModalProps> = ({
                                                                                  isOpen,
                                                                                  onClose,
                                                                                  initialData,
                                                                                  onSave,
                                                                                  onRelease,
                                                                                  isLoading = false,
                                                                              }) => {
    // --- 3. FORM INITIALIZATION ---
    const form = useForm<PhoneNumberFormValues>({
        resolver: zodResolver(phoneNumberSchema),
        defaultValues: {
            label: "",
            agentId: "",
        },
    });

    // মডাল ওপেন হলে বা ডাটা চেঞ্জ হলে ফর্ম রিসেট করা
    useEffect(() => {
        if (isOpen && initialData) {
            form.reset({
                label: initialData.label,
                agentId: initialData.agentId || "",
            });
        }
    }, [isOpen, initialData, form]);


    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        // Overlay
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">

            {/* Modal Container */}
            <div className="w-full max-w-lg rounded-2xl shadow-2xl border overflow-hidden bg-white border-slate-200">

                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-slate-50 border-slate-100">
                    <div>
                        <h4 className="font-bold text-lg text-slate-900">Manage Phone Number</h4>
                    </div>
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-slate-500 hover:text-red-500 transition-colors rounded-full p-1 hover:bg-slate-100"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 space-y-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">

                            {/* Field: Friendly Label */}
                            <FormField
                                control={form.control}
                                name="label"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-sm font-semibold mb-2 text-slate-700">
                                            Friendly Label
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

                            {/* Field: Linked AI Agent */}
                            <FormField
                                control={form.control}
                                name="agentId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-sm font-semibold mb-2 text-slate-700">
                                            Linked AI Agent
                                        </FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-full rounded-xl px-4 py-6 border bg-slate-50 border-slate-300 focus:border-blue-500 focus:ring-0 text-slate-900">
                                                    <SelectValue placeholder="Select an agent" />
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

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 pt-2">

                                {/* Save Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="cursor-pointer w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                                        </>
                                    ) : (
                                        "Update Number Settings"
                                    )}
                                </button>

                                {/* Release/Delete Button */}
                                <button
                                    type="button"
                                    onClick={onRelease}
                                    className="cursor-pointer w-full bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white py-3 rounded-xl font-bold transition-all border border-red-500/20"
                                >
                                    Release Number
                                </button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};