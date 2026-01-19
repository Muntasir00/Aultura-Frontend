import {integrationData} from "@/components/integration/data";
import IntegrationCard from "@/components/integration/integration-card";

export default function IntegrationsList() {
    return (
        <div className="space-y-12">
            {integrationData.map((section, index) => (
                <section key={index}>
                    {/* Section Header */}
                    <div className="flex items-center gap-4 mb-6">
                        <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                            {section.title}
                        </h4>
                        <div className="h-px flex-1 bg-slate-200"></div>
                    </div>

                    {/* Grid of Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {section.items.map((item) => (
                            <IntegrationCard key={item.id} item={item}/>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
}