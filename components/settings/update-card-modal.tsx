"use client"

import React from "react"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {X, CreditCard, Lock} from "lucide-react"
import {cn} from "@/lib/utils"

const cardSchema = z.object({
    cardHolder: z.string().min(2, "Name is required"),
    cardNumber: z.string().regex(/^[\d\s]{19}$/, "Card number must be 16 digits"),
    expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid date (MM/YY)"),
    cvv: z.string().min(3).max(4, "Invalid CVV"),
})

type CardFormValues = z.infer<typeof cardSchema>

interface UpdateCardModalProps {
    isOpen: boolean
    onClose: () => void
}

export default function UpdateCardModal({isOpen, onClose}: UpdateCardModalProps) {

    const form = useForm<CardFormValues>({
        resolver: zodResolver(cardSchema),
        defaultValues: {
            cardHolder: "JOHN DOE",
            cardNumber: "4242 4242 4242 4242",
            expiry: "12/26",
            cvv: "",
        },
        mode: "onChange",
    })

    // Watch values to update the Card Preview in real-time
    const watchedValues = form.watch()

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "") // Remove non-digits
        value = value.slice(0, 16) // Limit to 16 digits
        // Add space every 4 digits
        const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ")
        form.setValue("cardNumber", formatted, {shouldValidate: true})
    }

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "")
        if (value.length >= 2) {
            value = value.slice(0, 2) + "/" + value.slice(2, 4)
        }
        form.setValue("expiry", value, {shouldValidate: true})
    }

    const onSubmit = (data: CardFormValues) => {
        console.log("Submitting Card Data:", data)
        // API Call goes here
        onClose()
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-[250] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">

            {/* Modal Container */}
            <div
                className="w-full max-w-2xl rounded-3xl shadow-2xl border overflow-hidden flex flex-col md:flex-row bg-white border-slate-200">

                {/* --- LEFT SIDE: Card Preview --- */}
                <div className="w-full md:w-1/2 p-8 border-r border-slate-100 bg-slate-50 relative overflow-hidden">
                    <h4 className="font-bold text-lg mb-6 text-slate-800">Card Preview</h4>

                    {/* 3D Card Container */}
                    <div className="relative group [perspective:1000px] mb-8 z-10">
                        <div
                            className="w-full h-44 rounded-2xl p-6 bg-gradient-to-br from-blue-600 to-indigo-900 text-white shadow-2xl transition-all duration-500 transform group-hover:[transform:rotateY(10deg)]">

                            {/* Card Chip & Logo */}
                            <div className="flex justify-between items-start">
                                {/* Chip SVG */}
                                <svg className="w-12 h-12 opacity-80" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M1 10h22v2H1v-2zm0 4h22v2H1v-2z" opacity=".2"></path>
                                    <rect x="1" y="4" width="22" height="16" rx="2" fill="none" stroke="currentColor"
                                          strokeWidth="2"></rect>
                                </svg>
                                <span className="text-sm font-black italic tracking-widest">VISA</span>
                            </div>

                            {/* Card Number Display */}
                            <div className="mt-8 text-xl font-mono tracking-[0.2em] drop-shadow-md">
                                {watchedValues.cardNumber || "0000 0000 0000 0000"}
                            </div>

                            {/* Card Bottom Details */}
                            <div className="mt-4 flex justify-between items-end">
                                <div>
                                    <div className="text-[10px] uppercase opacity-60 font-bold mb-1">Card Holder</div>
                                    <div className="text-sm font-bold truncate max-w-[140px] tracking-wider uppercase">
                                        {watchedValues.cardHolder || "YOUR NAME"}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase opacity-60 font-bold mb-1">Expires</div>
                                    <div className="text-sm font-bold tracking-wider">
                                        {watchedValues.expiry || "MM/YY"}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Security Note */}
                    <div className="text-xs text-slate-500 leading-relaxed italic flex gap-2 items-start">
                        <Lock className="w-3 h-3 mt-0.5 shrink-0"/>
                        <span>This is a secure environment. Altura never stores full card numbers in plaintext.</span>
                    </div>
                </div>

                {/* --- RIGHT SIDE: Form Details --- */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 p-8 space-y-5">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-slate-900">Card Details</h4>
                        <button
                            type="button"
                            onClick={onClose}
                            className="cursor-pointer text-slate-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-slate-100"
                        >
                            <X className="w-5 h-5"/>
                        </button>
                    </div>

                    {/* Card Holder Name */}
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                            Card Holder Name
                        </label>
                        <input
                            {...form.register("cardHolder")}
                            className={cn(
                                "w-full rounded-xl px-4 py-2.5 text-sm border bg-slate-50 border-slate-200 transition-all placeholder:text-slate-300",
                                "focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10",
                                form.formState.errors.cardHolder && "border-red-500 focus:border-red-500"
                            )}
                            type="text"
                            placeholder="JOHN DOE"
                        />
                        {form.formState.errors.cardHolder && (
                            <p className="text-xs text-red-500 mt-1">{form.formState.errors.cardHolder.message}</p>
                        )}
                    </div>

                    {/* Card Number */}
                    <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                            Card Number
                        </label>
                        <div className="relative">
                            <input
                                {...form.register("cardNumber")}
                                onChange={handleCardNumberChange}
                                maxLength={19}
                                className={cn(
                                    "w-full rounded-xl px-4 py-2.5 pl-10 text-sm border bg-slate-50 border-slate-200 transition-all",
                                    "focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10",
                                    form.formState.errors.cardNumber && "border-red-500 focus:border-red-500"
                                )}
                                type="text"
                                placeholder="0000 0000 0000 0000"
                            />
                            <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2"/>
                        </div>
                        {form.formState.errors.cardNumber && (
                            <p className="text-xs text-red-500 mt-1">{form.formState.errors.cardNumber.message}</p>
                        )}
                    </div>

                    {/* Grid for Expiry & CVV */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                                Expiry Date
                            </label>
                            <input
                                {...form.register("expiry")}
                                onChange={handleExpiryChange}
                                maxLength={5}
                                placeholder="MM / YY"
                                className={cn(
                                    "w-full rounded-xl px-4 py-2.5 text-sm border bg-slate-50 border-slate-200 transition-all",
                                    "focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10",
                                    form.formState.errors.expiry && "border-red-500 focus:border-red-500"
                                )}
                                type="text"
                            />
                        </div>
                        <div>
                            <label
                                className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                                CVV
                            </label>
                            <input
                                {...form.register("cvv")}
                                maxLength={4}
                                className={cn(
                                    "w-full rounded-xl px-4 py-2.5 text-sm border bg-slate-50 border-slate-200 transition-all",
                                    "focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10",
                                    form.formState.errors.cvv && "border-red-500 focus:border-red-500"
                                )}
                                type="password"
                                placeholder="123"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            Save New Payment Method
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}