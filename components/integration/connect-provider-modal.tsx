"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Loader2 } from "lucide-react";

// Shadcn UI Components
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {ConnectProviderModalProps} from "@/types/integration";

// --- 1. ZOD SCHEMA ---
const connectSchema = z.object({
    apiKey: z.string().min(1, "API Key is required"),
});

type ConnectFormValues = z.infer<typeof connectSchema>;

export const ConnectProviderModal: React.FC<ConnectProviderModalProps> = ({
                                                                              isOpen,
                                                                              onClose,
                                                                              provider,
                                                                              onSave,
                                                                              isLoading = false,
                                                                          }) => {
    const form = useForm<ConnectFormValues>({
        resolver: zodResolver(connectSchema),
        defaultValues: {
            apiKey: "",
        },
    });

    // মডাল খুললে ফর্ম রিসেট হবে
    useEffect(() => {
        if (isOpen) {
            form.reset();
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen, form]);

    if (!isOpen || !provider) return null;

    return (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">

            {/* Modal Container */}
            <div className="w-full max-w-lg rounded-3xl shadow-2xl border overflow-hidden bg-white border-slate-200">

                {/* Header (Dynamic) */}
                <div className="p-6 border-b flex justify-between items-center bg-slate-50 border-slate-100">
                    <div className="flex items-center gap-4">
                        {/* Dynamic Icon */}
                        <span className="text-3xl">{provider.icon}</span>
                        <div>
                            {/* Dynamic Title */}
                            <h4 className="font-bold text-lg text-slate-900">
                                Connect {provider.name}
                            </h4>
                            <p className="text-xs text-slate-500">
                                Provide your authentication credentials.
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-slate-200"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 space-y-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">

                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="apiKey"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                                API Key
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                    placeholder={`Enter your ${provider.name} API Key`}
                                                    className="w-full rounded-xl px-4 py-6 border bg-slate-50 border-slate-300 focus:border-blue-500 focus:ring-0 text-slate-900"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Disclaimer Box */}
                            <div className="p-4 rounded-xl bg-blue-600/5 border border-blue-500/20 text-xs text-blue-500 leading-relaxed">
                                Credentials are encrypted and stored locally. Altura does not relay sensitive keys to third-party tracking services.
                            </div>

                            {/* Buttons */}
                            <div className="pt-4 flex gap-4">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting...
                                        </>
                                    ) : (
                                        "Establish Connection"
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-8 py-4 rounded-xl font-bold transition-all bg-slate-200 hover:bg-slate-300 text-slate-700"
                                >
                                    Cancel
                                </button>
                            </div>

                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};