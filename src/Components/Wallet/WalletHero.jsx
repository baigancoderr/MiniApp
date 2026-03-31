import { Coins, CheckCircle, Loader } from "lucide-react";
import { useState } from 'react';

const WalletHero = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateY = ((mouseX - centerX) / centerX) * 10;   // smooth tilt
    const rotateX = ((centerY - mouseY) / centerY) * 10;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  // Reusable Tilt Card Component
  const TiltCard = ({ children, className = "", tiltStrength = 10 }) => {
    const [localRotate, setLocalRotate] = useState({ x: 0, y: 0 });

    const handleLocalMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const rotateY = ((mouseX - centerX) / centerX) * tiltStrength;
      const rotateX = ((centerY - mouseY) / centerY) * tiltStrength;

      setLocalRotate({ x: rotateX, y: rotateY });
    };

    const handleLocalMouseLeave = () => {
      setLocalRotate({ x: 0, y: 0 });
    };

    return (
      <div
        onMouseMove={handleLocalMouseMove}
        onMouseLeave={handleLocalMouseLeave}
        style={{
          transform: `perspective(1200px) rotateX(${localRotate.x}deg) rotateY(${localRotate.y}deg)`,
          transition: 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)',
          transformStyle: 'preserve-3d',
        }}
        className={`relative p-4 rounded-2xl 
          bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 
          shadow-xl overflow-hidden group cursor-pointer
          hover:border-blue-400/30 hover:shadow-purple-500/10 transition-all duration-300
          ${className}`}
      >
        {/* Shine Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
        
        {/* Subtle Bottom Glow */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />

        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex justify-center px-2">
      <div className="w-full max-w-md space-y-6">

        {/* ===== WALLET OVERVIEW ===== */}
        <div className="rounded-2xl p-3
          
          border border-blue-500/20 shadow-2xl backdrop-blur-2xl">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-semibold text-lg tracking-tight">
              Wallet Overview
            </h2>
            <button className="px-5 py-2 text-xs font-medium rounded-lg
              bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 text-white
              hover:brightness-110 transition-all shadow-lg shadow-blue-500/30">
              All Reports
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-4">

            {/* Utility Balance - with tilt */}
            <TiltCard>
              <p className="text-gray-400 text-xs ">UTILITY BALANCE</p>
              <div className="flex items-center gap-3 mt-1">
               
                <div>
                  <p className="text-white text-md font-semibold ">1.5000</p>
                 
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">≈ $0.0750 USD</p>
            </TiltCard>

            {/* Earning Balance */}
            <TiltCard className="bg-gradient-to-br from-[#1a1333]/90 to-[#2a174a]/90 border-purple-500/30">
             <p className="text-gray-400 text-xs ">UTILITY BALANCE</p>
              <div className="flex items-center gap-3 mt-1">
              
                <div>
                  <p className="text-white text-md">4.5000</p>
               
                </div>
              </div>
              

              <button className="mt-2 w-full py-1 rounded-lg text-sm font-semibold
                bg-gradient-to-r from-purple-500 to-pink-500 text-white
                hover:brightness-110 transition-all shadow-md">
                Stake Now
              </button>
            </TiltCard>

            {/* LMX Referral */}
            <TiltCard>
              <p className="text-gray-400 text-xs ">UTILITY BALANCE</p>
              <div className="flex items-center gap-3 mt-1">
               
                <div>
                  <p className="text-white text-md font-semibold ">1.5000</p>
                 
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">≈ $0.0750 USD</p>
            </TiltCard>

            {/* USDT Referral */}
             <TiltCard>
              <p className="text-gray-400 text-xs ">UTILITY BALANCE</p>
              <div className="flex items-center gap-3 mt-1">
               
                <div>
                  <p className="text-white text-md font-semibold ">1.5000</p>
                 
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">≈ $0.0750 USD</p>
            </TiltCard>

            {/* Lifetime Mining */}
             <TiltCard className="bg-gradient-to-br from-[#1a1333]/90 to-[#2a174a]/90 border-purple-500/30">
              <p className="text-gray-400 text-xs ">UTILITY BALANCE</p>
              <div className="flex items-center gap-3 mt-1">
               
                <div>
                  <p className="text-white text-md font-semibold ">1.5000</p>
                 
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">≈ $0.0750 USD</p>
            </TiltCard>

            {/* Staking Earnings */}
         <TiltCard>
              <p className="text-gray-400 text-xs ">UTILITY BALANCE</p>
              <div className="flex items-center gap-3 mt-1">
               
                <div>
                  <p className="text-white text-md font-semibold ">1.5000</p>
                 
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">≈ $0.0750 USD</p>
            </TiltCard>

            {/* USDT Earning */}
            <TiltCard>
              <p className="text-gray-400 text-xs ">UTILITY BALANCE</p>
              <div className="flex items-center gap-3 mt-1">
               
                <div>
                  <p className="text-white text-md font-semibold ">1.5000</p>
                 
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">≈ $0.0750 USD</p>
            </TiltCard>

            {/* Deposit Balance */}
          <TiltCard className="bg-gradient-to-br from-[#0f2e1f]/90 to-[#174a2f]/90 border-purple-500/30">
              <p className="text-gray-400 text-xs ">UTILITY BALANCE</p>
              <div className="flex items-center gap-3 mt-1">
               
                <div>
                  <p className="text-white text-md font-semibold ">1.5000</p>
                 
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">≈ $0.0750 USD</p>
            </TiltCard>

          </div>
        </div>

        {/* ===== MINING HISTORY ===== */}
        <div className="rounded-2xl p-3
          bg-gradient-to-br from-[#0a1428] via-[#0f1a2e] to-[#0a1428]
          border border-blue-500/20 shadow-2xl backdrop-blur-2xl">

          <div className="flex justify-between items-center mb-5">
            <h3 className="text-white font-semibold text-lg">Mining History</h3>
            <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
              Show More →
            </button>
          </div>

          {/* Active Mining */}
          <TiltCard className="mb-4 bg-[#111c33]/80 border-white/10">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-2xl">
                  <Loader size={20} className="text-blue-400 animate-spin" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Coins size={20} className="text-purple-400" />
                    <span className="text-white font-semibold text-lg">6</span>
                  </div>
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-0.5 rounded-full">FREE</span>
                </div>
              </div>

              <div className="text-right text-xs text-gray-400">
                <p>07:06 PM</p>
                <p className="text-blue-400 font-medium">Active</p>
              </div>
            </div>

            <p className="text-cyan-400 text-sm mt-4">0.0125 /min</p>
            <div className="flex justify-between text-xs mt-3 text-gray-400">
              <span>Duration</span>
              <span className="text-white font-medium">480 min</span>
            </div>
          </TiltCard>

          {/* Completed Mining */}
          <TiltCard className="bg-[#111c33]/80 border-white/10">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-2xl">
                  <CheckCircle size={20} className="text-green-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Coins size={20} className="text-purple-400" />
                    <span className="text-white font-semibold text-lg">6</span>
                  </div>
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-0.5 rounded-full">FREE</span>
                </div>
              </div>

              <div className="text-right text-xs text-gray-400">
                <p>11:14 AM</p>
                <p className="text-green-400 font-medium">Completed</p>
              </div>
            </div>

            <p className="text-cyan-400 text-sm mt-4">0.0125 /min</p>
            <div className="flex justify-between text-xs mt-3 text-gray-400">
              <span>Duration</span>
              <span className="text-white font-medium">480 min</span>
            </div>
          </TiltCard>
        </div>

      </div>
    </div>
  );
};

export default WalletHero;