import PhoneNumbersTable from "@/components/phone-number/phone-numbers-table";
import AddPhoneNumberButton from "@/components/phone-number/add-phone-number-button";

export default function Page() {
    return (
        <>
            <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h3 className="text-3xl font-extrabold mb-3 text-slate-900">
                        Phone Numbers
                    </h3>
                    <p className="max-w-2xl text-lg text-slate-600">
                        Provision local and toll-free numbers from global
                        carriers and link them to your AI agents in one click.
                    </p>
                </div>
                <AddPhoneNumberButton/>
            </div>

            <PhoneNumbersTable/>
        </>
    )
}