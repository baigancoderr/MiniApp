import { CheckCircle, ArrowRight } from "lucide-react";
import { useState } from "react";

const UpgradeHero = () => {
  const [amount, setAmount] = useState("");

  // Same TiltCard Component (copy-paste kar sakte ho dono files mein)
  const TiltCard = ({ children, className = "", tiltStrength = 9 }) => {
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const rotateY = ((mouseX - centerX) / centerX) * tiltStrength;
      const rotateX = ((centerY - mouseY) / centerY) * tiltStrength;

      setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

    return (
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
          transformStyle: 'preserve-3d',
        }}
        className={`relative p-3 rounded-2xl bg-[#13233f]/90 backdrop-blur-2xl 
          border border-white/10 shadow-xl overflow-hidden group cursor-pointer
          hover:border-blue-400/40 hover:shadow-purple-500/20 transition-all duration-300
          ${className}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl" />
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex justify-center px-2">
      <div className="w-full max-w-md space-y-6">

        <div className="rounded-xl p-3 
          bg-gradient-to-br from-[#0a1325] via-[#0f1b33] to-[#0a1325]
          border border-white/10 shadow-2xl backdrop-blur-2xl">

          <h2 className="text-white text-lg font-semibold mb-3">Investment Plans</h2>

          {/* 2x2 Grid Cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <TiltCard>
              <p className="text-gray-400 text-sm ">Total Investment</p>
              {/* <p className="text-white text-md font-medium mt-1">Free Miner</p> */}
              <p className="text-emerald-400 text-md font-semibold mt-1">10</p>
            </TiltCard>

            <TiltCard className="bg-gradient-to-br from-[#1a1333]/90 to-[#2a174a]/90 border-purple-500/30">
              <p className="text-gray-400 text-sm ">Wallet Balance</p>
              {/* <p className="text-white text-md font-medium mt-1">Free Miner</p> */}
              <p className="text-emerald-400 text-md font-semibold mt-1">10</p>
            </TiltCard>
  <TiltCard  className="bg-gradient-to-br from-[#0f2e1f]/90 to-[#174a2f]/90 border-purple-500/30"> 
              <p className="text-gray-400 text-sm ">Total Supply </p>
              {/* <p className="text-white text-md font-medium mt-1">Free Miner</p> */}
              <p className="text-emerald-400 text-md font-semibold mt-1">10</p>
            </TiltCard>
  <TiltCard>
              <p className="text-gray-400 text-sm ">Total Burned</p>
              {/* <p className="text-white text-md font-medium mt-1">Free Miner</p> */}
              <p className="text-emerald-400 text-md font-semibold mt-1">10</p>
            </TiltCard>
          </div>

          {/* Deposit Input */}
          <div className="mb-8">
            <label className="text-gray-400 text-sm font-medium mb-2 block">Deposit Amount (CPR)</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount to deposit"
                className="w-full bg-[#13233f] border border-white/10 focus:border-cyan-400 
                         rounded-md px-6 py-2 text-white text-md placeholder-gray-500 
                         focus:outline-none shadow-inner transition-all"
              />
            </div>
            <p className="text-xs text-gray-500 mt-3 pl-2">Minimum deposit: 25 CPR</p>
          </div>

          {/* Auto-Desc Upgrade Box */}
          <div className="bg-gradient-to-br from-[#1a4a8c] to-[#0b6cff] rounded-xl border  mb-6 shadow-1xl">
            <div className="bg-[#0b1220] rounded-[10px] p-3">
              <div className="bg-[#13233f] rounded-xl p-5 border border-blue-400/20">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-semibold text-xl">⚙️ Auto-Desc</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl text-emerald-400 font-semibold">$25</p>
                  </div>
                </div>

                <p className="text-gray-400 text-[15px] mt-5 leading-relaxed">
                  Enable automatic mining that runs 24 hours a day without any manual intervention.
                </p>

                <div className="mt-8 space-y-3">
                  {[...Array(1)].map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={22} />
                      <span className="text-gray-300 text-sm leading-tight">
                        Permanent auto-mining activation for 24/7 operation
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button 
            className="w-full py-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 
                     text-white text-md font-semibold rounded-xl shadow-md shadow-cyan-500/50
                     hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
            Submit 
            <ArrowRight size={20} />
          </button>

         
        </div>
      </div>
    </div>
  );
};

export default UpgradeHero;