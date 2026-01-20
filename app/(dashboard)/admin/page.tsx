import RevenueStats from "@/components/admin/revenue-stats";
import PerformanceMetrics from "@/components/admin/performance-metrics";
import { AccountTable} from "@/components/admin/account-table";

export default function Page() {
    return (
        <>
            <div className="mb-10 flex flex-col flex-wrap md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h3 className="text-3xl font-extrabold mb-3 text-slate-900">
                        Admin Panel
                    </h3>
                    <p className="max-w-2xl text-lg text-slate-600">
                        Global financial and operational oversight for the
                        Altura platform.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <button
                        className="cursor-pointer flex-1 md:flex-none px-4 py-2 rounded-xl text-sm font-bold border border-slate-700 hover:bg-slate-800 text-slate-400 whitespace-nowrap">Export
                        Financials
                    </button>
                    <button
                        className="cursor-pointer flex-1 md:flex-none px-4 py-2 rounded-xl text-sm font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-900/20 whitespace-nowrap">System
                        Health
                    </button>
                </div>
            </div>

            <RevenueStats/>

            <PerformanceMetrics/>

            <AccountTable />
        </>
    )
}