import {ApiKeyData} from "@/types/api-keys";
import {ApiKeySection} from "@/components/api-key/api-key-section";

async function getApiKeys() {

    const privateKeys: ApiKeyData[] = [
        {
            id: "pk_1",
            name: "Main Production Key",
            value: "sk_live_51M39sd...",
            created: "Oct 12, 2024",
            lastUsed: "2m ago"
        }
    ];

    const publicKeys: ApiKeyData[] = [
        {
            id: "pub_1",
            name: "Web Widget Client",
            value: "pk_live_89X22as...",
            created: "Nov 05, 2024",
            lastUsed: "1h ago"
        }
    ];

    return {privateKeys, publicKeys};
}

export default async function Page() {
    // Server Side Data Fetching
    const {privateKeys, publicKeys} = await getApiKeys();
    return (
        <>
            <div className="mb-10">
                <h3 className="text-3xl font-extrabold mb-3 text-slate-900">
                    API Keys
                </h3>
                <p className="max-w-2xl text-lg text-slate-600">
                    Manage your credentials for programatic access to the
                    Altura fleet and web integration.
                </p>
            </div>

            <div className="space-y-12 pb-12">

                {/* Private Keys Section */}
                <ApiKeySection
                    title="Private API Keys"
                    description="Use these for backend integrations."
                    themeColor="red"
                    keys={privateKeys}
                    icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                    }
                />

                {/* Public Keys Section */}
                <ApiKeySection
                    title="Public API Keys"
                    description="Safe for client-side widgets."
                    themeColor="blue"
                    keys={publicKeys}
                    icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                        </svg>
                    }
                />

            </div>
        </>
    )
}