"use client";

import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {X, Loader2} from "lucide-react";

// Shadcn UI Components
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {CreateKeyModalProps} from "@/types/api-keys";

const createKeySchema = z.object({
    name: z.string().min(1, "Key internal name is required"),
});

type CreateKeyFormValues = z.infer<typeof createKeySchema>;

export const CreateKeyModal: React.FC<CreateKeyModalProps> = ({
                                                                  isOpen,
                                                                  onClose,
                                                                  onSave,
                                                                  isLoading = false,
                                                              }) => {
    const form = useForm<CreateKeyFormValues>({
        resolver: zodResolver(createKeySchema),
        defaultValues: {
            name: "",
        },
    });

    useEffect(() => {
        if (isOpen) {
            form.reset();
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen, form]);

    if (!isOpen) return null;

    return (
        // Overlay
        <div
            className="fixed inset-0 z-[210] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">

            {/* Modal Container */}
            <div className="w-full max-w-md rounded-2xl shadow-2xl border overflow-hidden bg-white border-slate-200">

                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-slate-50 border-slate-100">
                    <h4 className="font-bold text-lg flex items-center gap-2 text-slate-900">
                        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
                        </svg>
                        Create Private Key
                    </h4>
                    <button
                        onClick={onClose}
                        className="cursor-pointer text-slate-500 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-slate-200"
                    >
                        <X className="w-6 h-6"/>
                    </button>
                </div>

                {/* Body & Form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSave)} className="p-8 space-y-6">

                        {/* Field: Key Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className="block text-sm font-semibold mb-2 text-slate-700">
                                        Key Internal Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="e.g. Marketing"
                                            autoComplete="off"
                                            className="w-full rounded-xl px-4 py-6 border bg-slate-50 border-slate-300 focus:border-blue-500 focus:ring-0 text-slate-900 shadow-none"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* Footer Buttons */}
                        <div className="pt-2 flex gap-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="cursor-pointer flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-all"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Creating...
                                    </>
                                ) : (
                                    "Create Key"
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={onClose}
                                className="cursor-pointer px-6 py-3 rounded-xl font-bold transition-all bg-slate-200 hover:bg-slate-300 text-slate-700"
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                </Form>
            </div>
        </div>
    );
};