"use client"
import {IntegrationItem, ProviderData} from "@/types/integration";
import {useState} from "react";
import {ConnectProviderModal} from "@/components/integration/connect-provider-modal";

const IntegrationCard = ({item}: { item: IntegrationItem }) => {
    const isConnected = item.connected;

    const [selectedProvider, setSelectedProvider] = useState<ProviderData | null>(null);
    const [loading, setLoading] = useState(false);

    // ১. Connect বাটনে ক্লিক করলে এই ফাংশন কল হবে
    const handleConnectClick = (provider: ProviderData) => {
        setSelectedProvider(provider); // মডালে এই ডাটা চলে যাবে
    };

    // ২. মডাল বন্ধ করার ফাংশন
    const handleClose = () => {
        setSelectedProvider(null);
    };

    // ৩. API Key সাবমিট করলে
    const handleSave = (data: { apiKey: string }) => {
        if (!selectedProvider) return;

        setLoading(true);
        console.log(`Connecting to ${selectedProvider.name} with key:`, data.apiKey);

        // API Call Simulation
        setTimeout(() => {
            setLoading(false);
            handleClose(); // সফল হলে মডাল বন্ধ
        }, 1500);
    };

    return (
        <div
            className={`p-6 border rounded-2xl flex flex-col transition-all group hover:shadow-md ${
                isConnected
                    ? "border-blue-500 bg-blue-600/5"
                    : "bg-white border-slate-200"
            }`}
        >
            <div className="flex justify-between items-start mb-4">
                <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-3xl ${
                        isConnected
                            ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                            : "bg-slate-100"
                    }`}
                >
                    {item.icon}
                </div>
                <button
                    onClick={() => {
                        if (!isConnected) {
                            handleConnectClick(item)
                        } else {
                            alert("Hello")
                        }
                    }}
                    className={`cursor-pointer px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-md ${
                        isConnected
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                >
                    {isConnected ? "Connected" : "Connect"}
                </button>
            </div>

            <h4 className="text-lg font-bold mb-1 text-slate-900">{item.name}</h4>
            <p className="text-xs leading-relaxed mb-6 flex-1 text-slate-600">
                {item.description}
            </p>

            {/* Special Footer for Connected Items */}
            {isConnected && (
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Service Active
                </div>
            )}

            <ConnectProviderModal
                isOpen={!!selectedProvider} // selectedProvider null না হলেই ওপেন হবে
                onClose={handleClose}
                provider={selectedProvider}
                onSave={handleSave}
                isLoading={loading}
            />
        </div>
    );
};

export default IntegrationCard;