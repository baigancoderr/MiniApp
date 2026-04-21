import { Coins, CheckCircle, ArrowLeft, Loader, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const WalletHero = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  // 🔥 Investment Data (replace later with API)
  const investments = [
    { id: 1, package: 100, tokens: 110, daily: 0.157, days: 120, status: "Active", time: "07:06 PM" },
    { id: 2, package: 50, tokens: 55, daily: 0.078, days: 700, status: "Completed", time: "11:14 AM" },
    { id: 3, package: 500, tokens: 550, daily: 0.78, days: 300, status: "Active", time: "09:20 AM" },
    { id: 4, package: 1000, tokens: 1100, daily: 1.57, days: 50, status: "Active", time: "02:45 PM" },
    { id: 5, package: 100, tokens: 110, daily: 0.157, days: 400, status: "Active", time: "06:30 PM" },
    { id: 6, package: 50, tokens: 55, daily: 0.078, days: 200, status: "Active", time: "10:10 AM" }
  ];

  const walletData = [
  {
    title: "TOTAL BALANCE",
    value: "$1,540",
    sub: "CPR + USDT",
  },
  
  {
    title: "LOCKED TOKENS",
    value: "800 CPR",
    sub: "700 Day Vesting",
  },
  {
    title: "USDT BALANCE",
    value: "320 USDT",
    sub: "Available Funds",
  },
  {
    title: "WITHDRAWABLE AMOUNT",
    value: "245 CPR",
    sub: "After 5% Burn",
  },
];


  const visibleData = showAll ? investments : investments.slice(0, 5);
  

  return (
    <div className="w-full flex justify-center  px-3 py-3">
      

      <div className="w-full max-w-md space-y-6">
          <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-lg bg-[#00000033] border border-[#444385]"
            >
              <ArrowLeft size={18} />
            </button>
            <h2 className="text-lg font-semibold">Wallet </h2>
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
        

        {/* ===== WALLET OVERVIEW ===== */}
        <div className="rounded-2xl p-3 border border-blue-500/20 shadow-2xl">

          <div className="flex justify-between items-center mb-2">
            <h2 className="text-white font-semibold text-lg">
              Wallet Overview
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
  {walletData.map((item, i) => (
    <div
      key={i}
      className="group rounded-2xl border-2 border-[#444385] hover:border-transparent   overflow-hidden"
    >
      <div className="bg-[#00000033] p-3 backdrop-blur-[20px] h-full min-h-[110px]
        transition-all duration-300
        group-hover:bg-[linear-gradient(180deg,_#020204_0%,_#2C6096_100%)]
        group-hover:border-l-[5px] group-hover:border-l-[#587FFF]">

        <p className="text-gray-400 text-xs">{item.title}</p>

        <p className="text-white text-md font-semibold mt-1">
          {item.value}
        </p>

        <p className="text-xs text-gray-400 mt-2">
          {item.sub}
        </p>

      </div>
    </div>
  ))}
</div>
        </div>

        {/* ===== INVESTMENT HISTORY ===== */}
        <div className="rounded-2xl p-3
          bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.5)_1.24%,_rgba(0,7,64,0.245)_20.92%)]
          border border-blue-500/50 shadow-2xl backdrop-blur-2xl">

          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-white font-semibold text-base">
              Investment History
            </h3>

            <button
  onClick={() => navigate("/settings/investment-history")}
  className="text-blue-400 text-xs hover:text-blue-300 transition"
>
  Show All →
</button>
          </div>

          {/* Cards */}
          {visibleData.map((item) => {
            const isActive = item.status === "Active";

            return (
              <div
                key={item.id}
                className="group rounded-2xl border-2 border-[#444385] mb-4 overflow-hidden"
              >
                <div className="bg-[#00000033] p-3 backdrop-blur-[20px]
                  group-hover:bg-[linear-gradient(180deg,_#020204_0%,_#2C6096_100%)]
                  transition-all duration-300">

                  {/* Header */}
                  <div className="flex justify-between">

                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${
                        isActive ? "bg-blue-500/10" : "bg-green-500/10"
                      }`}>
                        {isActive ? (
                          <Loader size={18} className="text-blue-400 animate-spin" />
                        ) : (
                          <CheckCircle size={18} className="text-green-400" />
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <Coins size={16} className="text-purple-400" />
                          <span className="text-white font-semibold text-xs">
                            {item.package} USDC
                          </span>
                        </div>

                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                          {item.tokens} CPR (+10%)
                        </span>
                      </div>
                    </div>

                    <div className="text-right text-[10px] flex flex-col items-end gap-1">

  {/* 🔥 Top Row: Time + Status (side by side for Active) */}
  <div className={`flex items-center gap-2 ${isActive ? "" : "flex-col items-end gap-1"}`}>
    
    <p className="text-gray-400">{item.time}</p>

    <span
      className={`px-2 py-1 rounded-full text-[10px] ${
        isActive
          ? "bg-blue-500/20 text-blue-400"
          : "bg-green-500/20 text-green-400"
      }`}
    >
      {item.status}
    </span>

  </div>

  {/* ✅ Claim Button (only if Active) */}
  {isActive && (
    <button
      onClick={() => console.log("Claim clicked", item.id)}
      className="text-[10px] px-2 py-1 rounded-md  mt-1
      bg-gradient-to-r from-green-400 to-green-600 
      text-white font-[600] shadow-md hover:opacity-90 transition"
    >
      Claim
    </button>
  )}

</div>

                  </div>

                  {/* Body */}
                  <p className="text-cyan-400 text-sm mt-3">
                    {item.daily} CPR / day
                  </p>

                  <div className="flex justify-between text-xs mt-2 text-gray-400">
                    <span>Progress</span>
                    <span className="text-white">
                      {item.days} / 700 days
                    </span>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default WalletHero;