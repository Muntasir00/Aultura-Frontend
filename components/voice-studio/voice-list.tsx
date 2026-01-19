"use client"
import {VoiceCard} from "@/components/voice-studio/voice-card";

const voicesData = [
    {
        id: "zephyr",
        name: "Zephyr",
        icon: "👔",
        description: "Deep, calm, and professional male voice.",
        latency: "+20ms",
    },
    {
        id: "kore",
        name: "Kore",
        icon: "🧘",
        description: "Warm, empathetic, and friendly female voice.",
        latency: "+15ms",
    },
    {
        id: "puck",
        name: "Puck",
        icon: "🎭",
        description: "Energetic, youthful, and vibrant voice.",
        latency: "+30ms",
    },
    {
        id: "charon",
        name: "Charon",
        icon: "🛶",
        description: "Authoritative, clear, and direct narrator voice.",
        latency: "+10ms",
    },
    {
        id: "fenrir",
        name: "Fenrir",
        icon: "🐺",
        description: "Rich, gravelly, and distinct character voice.",
        latency: "+40ms",
    },
];

export default function VoiceList() {
    const handlePlay = (name: string) => {
        console.log(`Playing sample for: ${name}`);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {voicesData.map((voice) => (
                <VoiceCard
                    key={voice.id}
                    name={voice.name}
                    icon={voice.icon}
                    description={voice.description}
                    latency={voice.latency}
                    onPlay={() => handlePlay(voice.name)}
                />
            ))}
        </div>
    );
}