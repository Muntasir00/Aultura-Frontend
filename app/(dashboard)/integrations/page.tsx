import IntegrationsList from "@/components/integration/integrations-list";

export default function Page() {
    return (
        <>
            <div className="mb-10">
                <h3 className="text-3xl font-extrabold mb-3 text-slate-900">
                    Integrations
                </h3>
                <p className="max-w-2xl text-lg text-slate-600">
                    Power up your AI agents with enterprise-grade speech,
                    intelligence, and carrier services.
                </p>
            </div>

            <IntegrationsList />

        </>
    )
}