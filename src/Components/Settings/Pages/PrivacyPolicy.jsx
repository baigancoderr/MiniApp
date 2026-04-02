import { ShieldCheck, ArrowLeft, Lock, Eye, Clock, Users, User, Settings, Database, Globe, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const [hoveredSection, setHoveredSection] = useState(null);
  const navigate = useNavigate();

  const sections = [
    {
      id: 1,
      icon: <Database size={24} />,
      title: "Information We Collect",
      color: "from-blue-500 to-cyan-500",
      content: [
        "• Personal Information: Name, email address, or wallet-related identifiers (only if voluntarily provided)",
        "• Technical Data: IP address, browser type, device information, and interaction data",
        "• Blockchain Data: Public wallet addresses and transaction history recorded on the Ethereum blockchain",
        "All blockchain transactions are publicly visible and cannot be altered or deleted."
      ]
    },
    {
      id: 2,
      icon: <Lock size={24} />,
      title: "How We Use Your Information",
      color: "from-emerald-500 to-teal-500",
      content: [
        "• Provide and improve CIPERA ecosystem services",
        "• Enable secure transactions and smart contract interactions",
        "• Support staking, governance, and DeFi functionalities",
        "• Enhance user experience and platform performance",
        "• Ensure compliance with legal and regulatory requirements"
      ]
    },
    {
      id: 3,
      icon: <ShieldCheck size={24} />,
      title: "Data Security",
      color: "from-violet-500 to-purple-500",
      content: [
        "CIPERA utilizes secure ERC-20 smart contracts and blockchain technology to ensure transparency and security.",
        "• Users are responsible for safeguarding their private keys and wallets",
        "• Transactions executed on the blockchain are irreversible",
        "• While we implement best security practices, no system is completely risk-free"
      ]
    },
    {
      id: 4,
      icon: <Globe size={24} />,
      title: "Third-Party Services",
      color: "from-amber-500 to-orange-500",
      content: [
        "CIPERA may integrate with third-party platforms such as decentralized exchanges (e.g., Uniswap V3) and wallet providers.",
        "• We are not responsible for the privacy practices of third-party services",
        "• Users should review their respective privacy policies before engaging"
      ]
    },
    {
      id: 5,
      icon: <Clock size={24} />,
      title: "Data Retention",
      color: "from-rose-500 to-pink-500",
      content: [
        "We retain personal data only as long as necessary for operational, legal, or regulatory purposes.",
        "Blockchain data, once recorded, remains permanently on the Ethereum network."
      ]
    },
    {
      id: 6,
      icon: <Users size={24} />,
      title: "Your Rights",
      color: "from-indigo-500 to-blue-500",
      content: [
        "Depending on your jurisdiction, you may have the right to:",
        "• Access the personal data we hold about you",
        "• Request correction or updates to your data",
        "• Request deletion of your personal data (where applicable)",
        "• Object to or restrict certain data processing activities",
        "These rights are subject to applicable legal and regulatory obligations."
      ]
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6 pb-20 text-white overflow-hidden ">

      {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(at_50%_30%,rgba(59,130,246,0.15),transparent)]" />

      <div className="w-full max-w-md mx-auto">

        {/* Top Navigation */}
          <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/settings")}
              className="p-2 rounded-lg bg-[#00000033] border border-[#444385]"
            >
              <ArrowLeft size={18} />
            </button>
            <h2 className="text-lg font-semibold">Privacy Policy</h2>
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

        {/* Main Card - Original Premium Theme */}
        <div className="rounded-xl p-3 
          bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.5)_1.24%,_rgba(0,7,64,0.245)_20.92%)] 
          border border-white/10 shadow-xl shadow-black/50 relative overflow-hidden">

          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-50" />

          {/* Header - Title on top, Description below */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 rounded-md 
                bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.5)_1.24%,_rgba(0,7,64,0.245)_20.92%)] 
                shadow-md shadow-blue-500/30">
                <ShieldCheck size={16} className="text-white" />
              </div>
              <h2 className="text-md font-bold tracking-tight">We Value Your Privacy</h2>
            </div>

            {/* Description Below Title */}
            <p className="text-gray-400 text-sm leading-relaxed pl-1">
              CIPERA (CIP) is a next-generation digital asset built on the Ethereum blockchain. 
              We are committed to protecting your privacy and ensuring transparency in how your 
              information is collected, used, and stored while interacting with our ecosystem.
            </p>
          </div>

          {/* Sections - Icon + Title on Top, Content Below */}
          <div className="space-y-4">
            {sections.map((section) => (
              <div
                key={section.id}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`group rounded-2xl p-5 border border-white/10 
                  bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.5)_1.24%,_rgba(0,7,64,0.245)_20.92%)]
                  backdrop-blur-xl transition-all duration-500 cursor-default
                  hover:border-white/30 hover:shadow-2xl hover:shadow-black/40
                  ${hoveredSection === section.id 
                    ? 'scale-[1.02] -translate-y-1 shadow-2xl' 
                    : 'hover:scale-[1.005]'}`}
              >
                {/* Icon + Title on Top */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${section.color} text-white shadow-md`}>
                    {section.icon}
                  </div>
                  <h3 className="font-semibold text-sm tracking-tight text-white">
                    {section.title}
                  </h3>
                </div>

                {/* Content List Below */}
                <div className="text-gray-300 text-[10px] leading-relaxed pl-1 space-y-2.5">
                  {section.content.map((item, i) => (
                    <p key={i} className="text-sm">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Cookies and Updates */}
          <div className="mt-8 space-y-4">
            <div className="rounded-2xl p-5 border border-white/10 bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.4)_1.24%,_rgba(0,7,64,0.2)_20.92%)]">
              <div className="flex items-center gap-3 mb-3">
                <Eye size={22} className="text-amber-400" />
                <h3 className="font-semibold text-white">Cookies and Tracking</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                We may use cookies or similar technologies to enhance user experience, analyze platform usage, and improve system performance. 
                You can manage cookie preferences through your browser settings.
              </p>
            </div>

            <div className="rounded-2xl p-5 border border-white/10 bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.4)_1.24%,_rgba(0,7,64,0.2)_20.92%)]">
              <div className="flex items-center gap-3 mb-3">
                <AlertTriangle size={22} className="text-orange-400" />
                <h3 className="font-semibold text-white">Updates to This Policy</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Any changes to this Privacy Policy will be posted on the official CIPERA website. 
                Continued use of our services constitutes acceptance of the updated policy.
              </p>
            </div>
          </div>

          {/* Last Updated */}
          <div className="mt-10 text-center">
            <p className="text-xs text-gray-500">
              Last updated: March 27, 2026
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-8 px-4">
          <p className="text-xs text-gray-500">
            For any questions or concerns, contact the CIPERA team through official communication channels.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;