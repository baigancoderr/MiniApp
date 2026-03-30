import { ArrowLeft, HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQ = ({ onBack }) => {
  const [openSection, setOpenSection] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How does Pipe work?",
      answer: "Pipe is a modern capital platform that enables companies to advance their revenue for up-front capital. For businesses, that means growth on your terms with more cash flow for scaling a company without dilution.",
    },
    {
      id: 2,
      question: "Is Pipe right for my company?",
      answer: "Pipe is ideal for growing SaaS, subscription, and recurring revenue businesses that want non-dilutive capital. If your company has predictable recurring revenue, Pipe can help you access capital quickly.",
    },
    {
      id: 3,
      question: "How much capital can I access?",
      answer: "The amount of capital you can access depends on your monthly recurring revenue (MRR) and contract terms. Most businesses can access 1-3x their annual recurring revenue.",
    },
    {
      id: 4,
      question: "What are the costs and fees to use Pipe?",
      answer: "Pipe charges a flat fee based on the advance amount and repayment terms. There are no hidden fees, no equity dilution, and no personal guarantees required.",
    },
    {
      id: 5,
      question: "How much does Pipe cost?",
      answer: "Costs vary based on the advance size and chosen repayment period. You'll see a transparent breakdown of all fees before accepting any advance.",
    },
     {
      id: 6,
      question: "How much does Pipe cost?",
      answer: "Costs vary based on the advance size and chosen repayment period. You'll see a transparent breakdown of all fees before accepting any advance.",
    },
     {
      id: 7,
      question: "How much does Pipe cost?",
      answer: "Costs vary based on the advance size and chosen repayment period. You'll see a transparent breakdown of all fees before accepting any advance.",
    },
  ];

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-2 py-3 pb-20 text-white overflow-hidden bg-black relative">

      {/* Deep 3D Background Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(at_50%_20%,rgba(59,130,246,0.18),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(at_30%_70%,rgba(34,211,238,0.12),transparent_60%)]" />

      <div className="w-full max-w-md mx-auto">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="p-1 rounded-md bg-white/5 hover:bg-white/10 active:bg-white/15 
                       backdrop-blur-2xl border border-white/10 transition-all duration-300 
                       hover:scale-110 active:scale-95 shadow-lg shadow-black/50"
          >
            <ArrowLeft size={22} className="transition-transform duration-300" />
          </button>

          <div>
            <h1 className="text-md font-bold tracking-tighter">FAQ</h1>
            <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              Last updated: March 27, 2026
            </p>
          </div>
        </div>

        {/* Premium 3D Main Card */}
        <div className="relative rounded-lg p-3 backdrop-blur-3xl 
          bg-gradient-to-br from-white/[0.07] to-white/[0.02]
          border border-white/10 shadow-lg shadow-black/80
          overflow-hidden">

          {/* Strong 3D Inner Lighting */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/5 rounded-lg" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Top Glow Accent */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 
            bg-cyan-400/10 rounded-full blur-3xl" />

          {/* Header inside card */}
          <div className="flex items-center gap-4 mb-4">
            <div className="p-1 rounded-md bg-gradient-to-br from-blue-600 via-cyan-500 to-cyan-400 
                            shadow-2xl shadow-cyan-500/50 transition-all duration-500 hover:rotate-6 hover:scale-110">
              <HelpCircle size={32} className="text-white drop-shadow-lg" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tighter">Frequently Asked Questions</p>
              <p className="text-gray-400 text-sm mt-1">Everything you need to know about Pipe</p>
            </div>
          </div>

          {/* FAQ Items - Enhanced 3D Style */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                onMouseEnter={() => setHoveredSection(faq.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`group rounded-md border backdrop-blur-xl transition-all duration-500 overflow-hidden
                  ${openSection === faq.id 
                    ? 'border-cyan-400/30 bg-white/10 shadow-2xl shadow-cyan-500/20' 
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'}`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  transform: hoveredSection === faq.id || openSection === faq.id 
                    ? 'translateY(-4px) scale(1.02)' 
                    : 'translateY(0)',
                }}
              >
                <button
                  onClick={() => toggleSection(faq.id)}
                  className="w-full px-3 py-1 flex items-center justify-between text-left transition-all duration-300"
                >
                  <h3 className="font-semibold text-[14px] tracking-tight pr-6 leading-snug">
                    {faq.question}
                  </h3>
                  
                  <div className={`p-1 rounded-md transition-all duration-300 flex-shrink-0
                    ${openSection === faq.id 
                      ? 'bg-cyan-400/20 shadow-inner shadow-cyan-400/30' 
                      : 'bg-white/5 group-hover:bg-white/10'}`}>
                    <ChevronDown 
                      size={22} 
                      className={`text-white transition-transform duration-500 ${openSection === faq.id ? 'rotate-180' : ''}`} 
                    />
                  </div>
                </button>

                {/* Answer with smooth slide */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out px-5
                    ${openSection === faq.id ? 'max-h-60 pb-6' : 'max-h-0'}`}
                >
                  <div className="border-t border-white/10 pt-5">
                    <p className="text-gray-300 text-[14.5px] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Support Note */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <p className="text-xs text-gray-400">
                Still have questions? <span className="text-cyan-400 hover:underline cursor-pointer">Contact support</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;