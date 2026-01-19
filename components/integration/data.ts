import {IntegrationCategory} from "@/types/integration";


export const integrationData: IntegrationCategory[] = [
    {
        title: "Voice & Speech",
        items: [
            { id: "elevenlabs", name: "ElevenLabs", description: "Ultra-realistic AI text-to-speech.", icon: "🎙️" },
            { id: "cartesia", name: "Cartesia", description: "Sonic-speed high-fidelity voice.", icon: "⚡" },
            { id: "azure", name: "Azure Speech", description: "Microsoft Cognitive speech services.", icon: "☁️" },
            { id: "deepgram", name: "Deepgram", description: "Real-time STT and audio intelligence.", icon: "🎧" },
        ],
    },
    {
        title: "AI Model Providers",
        items: [
            { id: "openai", name: "OpenAI", description: "GPT-4o and advanced LLM logic.", icon: "🧠" },
            { id: "anthropic", name: "Anthropic", description: "Claude 3.5 Sonnet & Haiku models.", icon: "🏛️" },
            // Example of a connected state based on your code
            { id: "gemini", name: "Gemini", description: "Google Multimodal & Flash inference.", icon: "🤖", connected: true },
            { id: "perplexity", name: "Perplexity", description: "Search-grounded answer engine.", icon: "🔍" },
            { id: "custom", name: "Custom LLM", description: "OpenAI-compatible local/private endpoint.", icon: "💻" },
        ],
    },
    {
        title: "Carrier & Telephony",
        items: [
            { id: "twilio", name: "Twilio", description: "Global carrier connectivity.", icon: "📞" },
            { id: "vonage", name: "Vonage", description: "High-quality carrier infrastructure.", icon: "🔵" },
            { id: "telnyx", name: "Telnyx", description: "Modern telephony API for real-time apps.", icon: "🟢" },
            { id: "sip", name: "SIP Trunk", description: "Direct connection to private PBX systems.", icon: "🌐" },
        ],
    },
    {
        title: "Platforms & CRMs",
        items: [
            { id: "make", name: "Make", description: "Visual workflow automation.", icon: "🧩" },
            { id: "ghl", name: "GoHighLevel", description: "CRM and marketing automation suite.", icon: "🏢" },
            { id: "sheets", name: "Google Sheets", description: "Log call data to spreadsheets.", icon: "📊" },
            { id: "calendar", name: "G-Calendar", description: "Real-time booking and scheduling.", icon: "📅" },
            { id: "slack", name: "Slack", description: "Send call notifications to channels.", icon: "💬" },
        ],
    },
    {
        title: "Cloud & Infrastructure",
        items: [
            { id: "aws", name: "AWS S3", description: "Scalable cloud object storage.", icon: "☁️" },
            { id: "gcs", name: "Google Cloud Storage", description: "Enterprise blob storage.", icon: "📦" },
            { id: "supabase", name: "Supabase", description: "Real-time backend and Postgres DB.", icon: "⚡" },
            { id: "server", name: "Server Config", description: "Manage custom environment variables.", icon: "⚙️" },
        ],
    },
];