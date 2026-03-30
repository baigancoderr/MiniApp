import { Coins, Users, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import coinImg from "../assets/logo.png";
import miningGif from "../assets/rndr.gif";
import userImg from "../assets/logo.png"; // apni image ka path dal

const Hero = () => {
  const [isMining, setIsMining] = useState(false);
  const [copied, setCopied] = useState(false);

  const referralLink = "https://t.me/your_bot?start=LMX1696812885";

  const handleStart = () => {
    setIsMining(true);
  };
    const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
   const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join using my referral",
          text: "Earn rewards using my link 🚀",
          url: referralLink,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // fallback (telegram/web)
      window.open(`https://t.me/share/url?url=${referralLink}`, "_blank");
    }
  };

  return (
    <div className="w-full flex justify-center  px-3">
      <div className="w-full max-w-md space-y-4">

        {/* ===== EXISTING CARD (same as before) ===== */}
        <div
          className="rounded-2xl p-4
          bg-gradient-to-br from-[#0b1220] via-[#0f1a2e] to-[#0b1220]
          border border-blue-500/20 shadow-lg backdrop-blur-xl"
        >
          {/* Top Header */}
        <div className="flex justify-between items-center mb-4">
  <div className="flex items-center gap-2">
    
    {/* Image instead of gradient div */}
    <img
      src={userImg}
      alt="user"
      className="w-8 h-8 rounded-full object-cover"
    />

    <p className="text-white text-sm font-semibold">
      CIPERA123456
    </p>
  </div>

  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
    FREE
  </span>
</div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-[#0f1a2e] border border-white/10 rounded-xl p-2 text-center">
              <p className="text-gray-400 text-xs">Duration</p>
              <p className="text-white font-semibold">8h</p>
            </div>

            <div className="bg-[#0f1a2e] border border-white/10 rounded-xl p-2 text-center">
              <p className="text-gray-400 text-xs">Rewards</p>
              <p className="text-purple-400 font-semibold">6</p>
            </div>

            <div className="bg-[#0f1a2e] border border-white/10 rounded-xl p-2 text-center">
              <p className="text-gray-400 text-xs">Daily Rewards</p>
              <p className="text-purple-400 font-semibold">18</p>
            </div>
          </div>

          {/* Tokens */}
          <div className="bg-gradient-to-r from-[#0f1a2e] to-[#13233f] rounded-xl p-3 border border-blue-500/20">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-xs">Tokens Earned</p>
                <div className="flex items-center gap-2 mt-1">
                  <Coins className="text-purple-400" size={18} />
                  <p className="text-xl font-bold text-blue-400">
                    8.1760
                  </p>
                </div>
              </div>

              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center shadow-md">
                <Coins className="text-white" size={20} />
              </div>
            </div>

            <div className="flex justify-between mt-3 text-xs text-gray-400">
              <p>
                Total Pool Limit <br />
                <span className="text-white font-semibold">
                  7,759,960 / 150,000,000
                </span>
              </p>

              <p className="text-right">
                Tokens/min <br />
                <span className="text-blue-400 font-semibold">
                  0.0125
                </span>
              </p>
            </div>
          </div>
        </div>


        {/* ===== NEW: Ready To Mine Card ===== */}
<div className="rounded-2xl p-4 
bg-gradient-to-br  from-[#0b1220] via-[#0f1a2e] to-[#0b1220]
border border-blue-500/20 shadow-lg text-center">

  {/* Circle */}
  <div className="flex justify-center mb-4">
    <div className="w-48 h-48 rounded-full 
    overflow-hidden   // ⭐ IMPORTANT
    border border-blue-500/20 shadow-inner">

      {/* Image / GIF */}
      <img
        src={isMining ? miningGif : coinImg}
        alt="mining"
        className="w-full h-full object-cover"  // ⭐ CHANGE
      />
    </div>
  </div>

  {/* Title */}
  <p className="text-cyan-400 font-semibold text-lg mb-1">
    {isMining ? "MINING STARTED 🚀" : "READY TO MINE"}
  </p>

  {/* Subtitle */}
  <p className="text-gray-400 text-xs mb-4">
    {isMining
      ? "⛏️ Mining in progress..."
      : "● Tap START to begin mining"}
  </p>

  {/* Button */}
  <button
    onClick={handleStart}
    disabled={isMining}
    className={`w-full py-3 rounded-xl text-white font-semibold text-sm transition
    ${
      isMining
        ? "bg-gray-600 cursor-not-allowed"
        : "bg-gradient-to-r from-blue-500 to-cyan-400 hover:scale-105"
    }`}
  >
    {isMining ? "Mining Started" : "Tap to Start Mining"}
  </button>
</div>

        {/* ===== NEW: Mining Progress ===== */}
        <div className="rounded-2xl p-4 bg-[#0b1220] border border-blue-500/20">
          
          <div className="flex justify-between items-center mb-3">
            <p className="text-blue-400 text-sm font-semibold">
              Mining Progress
            </p>
            <p className="text-yellow-400 text-sm font-bold">37.7%</p>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-[#1a2a44] overflow-hidden mb-3">
            <div className="h-full w-[37%] bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-500"></div>
          </div>

          {/* Time Labels */}
          <div className="flex justify-between text-xs text-gray-400">
            <span>0h</span>
            <span>2h</span>
            <span>4h</span>
            <span>6h</span>
            <span>8h</span>
          </div>
        </div>

        {/* ===== NEW: Invite & Earn ===== */}
     <div className="rounded-2xl p-4 bg-[#0b1220] border border-blue-500/20">
      
      <div className="flex items-center gap-2 mb-3">
        <Users size={18} className="text-blue-400" />
        <p className="text-white font-semibold">Invite & Earn</p>
      </div>

      {/* Referral Box */}
      <div className="bg-[#111c33] rounded-xl p-3 text-center mb-3 border border-white/10">
        <p className="text-white font-semibold tracking-wide">
          LMX1696812885
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">

        {/* COPY BUTTON */}
        <button
          onClick={handleCopy}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl
          bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-semibold
          hover:scale-105 transition"
        >
          <Copy size={16} />
          {copied ? "Copied!" : "Copy Link"}
        </button>

        {/* SHARE BUTTON */}
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl
          bg-gradient-to-r from-blue-400 to-blue-600 text-white text-sm font-semibold
          hover:scale-105 transition"
        >
          <Share2 size={16} />
          Share
        </button>

      </div>

    </div>
  

      </div>
    </div>
  );
};

export default Hero;