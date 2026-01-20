import {InvoiceStatus} from "@/types/settings";
import {cn} from "@/lib/utils";

export const StatusBadge = ({ status }: { status: InvoiceStatus }) => {
    const styles = {
        Paid: "bg-emerald-500/10 text-emerald-500",
        Processing: "bg-amber-500/10 text-amber-500",
        Overdue: "bg-red-500/10 text-red-500",
    };

    return (
        <span
            className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tight",
                styles[status]
            )}
        >
    {status}
    </span>
    );
};