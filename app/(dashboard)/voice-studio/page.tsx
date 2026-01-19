import VoiceList from "@/components/voice-studio/voice-list";

export default function Page() {
    return (
        <>
            <div className="mb-10">
                <h3 className="text-3xl font-extrabold mb-3 text-slate-900">
                    Voice Studio
                </h3>
                <p className="max-w-2xl text-lg text-slate-600">
                    Explore our curated gallery of low-latency AI voices or
                    clone your own to give your agents a distinct personality.
                </p>
            </div>

            <VoiceList/>
        </>
    )
}