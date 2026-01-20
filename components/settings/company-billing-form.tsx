import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CompanyBillingForm() {
    return (
        <div className="space-y-4">
            {/* Company Name */}
            <div className="space-y-1">
                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Company Name
                </Label>
                <Input
                    defaultValue="Altura AI Solutions"
                    className="rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-0 focus-visible:border-blue-500"
                />
            </div>

            {/* Grid: VAT & Email */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        VAT/ Tax ID
                    </Label>
                    <Input
                        defaultValue="US-123456789"
                        className="rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-0 focus-visible:border-blue-500"
                    />
                </div>
                <div className="space-y-1">
                    <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Billing Email
                    </Label>
                    <Input
                        type="email"
                        defaultValue="billing@altura.ai"
                        className="rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-0 focus-visible:border-blue-500"
                    />
                </div>
            </div>

            {/* Address Textarea */}
            <div className="space-y-1">
                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Address
                </Label>
                <Textarea
                    rows={2}
                    defaultValue="123 AI Lane, Silicon Valley, CA 94025, USA"
                    className="rounded-xl bg-slate-50 border-slate-200 focus-visible:ring-0 focus-visible:border-blue-500 min-h-[60px]"
                    spellCheck={false}
                />
            </div>
        </div>
    );
}