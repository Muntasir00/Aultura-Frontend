import React from "react";
import { useFormContext } from "react-hook-form";
import {
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
import { Slider } from "@/components/ui/slider";

export default function VoiceConfiguration() {
    // প্যারেন্ট ফর্ম থেকে কন্ট্রোল এক্সেস করার জন্য
    const form = useFormContext();

    return (
        <div className="space-y-8 animate-in fade-in duration-300">

            {/* --- Top Section: Providers & Voice --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Voice Provider */}
                <FormField
                    control={form.control}
                    name="voiceProvider"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Voice Provider</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="bg-white border-slate-300 focus:ring-blue-500 w-full">
                                        <SelectValue placeholder="Select provider" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="ElevenLabs">ElevenLabs</SelectItem>
                                    <SelectItem value="Google Cloud">Google Cloud</SelectItem>
                                    <SelectItem value="Azure">Azure</SelectItem>
                                    <SelectItem value="PlayHT">PlayHT</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Voice Selection */}
                <FormField
                    control={form.control}
                    name="voiceSelection"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Voice Selection</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="bg-white border-slate-300 focus:ring-blue-500 w-full">
                                        <SelectValue placeholder="Select voice" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="zephyr-01">Zephyr (Male, Deep)</SelectItem>
                                    <SelectItem value="kore-01">Kore (Female, Soft)</SelectItem>
                                    <SelectItem value="puck-01">Puck (Male, Energetic)</SelectItem>
                                    <SelectItem value="charon-01">Charon (Male, Authoritative)</SelectItem>
                                    <SelectItem value="fenrir-01">Fenrir (Male, Intense)</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            {/* --- Middle Section: Sliders --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

                {/* Stability Slider */}
                <FormField
                    control={form.control}
                    name="stability"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-between items-center mb-2">
                                <FormLabel className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                    Stability
                                </FormLabel>
                                <span className="text-xs font-mono text-blue-500">
                                    {field.value}
                                </span>
                            </div>
                            <FormControl>
                                <Slider
                                    min={0}
                                    max={1}
                                    step={0.05}
                                    defaultValue={[field.value]}
                                    onValueChange={(vals) => field.onChange(vals[0])}
                                    className="[&_.bg-primary]:bg-blue-600"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Clarity Slider */}
                <FormField
                    control={form.control}
                    name="clarity"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-between items-center mb-2">
                                <FormLabel className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                    Clarity
                                </FormLabel>
                                <span className="text-xs font-mono text-blue-500">
                                    {field.value}
                                </span>
                            </div>
                            <FormControl>
                                <Slider
                                    min={0}
                                    max={1}
                                    step={0.05}
                                    defaultValue={[field.value]}
                                    onValueChange={(vals) => field.onChange(vals[0])}
                                    className="[&_.bg-primary]:bg-blue-600"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Speed Slider */}
                <FormField
                    control={form.control}
                    name="speed"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-between items-center mb-2">
                                <FormLabel className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                    Speed
                                </FormLabel>
                                <span className="text-xs font-mono text-blue-500">
                                    {field.value}
                                </span>
                            </div>
                            <FormControl>
                                <Slider
                                    min={0}
                                    max={2.0}
                                    step={0.1}
                                    defaultValue={[field.value]}
                                    onValueChange={(vals) => field.onChange(vals[0])}
                                    className="[&_.bg-primary]:bg-blue-600 w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Style Exaggeration Slider */}
                <FormField
                    control={form.control}
                    name="styleExaggeration"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-between items-center mb-2">
                                <FormLabel className="text-xs font-bold text-slate-500 uppercase">
                                    Style Exaggeration
                                </FormLabel>
                                <span className="text-xs font-mono text-blue-500">
                                    {field.value}
                                </span>
                            </div>
                            <FormControl>
                                <Slider
                                    min={0}
                                    max={1}
                                    step={0.05}
                                    defaultValue={[field.value]}
                                    onValueChange={(vals) => field.onChange(vals[0])}
                                    className="[&_.bg-primary]:bg-blue-600"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>

            {/* --- Bottom Section: Background Sound --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                <FormField
                    control={form.control}
                    name="backgroundSound"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-slate-700 font-semibold">Background Sound</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="bg-white border-slate-300 focus:ring-blue-500 w-full">
                                        <SelectValue placeholder="Select ambience" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="none">None</SelectItem>
                                    <SelectItem value="office">Office Ambience</SelectItem>
                                    <SelectItem value="cafe">Coffee Shop</SelectItem>
                                    <SelectItem value="traffic">City Traffic</SelectItem>
                                    <SelectItem value="rain">Soft Rain</SelectItem>
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
}