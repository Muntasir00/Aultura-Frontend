import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AgentSummaryPanelProps {
    latency?: string;
    costPerMin?: string;
    onCancel?: () => void;
    isLoading?: boolean;
}

export function AgentSummaryPanel({
                                      latency = "~470ms",
                                      costPerMin = "$0.05",
                                      onCancel,
                                      isLoading = false,
                                  }: AgentSummaryPanelProps) {
    return (
        <div className="w-full lg:w-80 space-y-6">
            <div className="p-8 border rounded-3xl sticky top-24 bg-white border-slate-200 shadow-xl transition-all">
                {/* Header */}
                <h4 className="font-black text-xs uppercase tracking-widest text-slate-500 mb-6">
                    Estimations
                </h4>

                {/* Metrics */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                        <span className="text-sm text-slate-500 font-medium">Latency</span>
                        <span className="text-sm font-bold text-slate-900">{latency}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-500 font-medium">Cost/Min</span>
                        <span className="text-sm font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md">
                          {costPerMin}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-8 mt-8 border-t border-slate-700/30 space-y-3">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-6 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20 text-md"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                            </>
                        ) : (
                            "Create Agent"
                        )}
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="w-full py-6 rounded-xl font-bold border-slate-200 text-slate-600 hover:bg-slate-50"
                    >
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
}