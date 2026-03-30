import { ShieldCheck, ArrowLeft, Lock, Eye, Clock, Users } from "lucide-react";
import { useState } from "react";

const TermCondition = ({ onBack }) => {
  const [hoveredSection, setHoveredSection] = useState(null);

  const sections = [
    {
      id: 1,
      
      title: "Information We Collect",
      content: "We collect only the essential information needed to provide you with a seamless and personalized experience. This includes your name, email, and usage data to improve our services.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
     
      title: "How We Protect Your Data",
      content: "Your data is encrypted using industry-leading AES-256 encryption and stored on secure servers. We never sell, rent, or share your personal information with third parties for marketing purposes.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      id: 3,
      
      title: "Your Rights & Control",
      content: "You have full control over your data. You can request access, correction, deletion, or export of your data at any time. We respect your privacy choices and make it easy for you to manage them.",
      color: "from-violet-500 to-purple-500"
    },
    {
      id: 4,
      
      title: "Data Retention",
      content: "We retain your data only as long as necessary to fulfill the purposes for which it was collected or as required by law. Once no longer needed, your data is securely deleted.",
      color: "from-amber-500 to-orange-500"
    },
    {
      id: 5,
    
      title: "Third-Party Services",
      content: "We may use trusted third-party services (like analytics and payment processors) that adhere to strict privacy standards. These services have limited access and are bound by confidentiality agreements.",
      color: "from-rose-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-2 py-1 pb-20
      text-white overflow-hidden">

      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(at_50%_30%,rgba(59,130,246,0.15),transparent)]" />

      {/* <div className="w-full max-w-md  relative z-10"> */}
         <div className="w-full max-w-md mx-auto px-2 pt-1">

        {/* Header */}
        <div className="flex items-center gap-4 mb-3">
          <button
            onClick={onBack}
            className="p-2 rounded-md bg-white/5 hover:bg-white/10 active:bg-white/15 
                     backdrop-blur-xl border border-white/10 transition-all duration-300 
                     hover:scale-110 active:scale-95"
          >
            <ArrowLeft size={22} className="transition-transform duration-300" />
          </button>

          <div>
            <h1 className="text-lg font-bold tracking-tight">Term Condition</h1>
            <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Last updated: March 27, 2026
            </p>
          </div>
        </div>

        {/* Main Card with 3D Premium Look */}
        <div className="rounded-2xl p-3 backdrop-blur-2xl 
          bg-white/5 border border-white/10 shadow-xl shadow-black/50
          relative overflow-hidden group">

          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-50" />

          {/* Header inside card */}
          <div className="flex items-center gap-4 mb-4">
            <div className="p-2 rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 
                          transition-transform duration-500 group-hover:rotate-12">
              <ShieldCheck size={20} className="text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight">We Value Your Privacy</p>
              <p className="text-gray-400 text-sm">Your trust is our top priority</p>
            </div>
          </div>

          {/* Privacy Sections with 3D Hover Effect */}
          <div className="space-y-2">
            {sections.map((section, index) => (
              <div
                key={section.id}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
                className={`group/section rounded-xl p-3 border border-white/10 bg-white/5 
                  backdrop-blur-xl transition-all duration-500 cursor-pointer
                  hover:border-white/30 hover:shadow-2xl hover:shadow-black/40
                  ${hoveredSection === section.id 
                    ? 'scale-[1.03] -translate-y-1 shadow-2xl' 
                    : 'hover:scale-[1.01]'}`}
                style={{
                  transitionDelay: `${index * 30}ms`,
                  boxShadow: hoveredSection === section.id 
                    ? '0 25px 50px -12px rgb(0 0 0 / 0.5)' 
                    : '0 10px 15px -3px rgb(0 0 0 / 0.3)'
                }}
              >
                <div className="flex items-start gap-5">
                 

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 tracking-tight text-white">
                      {section.title}
                    </h3>
                    <p className="text-gray-300 text-[14px]">
                      {section.content}
                    </p>
                  </div>
                </div>

                {/* Subtle shine effect on hover */}
                {hoveredSection === section.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                    -skew-x-12 animate-[shine_1.5s_ease-in-out] pointer-events-none" />
                )}
              </div>
            ))}
          </div>

          {/* Footer Note */}
          {/* <div className="mt-10 text-center">
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              This Privacy Policy is designed to be transparent and user-friendly. 
              If you have any questions, feel free to contact us.
            </p>
          </div> */}

         
        </div>

        {/* Trust Badges */}
      
      </div>
    </div>
  );
};

export default TermCondition;