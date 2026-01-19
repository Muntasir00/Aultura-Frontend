"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export const DateRangePicker = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // ১. URL থেকে স্ট্রিং ভ্যালু নেওয়া
    const startDateParam = searchParams.get("startDate");
    const endDateParam = searchParams.get("endDate");

    // ২. স্ট্রিং ভ্যালুকে Date অবজেক্টে কনভার্ট করা (Calendar এর জন্য)
    // যদি ভ্যালু না থাকে, তবে undefined থাকবে
    const startDate = startDateParam ? new Date(startDateParam) : undefined;
    const endDate = endDateParam ? new Date(endDateParam) : undefined;

    // ৩. ক্যালেন্ডার থেকে ডেট সিলেক্ট করার হ্যান্ডলার
    const handleCalendarSelect = (key: "startDate" | "endDate", date: Date | undefined) => {
        const params = new URLSearchParams(searchParams);

        if (date) {
            // Date অবজেক্টকে স্ট্রিং (YYYY-MM-DD) এ কনভার্ট করে URL এ সেট করা
            params.set(key, format(date, "yyyy-MM-dd"));
        } else {
            // ডেট আন-সিলেক্ট করলে প্যারামিটার মুছে ফেলা
            params.delete(key);
        }

        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border bg-white border-slate-200 shadow-sm">

            {/* --- Start Date Picker --- */}
            <div className="relative group">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                    Start Date
                </label>

                <Popover>
                    <PopoverTrigger asChild>
                        <button
                            className={cn(
                                "relative w-full sm:w-auto px-3 py-2 pl-10 rounded-lg text-sm border",
                                "focus:outline-none focus:border-blue-500 cursor-pointer",
                                "bg-slate-50 border-slate-200 text-slate-900",
                                "text-left font-normal flex items-center min-w-[150px]",
                                !startDate && "text-slate-400"
                            )}
                        >
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            {/* ডেট থাকলে ফরম্যাট করে দেখাও, না থাকলে প্লেসহোল্ডার */}
                            {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={startDate}
                            // এখানে সরাসরি আমাদের হ্যান্ডলার কল করা হয়েছে
                            onSelect={(date) => handleCalendarSelect("startDate", date)}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>

            {/* --- End Date Picker (Shadcn Applied) --- */}
            <div className="relative group">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                    End Date
                </label>

                <Popover>
                    <PopoverTrigger asChild>
                        <button
                            className={cn(
                                "relative w-full sm:w-auto px-3 py-2 pl-10 rounded-lg text-sm border",
                                "focus:outline-none focus:border-blue-500 cursor-pointer",
                                "bg-slate-50 border-slate-200 text-slate-900",
                                "text-left font-normal flex items-center min-w-[150px]",
                                !endDate && "text-slate-400"
                            )}
                        >
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={(date) => handleCalendarSelect("endDate", date)}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};