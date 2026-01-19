"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Switch} from "@/components/ui/switch"

const profileFormSchema = z.object({
    fullName: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    emailNotifications: z.boolean().default(true),
    betaAccess: z.boolean().default(false),
})

// Type inference based on the schema
type ProfileFormValues = z.infer<typeof profileFormSchema>

// Default values for the form
const defaultValues: ProfileFormValues = {
    fullName: "John Doe",
    email: "john@altura.ai",
    emailNotifications: true,
    betaAccess: false,
}

export default function GeneralProfile() {
    // 2. Form Hook Initialization
    const form = useForm({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
    })

    // 3. Submit Handler
    function onSubmit(data: ProfileFormValues) {
        console.log("Form Submitted:", data)
        // Here you would typically make an API call to save the data
        alert(JSON.stringify(data, null, 2))
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="max-w-3xl space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">

                        <div className="p-8 border rounded-2xl bg-white border-slate-200 shadow-sm">
                            <h4 className="font-bold mb-6 flex items-center gap-2 text-slate-900">
                                Personal Profile
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name Field */}
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel
                                                className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                                Full Name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ex: John Doe"
                                                    {...field}
                                                    className="w-full rounded-xl px-4 py-6 border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-0 transition-all"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs text-red-500 mt-1"/>
                                        </FormItem>
                                    )}
                                />

                                {/* Email Field */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel
                                                className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                                                Email Address
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="john@example.com"
                                                    {...field}
                                                    className="w-full rounded-xl px-4 py-6 border-slate-200 bg-slate-50 focus:border-blue-500 focus:ring-0 transition-all"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs text-red-500 mt-1"/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* --- Section 2: Preferences --- */}
                        <div className="p-8 border rounded-2xl bg-white border-slate-200 shadow-sm">
                            <h4 className="font-bold mb-6 flex items-center gap-2 text-slate-900">
                                {/*<SlidersHorizontal className="w-5 h-5 text-purple-500"/>*/}
                                <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M3 5h12M9 3v2m1.048 9.516a3.303 3.303 0 10-4.4-4.4 3.303 3.303 0 004.4 4.4zM9 21h3m2 0h3m2 0h3M9 18v3m3-3v3m3-3v3m3-3v3"></path>
                                </svg>
                                Preferences
                            </h4>

                            <div className="space-y-6">
                                {/* Email Notifications Switch */}
                                <FormField
                                    control={form.control}
                                    name="emailNotifications"
                                    render={({field}) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg">
                                            <div className="space-y-0.5">
                                                <FormLabel className="font-bold text-sm text-slate-900">
                                                    Email Notifications
                                                </FormLabel>
                                                <FormDescription className="text-xs text-slate-500">
                                                    Receive weekly summaries of agent performance.
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    // className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-700 "
                                                    className="cursor-pointer w-12 h-6 data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-700 [&_span]:h-4 [&_span]:w-4 [&_span]:data-[state=checked]:translate-x-[26px] [&_span]:data-[state=unchecked]:translate-x-0.5"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                {/* Beta Access Switch */}
                                <FormField
                                    control={form.control}
                                    name="betaAccess"
                                    render={({field}) => (
                                        <FormItem className="flex flex-row items-center justify-between rounded-lg">
                                            <div className="space-y-0.5">
                                                <FormLabel className="font-bold text-sm text-slate-900">
                                                    Beta Access
                                                </FormLabel>
                                                <FormDescription className="text-xs text-slate-500">
                                                    Enable experimental Gemini 3 features.
                                                </FormDescription>
                                            </div>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    // className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-700 "
                                                    className="cursor-pointer w-12 h-6 data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-slate-700 [&_span]:h-4 [&_span]:w-4 [&_span]:data-[state=checked]:translate-x-[26px] [&_span]:data-[state=unchecked]:translate-x-0.5"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-12">
                        <button
                            className="cursor-pointer px-8 py-3 rounded-xl font-bold bg-slate-200 hover:bg-slate-300"
                            onClick={() => form.reset()}
                        >
                            Discard Changes
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer px-8 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
                        >
                            Save Settings
                        </button>
                    </div>

                </form>
            </Form>
        </>
    )
}