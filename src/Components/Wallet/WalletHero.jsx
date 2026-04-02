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
    title: "TOTAL WALLET BALANCE",
    value: "$1,540",
    sub: "CPR + USDT Combined",
  },
  {
    title: "USDT BALANCE",
    value: "320 USDT",
    sub: "Available Funds",
  },
  {
    title: "AVAILABLE TO WITHDRAW",
    value: "245 CPR",
    sub: "After 5% Burn",
  },
  {
    title: "LOCKED TOKENS",
    value: "800 CPR",
    sub: "700 Day Vesting",
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

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-semibold text-lg">
              Wallet Overview
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
  {walletData.map((item, i) => (
    <div
      key={i}
      className="group rounded-2xl border-2 border-[#444385] hover:border-transparent overflow-hidden"
    >
      <div className="bg-[#00000033] p-3 backdrop-blur-[20px]
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
            <h3 className="text-white font-semibold text-lg">
              Investment History
            </h3>

            <button
              onClick={() => setShowAll(!showAll)}
              className="text-blue-400 text-sm"
            >
              {showAll ? "Show Less ←" : "Show More →"}
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
                          <Coins size={18} className="text-purple-400" />
                          <span className="text-white font-semibold">
                            {item.package} USDC
                          </span>
                        </div>

                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                          {item.tokens} CPR (+10%)
                        </span>
                      </div>
                    </div>

                    <div className="text-right text-xs text-gray-400">
                      <p>{item.time}</p>
                      <p className={`font-medium ${
                        isActive ? "text-blue-400" : "text-green-400"
                      }`}>
                        {item.status}
                      </p>
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












// import { Coins, CheckCircle, Loader } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const WalletHero = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="w-full flex justify-center px-2">
//       <div className="w-full max-w-md space-y-6">

//         {/* ===== WALLET OVERVIEW ===== */}
//         <div className="rounded-2xl p-3
          
//           border border-blue-500/20 shadow-2xl ">

//           {/* Header */}
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-white font-semibold text-lg tracking-tight">
//               Wallet Overview
//             </h2>
//             <button className="px-5 py-2 text-xs font-medium rounded-lg
//               bg-[linear-gradient(45deg,_#587FFF_0%,_#09239F_100%)] text-white
//               hover:brightness-110 transition-all shadow-lg shadow-blue-500/30">
//               All Reports
//             </button>
//           </div>

//           {/* Grid */}
//           <div className="grid grid-cols-2 gap-3">

        

//             {/* Lifetime Mining */}
//             <div className="group rounded-2xl border-2 border-[#444385] hover:border-transparent overflow-hidden">
//               <div className="bg-[#00000033] p-3 h-full backdrop-blur-[20px] transition-all duration-300 group-hover:bg-[linear-gradient(180deg,_#020204_0%,_#2C6096_100%)] group-hover:border-l-[5px] group-hover:border-l-[#587FFF]">
//                 <p className="text-gray-400 text-xs">LIFETIME MINING</p>
//                 <div className="flex items-center gap-3 mt-1">
//                   <div>
//                     <p className="text-white text-md font-semibold">1.5000</p>
//                   </div>
//                 </div>
//                 <p className="text-xs text-gray-400 mt-2">≈ $0.0750 USD</p>
//               </div>
//             </div>

//             {/* Staking Earnings */}
//             <div className="group rounded-2xl border-2 border-[#444385] hover:border-transparent overflow-hidden">
//               <div className="bg-[#00000033] p-3 h-full backdrop-blur-[20px] transition-all duration-300 group-hover:bg-[linear-gradient(180deg,_#020204_0%,_#2C6096_100%)] group-hover:border-l-[5px] group-hover:border-l-[#587FFF]">
//                 <p className="text-gray-400 text-xs">STAKING EARNINGS</p>
//                 <div className="flex items-center gap-3 mt-1">
//                   <div>
//                     <p className="text-white text-md font-semibold">1.5000</p>
//                   </div>
//                 </div>
//                 <p className="text-xs text-gray-400 mt-2">≈ $0.0750 USD</p>
//               </div>
//             </div>

//             {/* USDT Earning */}
//             <div className="group rounded-2xl border-2 border-[#444385] hover:border-transparent overflow-hidden">
//               <div className="bg-[#00000033] p-3 h-full backdrop-blur-[20px] transition-all duration-300 group-hover:bg-[linear-gradient(180deg,_#020204_0%,_#2C6096_100%)] group-hover:border-l-[5px] group-hover:border-l-[#587FFF]">
//                 <p className="text-gray-400 text-xs">USDT EARNING</p>
//                 <div className="flex items-center gap-3 mt-1">
//                   <div>
//                     <p className="text-white text-md font-semibold">1.5000</p>
//                   </div>
//                 </div>
//                 <p className="text-xs text-gray-400 mt-2">≈ $0.0750 USD</p>
//               </div>
//             </div>

//             {/* Deposit Balance */}
//             <div className="group rounded-2xl border-2 border-[#444385] hover:border-transparent overflow-hidden">
//               <div className="bg-[#00000033] p-3 h-full backdrop-blur-[20px] transition-all duration-300 group-hover:bg-[linear-gradient(180deg,_#020204_0%,_#2C6096_100%)] group-hover:border-l-[5px] group-hover:border-l-[#587FFF]">
//                 <p className="text-gray-400 text-xs">DEPOSIT BALANCE</p>
//                 <div className="flex items-center gap-3 mt-1">
//                   <div>
//                     <p className="text-white text-md font-semibold">1.5000</p>
//                   </div>
//                 </div>
//                 <p className="text-xs text-gray-400 mt-2">≈ $0.0750 USD</p>
//               </div>
//             </div>
               

//           </div>
//         </div>

//         {/* ===== REFERRAL HISTORY ===== */}
//         <div className="rounded-2xl p-3
//           bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.5)_1.24%,_rgba(0,7,64,0.245)_20.92%)]
//           border border-blue-500/50 shadow-2xl backdrop-blur-2xl">

//           <div className="flex justify-between items-center mb-5">
//             <h3 className="text-white font-semibold text-lg">Referall History</h3>
//             <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
//               Show More →
//             </button>
//           </div>

//           {/* Active Mining */}
//           <div className="group rounded-2xl border-2 border-[#444385] hover:border-transparent overflow-hidden mb-4">
//             <div className="bg-[#00000033] p-3 backdrop-blur-[20px] transition-all duration-300 group-hover:bg-[linear-gradient(180deg,_#020204_0%,_#2C6096_100%)] group-hover:border-l-[5px] group-hover:border-l-[#587FFF]">
//               <div className="flex justify-between items-start">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-blue-500/10 rounded-2xl">
//                     <Loader size={20} className="text-blue-400 animate-spin" />
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <Coins size={20} className="text-purple-400" />
//                       <span className="text-white font-semibold text-lg">6</span>
//                     </div>
//                     <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-0.5 rounded-full">FREE</span>
//                   </div>
//                 </div>

//                 <div className="text-right text-xs text-gray-400">
//                   <p>07:06 PM</p>
//                   <p className="text-blue-400 font-medium">Active</p>
//                 </div>
//               </div>

//               <p className="text-cyan-400 text-sm mt-4">0.0125 /min</p>
//               <div className="flex justify-between text-xs mt-3 text-gray-400">
//                 <span>Duration</span>
//                 <span className="text-white font-medium">480 min</span>
//               </div>
//             </div>
//           </div>

//           {/* Completed Mining */}
//           <div className="group rounded-2xl border-2 border-[#444385] hover:border-transparent overflow-hidden">
//             <div className="bg-[#00000033] p-3 backdrop-blur-[20px] transition-all duration-300 group-hover:bg-[linear-gradient(180deg,_#020204_0%,_#2C6096_100%)] group-hover:border-l-[5px] group-hover:border-l-[#587FFF]">
//               <div className="flex justify-between items-start">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2 bg-green-500/10 rounded-2xl">
//                     <CheckCircle size={20} className="text-green-400" />
//                   </div>
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <Coins size={20} className="text-purple-400" />
//                       <span className="text-white font-semibold text-lg">6</span>
//                     </div>
//                     <span className="text-xs bg-blue-500/20 text-blue-400 px-3 py-0.5 rounded-full">FREE</span>
//                   </div>
//                 </div>

//                 <div className="text-right text-xs text-gray-400">
//                   <p>11:14 AM</p>
//                   <p className="text-green-400 font-medium">Completed</p>
//                 </div>
//               </div>

//               <p className="text-cyan-400 text-sm mt-4">0.0125 /min</p>
//               <div className="flex justify-between text-xs mt-3 text-gray-400">
//                 <span>Duration</span>
//                 <span className="text-white font-medium">480 min</span>
//               </div>
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default WalletHero;