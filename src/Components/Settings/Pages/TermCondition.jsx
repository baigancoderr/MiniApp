import { ShieldCheck, ArrowLeft, User, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TermCondition = () => {
  
   const navigate = useNavigate();
  const [hoveredSection, setHoveredSection] = useState(null);

  const sections = [
    {
      id: 1,
      title: "Acceptance",
      content: "By accessing, purchasing, or using CIPERA (CIP) tokens or any related services, you agree to be bound by these Terms & Conditions and any future updates. If you do not agree with any part of these Terms, you must not access or use the CIPERA ecosystem.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Eligibility",
      content: "Your data is encrypted using industry-leading AES-256 encryption and stored on secure servers. We never sell, rent, or share your personal information with third parties for marketing purposes.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      id: 3,
      title: "Tokenized Property Investment Terms – CIPERA",
      isList: true, // Flag to identify list section
      content: [
        "CIPERA (CIP) is a digital asset built on the Ethereum blockchain using ERC-20 standards.",
        "The total supply of CIPERA tokens is 100,000,000 (100 million) with an initial launch price of $0.01 USDT.",
        "CIPERA tokens are designed for utility purposes, including ecosystem payments, trading, liquidity participation, and governance.",
        "Holding CIPERA tokens does not represent ownership, equity, or legal rights in any company or physical assets.",
        "The value of CIPERA tokens may fluctuate due to market conditions, and no guarantees of profit or returns are provided.",
        "Participation in staking, liquidity, or DeFi activities involves risks, including potential loss of funds.",
        " Users are solely responsible for managing their private keys, wallets, and security measures.",
        "CIPERA operates in a decentralized environment, and transactions executed via smart contracts are irreversible.",
        "The project may introduce deflationary mechanisms, vesting schedules, and governance models to maintain long-term ecosystem sustainability.",
        "By participating in CIPERA, users agree to all associated risks related to blockchain technology, smart contracts, and market volatility."
      ],
      color: "from-violet-500 to-purple-500"
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-2 py-1 pb-24 text-white overflow-hidden">
      {/* Subtle background glow */}
<div className="absolute inset-0 pointer-events-none bg-[radial-gradient(at_50%_30%,rgba(59,130,246,0.15),transparent)]" />
      
      <div className="w-full max-w-md mx-auto px-1 pt-1">
        {/* Header */}
         <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/settings")}
              className="p-2 rounded-lg bg-[#00000033] border border-[#444385]"
            >
              <ArrowLeft size={18} />
            </button>
            <h2 className="text-lg font-semibold">Term & Conditions</h2>
          </div>

          <div
            onClick={() => navigate("/settings")}
            className="w-10 h-10 flex items-center justify-center rounded-xl 
              bg-gradient-to-r from-[#587FFF] to-[#09239F] 
              shadow-lg shadow-blue-500/20
              cursor-pointer active:scale-95 transition"
          >
            <User size={18} />
          </div>
        </div>

        {/* Main Card */}
        <div className="rounded-2xl p-2 
          bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.5)_1.24%,_rgba(0,7,64,0.245)_20.92%)] 
          border border-white/10 shadow-xl shadow-black/50 relative overflow-hidden">

          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-50" />

          {/* Header inside card */}
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-xl bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.5)_1.24%,_rgba(0,7,64,0.245)_20.92%)] shadow-lg shadow-blue-500/30">
              <ShieldCheck size={24} className="text-white" />
            </div>
            <div>
              <p className="text-md font-semibold tracking-tight">We Value Your Trust</p>
              <p className="text-gray-400 text-xs">Please read carefully before proceeding</p>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-4">
            {sections.map((section, index) => (
              <div
                key={section.id}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`group/section rounded-2xl p-5 border border-white/10 
                  bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.5)_1.24%,_rgba(0,7,64,0.245)_20.92%)]
                  transition-all duration-500 cursor-pointer hover:border-white/30 
                  hover:shadow-2xl hover:shadow-black/40
                  ${hoveredSection === section.id 
                    ? 'scale-[1.02] -translate-y-1 shadow-2xl' 
                    : 'hover:scale-[1.005]'}`}
                style={{
                  transitionDelay: `${index * 40}ms`,
                }}
              >
              {/* Top Row: Icon + Title */}
<div className="flex items-center gap-3 mb-3">
  <CheckCircle size={20} className="text-emerald-400 flex-shrink-0" />
  
  <h3 className="font-semibold text-sm tracking-tight text-white">
    {section.title}
  </h3>
</div>

{/* Full Width Content */}
<div>
  {section.isList ? (
    <ul className="space-y-3 text-xs text-gray-300">
      {section.content.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="text-emerald-400 mt-1.5">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-300 text-xs leading-relaxed">
      {section.content}
    </p>
  )}
</div>

                {/* Shine effect on hover */}
                {hoveredSection === section.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                    -skew-x-12 animate-[shine_1.8s_ease-in-out] pointer-events-none" />
                )}
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you acknowledge that you have read and understood these Terms & Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermCondition;