import {Suspense} from "react";
import {PageProps, TopicData} from "@/types/analytics";
import {DateRangePicker} from "@/components/analytics/date-range-picker";
import AnalyticsStatsGrid from "@/components/analytics/analytics-stats-grid";
import AnalyticsTrending from "@/components/analytics/analytics-trending";
import TrendingTopicRow from "@/components/analytics/trending-topic-row";
import LegendItem from "@/components/analytics/legend-item";
import {AiInsightsCard} from "@/components/analytics/ai-insights-card";
import CallVolumeHistory from "@/components/analytics/call-volume-history";

const TOPICS_DATA: TopicData[] = [
    {label: "Billing Support", percentage: 85, width: "100%"}, // Visual width based on your snippet
    {label: "Integration Setup", percentage: 72, width: "84.7059%"},
    {label: "API Rate Limits", percentage: 64, width: "75.2941%"},
    {label: "Feature Request", percentage: 55, width: "64.7059%"},
    {label: "Voice Latency", percentage: 42, width: "49.4118%"},
];

// Fallback component for DatePicker loading state
function DatePickerSkeleton() {
    return <div className="w-[300px] h-10 bg-slate-100 animate-pulse rounded-lg"></div>;
}

export default async function Page({searchParams}: PageProps) {
    // ১. সার্ভার সাইডে ডেট প্যারামিটারগুলো ধরুন
    const startDate = searchParams.startDate || new Date().toISOString().split('T')[0];
    const endDate = searchParams.endDate || new Date().toISOString().split('T')[0];

    // ২. এখানে ডাটাবেস কল করতে পারেন (Simulated)
    // const analyticsData = await getAnalytics(startDate, endDate);
    console.log(`Fetching data from ${startDate} to ${endDate}`);
    return (
        <>
            <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h3 className="text-3xl font-extrabold mb-3 text-slate-900">
                        Analytics
                    </h3>
                    <p className="max-w-2xl text-lg text-slate-600">
                        Deep insights into your call performance, customer
                        sentiment, and ROI metrics.
                    </p>
                </div>
                <Suspense fallback={<DatePickerSkeleton/>}>
                    <DateRangePicker/>
                </Suspense>
            </div>

            <AnalyticsStatsGrid/>

            <AiInsightsCard
                title="AI Insights"
                badgeText="Updated Just Now"
                content={
                    <>
                        Based on the 4,529 interactions analyzed in this period, we&#39;ve detected a{" "}
                        <span className="font-black text-red-500">15% increase</span>{" "}
                        in mentions related to{" "}
                        <span className="font-black text-blue-500">&#34;API Rate Limits&#34;</span>.
                    </>
                }
                recommendation="Consider reviewing your enterprise tier throughput settings or updating your agent instructions to handle temporary delays with specific troubleshooting steps."
            />

            <CallVolumeHistory/>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

                <AnalyticsTrending
                    title="Key Interactions"
                    subtitle="Sentiment and Outcome Analysis"
                >
                    <div className="flex flex-wrap gap-2 justify-around items-start">

                        {/* Sentiment Chart */}
                        <div className="flex flex-col items-center">
                            <div className="relative w-40 h-40">
                                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                    <path d="M 90 50 A 40 40 0 1 1 26.48858990830107 17.63932022500211" fill="none"
                                          stroke="#10b981" strokeWidth="12" strokeLinecap="round"></path>
                                    <path
                                        d="M 26.48858990830107 17.63932022500211 A 40 40 0 0 1 82.36067977499789 26.488589908301066"
                                        fill="none" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round"></path>
                                    <path d="M 82.36067977499789 26.488589908301066 A 40 40 0 0 1 90 49.99999999999999"
                                          fill="none" stroke="#f43f5e" strokeWidth="12" strokeLinecap="round"></path>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                    <span className="text-xl font-black text-slate-900">65%</span>
                                    <span
                                        className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Positive</span>
                                </div>
                            </div>
                            <div className="mt-6 w-full space-y-2 px-4">
                                <LegendItem color="rgb(16, 185, 129)" label="Positive" percentage={65}/>
                                <LegendItem color="rgb(59, 130, 246)" label="Neutral" percentage={25}/>
                                <LegendItem color="rgb(244, 63, 94)" label="Negative" percentage={10}/>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="relative w-40 h-40">
                                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                                    <path d="M 90 50 A 40 40 0 1 1 87.19105943553004 35.27501789261285" fill="none"
                                          stroke="#10b981" strokeWidth="12" strokeLinecap="round"></path>
                                    <path d="M 87.19105943553004 35.27501789261285 A 40 40 0 0 1 90 49.99999999999999"
                                          fill="none" stroke="#f43f5e" strokeWidth="12" strokeLinecap="round"></path>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                    <span className="text-xl font-black text-slate-900">94%</span>
                                    <span
                                        className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Success</span>
                                </div>
                            </div>
                            <div className="mt-6 w-full space-y-2 px-4">
                                <LegendItem color="rgb(16, 185, 129)" label="Successful" percentage={94}/>
                                <LegendItem color="rgb(244, 63, 94)" label="Errors" percentage={6}/>
                            </div>
                        </div>

                    </div>
                </AnalyticsTrending>

                <AnalyticsTrending
                    title="Trending Topics"
                    subtitle="Most frequently mentioned keywords in conversation"
                >
                    <div className="space-y-4">
                        {TOPICS_DATA.map((topic, index) => (
                            <TrendingTopicRow
                                key={index}
                                label={topic.label}
                                percentage={topic.percentage}
                                width={topic.width}
                            />
                        ))}
                    </div>
                </AnalyticsTrending>

            </div>

        </>
    )
}