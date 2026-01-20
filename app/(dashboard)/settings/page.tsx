import {SettingsTabs} from "@/components/settings/settings-tabs";
import {PageProps} from "@/types/settings";
import GeneralProfile from "@/components/settings/general-profile";
import UserManagement from "@/components/settings/user-management";
import BillingSettings from "@/components/settings/billing-settings";

export default async function Page({searchParams}: PageProps) {
    // ৩. searchParams কে await করে আন র‍্যাপ (unwrap) করতে হবে
    const resolvedSearchParams = await searchParams;
    // ৪. এরপর সাধারণ অবজেক্টের মতো ব্যবহার করুন
    const tab = typeof resolvedSearchParams.tab === "string" ? resolvedSearchParams.tab : "general";

    return (
        <>
            <div className="mb-10">
                <h3 className="text-3xl font-extrabold mb-3 text-slate-900">
                    Settings
                </h3>
                <p className="max-w-2xl text-lg text-slate-600">
                    Manage your organization, billing, and team collaboration
                    settings.
                </p>
            </div>

            <SettingsTabs/>

            <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {tab === "general" && (
                    <GeneralProfile/>
                )}

                {tab === "users" && (
                    <UserManagement/>
                )}

                {tab === "billing" && (
                    <BillingSettings />
                )}
            </div>
        </>
    )
}