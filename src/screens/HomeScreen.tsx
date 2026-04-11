import { ArrowRight, Leaf, Mail, Globe } from "lucide-react";
import { useState } from "react";
import { Language, translations } from "@/lib/translations";
import kisanIcon from "@/assets/kisan-hero.webp";

interface HomeScreenProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onStart: () => void;
}

// Language Toggle config
const languages: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "te", label: "తెలుగు" },
];

const REALISTIC_HERO = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000";

const HomeScreen = ({ language, onLanguageChange, onStart }: HomeScreenProps) => {
  const t = translations[language];
  const [email, setEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onStart();
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-white">
      {/* 1. HD FARM BACKGROUND */}
      <div className="absolute inset-0">
        <img 
            src={REALISTIC_HERO} 
            alt="Natural Farm" 
            className="w-full h-full object-cover scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B5E20] via-[#1B5E20]/60 to-black/40 backdrop-blur-[1px]" />
      </div>

      {/* 2. MAIN CONTAINER */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center p-6 max-w-sm mx-auto w-full">
        
        {/* REFINED BRANDING */}
        <div className="text-center mb-8">
            <div className="w-24 h-24 rounded-3xl bg-white/20 p-1.5 shadow-2xl relative border border-white/30 overflow-hidden mx-auto mb-4 backdrop-blur-xl">
                <img src={kisanIcon} alt="Kisan Mitra" className="w-full h-full object-cover rounded-2xl" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter drop-shadow-xl mb-1">
                {t.appName}
            </h1>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md text-white/80 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-white/20">
                <Leaf size={12} className="text-[#81C784]" />
                <span>{language === "te" ? "మీ వ్యవసాయ నేస్తం" : "Your Farming Partner"}</span>
            </div>
        </div>

        {/* 3. PREMIUM LOGIN CARD (Farmer Friendly) */}
        <div className="w-full bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[3rem] p-8 shadow-2xl space-y-8 animate-in fade-in zoom-in-95 duration-700">
            
            {/* Language Toggle (Switch Style) */}
            <div className="bg-black/20 p-1.5 rounded-full flex gap-1 relative border border-white/5">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => onLanguageChange(lang.code)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 relative z-10 ${
                            language === lang.code ? "text-[#1B5E20]" : "text-white/60 hover:text-white"
                        }`}
                    >
                        {language === lang.code && (
                            <div className="absolute inset-0 bg-white rounded-full shadow-lg" />
                        )}
                        <span className="relative z-20 flex items-center gap-1.5">
                            <Globe size={12} className={language === lang.code ? "text-[#1B5E20]" : "text-white/40"} />
                            {lang.label}
                        </span>
                    </button>
                ))}
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] pl-4">
                        {language === "te" ? "ఇమెయిల్ అడ్రస్" : "Farmer Email ID"}
                    </label>
                    <div className="relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors">
                            <Mail size={18} />
                        </div>
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={language === "te" ? "పేరు@ఉదాహరణ.కామ్" : "yourname@example.com"}
                            className="w-full bg-black/30 border-2 border-white/10 rounded-[2rem] py-5 pl-14 pr-6 text-white placeholder:text-white/20 outline-none focus:border-white/40 transition-all font-bold tracking-tight"
                        />
                    </div>
                    <p className="text-[9px] text-white/30 text-center font-bold px-4 leading-tight italic">
                        {language === "te" 
                           ? "పంట చరిత్రను భద్రపరచడానికి లాగిన్ అవ్వండి" 
                           : "We store your farming history for better future results."}
                    </p>
                </div>

                <button
                    type="submit"
                    className="w-full py-6 bg-white text-[#1B5E20] rounded-[2.2rem] text-xl font-black shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-4 group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1B5E20]/0 via-[#1B5E20]/5 to-[#1B5E20]/0 skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    <span className="relative">{language === "te" ? "ప్రారంభించండి" : "Login & Protect Farm"}</span>
                    <ArrowRight className="relative group-hover:translate-x-2 transition-transform" size={24} />
                </button>
            </form>
        </div>

        {/* SECURITY FOOTER */}
        <div className="mt-8 opacity-40 flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
            <p className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Secure Agricultural Intelligence Platform</p>
        </div>

      </div>
    </div>
  );
};

export default HomeScreen;
