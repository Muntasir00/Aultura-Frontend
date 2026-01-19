import {Icons} from "@/components/icons";

export default function Header() {
    return (
        <header
            className="h-16 border-b flex items-center justify-between px-4 sm:px-8 transition-colors duration-300 sticky top-0 z-40 border-slate-200 bg-white/70 backdrop-blur-md">
            <div className="flex items-center gap-4">
                <button className="md:hidden p-2 text-slate-500">
                    <Icons.bar/>
                </button>
                <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest truncate max-w-[150px] sm:max-w-none">Agents
                    Workshop</h2></div>
            <div className="flex items-center gap-4 relative">
                <div className="flex items-center gap-1 p-1 rounded-lg border bg-slate-100 border-slate-200">
                    <button
                        className="px-3 py-1 rounded-md text-[10px] font-black tracking-widest transition-all bg-blue-600 text-white shadow-sm">EN
                    </button>
                    <button
                        className="px-3 py-1 rounded-md text-[10px] font-black tracking-widest transition-all text-slate-400 hover:text-slate-600">ES
                    </button>
                </div>
                <button
                    className="cursor-pointer p-2 rounded-lg transition-colors text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                    <Icons.lightIcon/>
                </button>
                <div className="relative">
                    <button
                        className="cursor-pointer p-2 rounded-lg transition-colors relative text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                        <Icons.notification/>
                        <span
                            className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                </div>
            </div>
        </header>
    );
}