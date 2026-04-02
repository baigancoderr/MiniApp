'use client';

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, User, Clock, Package, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import usdt from "../../assets/usdt.png"
import { Link } from "react-router-dom";

const AddFundPage = () => {
  const navigate = useNavigate();

  const coins = [
    { name: "USDT", icon: usdt },
  ];
  const [isChecked, setIsChecked] = useState(false);
  const [selected, setSelected] = useState(coins[0]);
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleQuickAmount = (value) => {
    setAmount(value.replace("$", ""));
  };

  return (
    <div className="min-h-screen pb-24  text-white px-3 py-3">
      <div className="max-w-md mx-auto">

        {/* 🔷 HEADER */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/settings")}
              className="p-2 rounded-lg bg-[#00000033] border border-[#444385]"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-lg font-semibold">Add Fund</h1>
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

        {/* 💰 AMOUNT CARD */}
        <div className="rounded-2xl border-2 border-[#444385] overflow-hidden mb-5">
          <div className="bg-[#00000033] p-4 backdrop-blur-[20px]">

            <p className="text-gray-400 text-xs mb-2">Enter Amount</p>

           <div className="flex items-center bg-black border border-[#444385] rounded-lg px-3 py-2 relative">

              {/* INPUT */}
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-transparent outline-none text-white flex-1 min-w-0"
              />

              {/* COIN SELECT */}
              <div
                ref={buttonRef}
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 cursor-pointer ml-2 shrink-0"
              >
                <img src={selected.icon} className="w-4 h-4" />
                <span className="text-sm whitespace-nowrap">{selected.name}</span>
                <span className="text-xs text-gray-400">▼</span>
              </div>

              {/* DROPDOWN */}
              {open && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 top-full mt-1 w-28 bg-black border border-[#444385] rounded-md z-50"
                >
                  {coins.map((coin) => (
                    <div
                      key={coin.name}
                      onClick={() => {
                        setSelected(coin);
                        setOpen(false);
                      }}
                      className="px-3 py-1.5  cursor-pointer text-sm"
                    >
                      {coin.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <p className="text-xs text-blue-400 mt-2">
              Minimum: $2 USDT
            </p>
          </div>
        </div>

        {/* ⚡ QUICK AMOUNTS */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {["$25", "$50", "$100", "$200"].map((amt) => (
            <button
              key={amt}
              onClick={() => handleQuickAmount(amt)}
              className="rounded-xl border-2 border-[#444385] overflow-hidden group"
            >
              <div className="bg-[#00000033] py-3 text-sm
              group-hover:bg-[linear-gradient(180deg,#020204,#2C6096)]
              transition-all">
                {amt}
              </div>
            </button>
          ))}
        </div>

        {/* 📋 PAYMENT INSTRUCTIONS */}
        <div className="rounded-2xl border-2 border-[#444385] overflow-hidden mb-6">
          <div className="bg-[#00000033] p-4 backdrop-blur-[20px] space-y-4">

            <div className="flex gap-3">
              <Clock className="text-blue-400" size={18} />
              <div>
                <p className="text-sm">20 Minute Timeout</p>
                <p className="text-xs text-gray-400">
                  Complete payment within 20 minutes.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Package className="text-blue-400" size={18} />
              <div>
                <p className="text-sm">Single Transaction</p>
                <p className="text-xs text-gray-400">
                  Send exact amount in one transaction.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <ShieldCheck className="text-blue-400" size={18} />
              <div>
                <p className="text-sm">Network Confirmation</p>
                <p className="text-xs text-gray-400">
                  Funds will reflect after confirmations.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ✅ TERMS */}
        <div className="flex items-start gap-2 mb-6">
          <input
  type="checkbox"
  checked={isChecked}
  onChange={(e) => setIsChecked(e.target.checked)}
  className="mt-1 accent-blue-500"
/>

<p className="text-xs text-gray-400 leading-relaxed">
  I agree to the{" "}
  
  <Link 
    to="/settings/term-condition"
    className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition"
  >
    Terms of Service
  </Link>{" "}
  
  and{" "}
  
  <Link 
    to="/settings/privacy"
    className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition"
  >
    Privacy Policy
  </Link>
</p>
        </div>

        {/* 🚀 BUTTON */}
        <button
  disabled={!isChecked}
  className={`w-full py-3 rounded-full font-semibold transition-all
  ${
    isChecked
      ? "bg-[linear-gradient(45deg,#587FFF,#09239F)] hover:bg-[linear-gradient(45deg,#6C8CFF,#0B2ED1)]"
      : "bg-[linear-gradient(45deg,#587FFF,#09239F)]  cursor-not-allowed opacity-60"
  }`}
>
  Deposit
</button>

      </div>
    </div>
  );
};

export default AddFundPage;








// import { useState, useRef, useEffect } from "react";
// import { ArrowLeft, Settings, Copy, Share2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { Clock, Package, ShieldCheck } from "lucide-react";
// const AddFundHero = () => {
//   const navigate = useNavigate();
//   const coins = [
//     // { name: "BNB", icon: "https://cryptologos.cc/logos/bnb-bnb-logo.png" },
//     { name: "USDT", icon: "https://cryptologos.cc/logos/tether-usdt-logo.png" },
//     // { name: "SOL", icon: "https://cryptologos.cc/logos/solana-sol-logo.png" },
//     // { name: "BTC", icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
//     // { name: "ETH", icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
//   ];

//   const [selected, setSelected] = useState(coins[0]);
//   const [amount, setAmount] = useState(""); // Added state for amount
//   const [open, setOpen] = useState(false);

//   const dropdownRef = useRef(null);
//   const buttonRef = useRef(null);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target) &&
//         buttonRef.current &&
//         !buttonRef.current.contains(event.target)
//       ) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Handle quick amount selection
//   const handleQuickAmount = (value) => {
//     const numericValue = value.replace("$", "");
//     setAmount(numericValue);
//   };

//   return (
//     <div className="w-full flex justify-center text-white font-poppins">
//       <div className="w-full max-w-md px-4 py-4 relative">
//         {/* Header */}
//         {/* <div className="flex items-center gap-3 mb-6">
//           <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
//             <ArrowLeft size={20} />
//           </button>
//           <h1 className="text-lg font-semibold">Add Funds</h1>
//         </div> */}

//          <div className="flex bg-[#282936] items-center justify-between mb-5 px-3 py-2">
//                     <div className="flex items-center gap-3">
//                         <button 
//   onClick={() => navigate("/settings")} 
//   className="p-1.5 rounded-md text-[#FFFFFF]"
// >
//   <ArrowLeft size={20} />
// </button>
//                         <h1 className="text-lg font-[Manrope] font-bold">Add Fund</h1>
//                     </div>
//                     <Settings size={20} className="text-white" />
//                 </div>

//         {/* Amount Input */}
//        <div className="mb-5">
//   <p className="text-sm text-gray-400 mb-2">Enter Amount</p>

//   <div className="flex items-center justify-between bg-[#20262F] border border-[#81ECFF] rounded-md px-4 py-2 relative">
    
//     <input
//       type="number"
//       placeholder="0.00"
//       value={amount}
//       onChange={(e) => setAmount(e.target.value)}
//       className="bg-transparent outline-none text-md font-medium w-full text-gray-200 placeholder-gray-500"
//     />

//     {/* Currency Selector */}
//     <div
//       ref={buttonRef}
//       onClick={() => setOpen(!open)}
//       className="bg-black px-3 py-1 rounded-md flex items-center gap-2 cursor-pointer hover:bg-zinc-900 transition border border-white/10"
//     >
//       <img
//         src={selected.icon}
//         alt={selected.name}
//         className="w-5 h-5 rounded-full"
//         onError={(e) => (e.target.src = "https://via.placeholder.com/24?text=?")}
//       />
//       <span className="text-sm font-semibold text-white">{selected.name}</span>
//       <span className="text-xs text-gray-400">▼</span>
//     </div>

//     {/* Dropdown */}
//     {open && (
//       <div
//         ref={dropdownRef}
//         className="absolute top-full right-3 mt-2 w-28 bg-[#000]  border border-[#81ECFF] rounded-md shadow-2xl z-50 overflow-hidden py-1"
//       >
//         {coins.map((coin) => (
//           <div
//             key={coin.name}
//             onClick={() => {
//               setSelected(coin);
//               setOpen(false);
//             }}
//             className={`px-3 py-2 flex items-center gap-2 cursor-pointer transition ${
//               selected.name === coin.name
//                 ? " text-[#FFA20D]"
//                 : "hover:bg-black/10"
//             }`}
//           >
//             <span className="text-[#FFA20D] items-center font-semibold">{coin.name}</span>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>

//   <p className="text-xs text-cyan-400 mt-2 pl-1">
//     Minimum: $2 USDT
//   </p>
// </div>

//         {/* Quick Amount Buttons - Now functional */}
//         <div className="grid grid-cols-4 gap-3 mb-6">
//           {["$25", "$50", "$100", "$200"].map((amt) => (
//             <button
//               key={amt}
//               onClick={() => handleQuickAmount(amt)}
//               className="py-3 rounded-xl bg-[#1B2028] hover:bg-[#31458C] border border-white/10 text-sm font-medium transition active:scale-95"
//             >
//               {amt}
//             </button>
//           ))}
//         </div>

//         {/* Payment Instructions - Icons on first line */}
    
// <div className="mb-6">
//   <p className="text-xs tracking-widest text-[#FFFFFF] mb-4">
//     PAYMENT INSTRUCTIONS
//   </p>

//   <div className="rounded-xl p-[0.7px] bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.5)_1.24%,_rgba(0,7,64,0.245)_20.92%)] border border-white shadow-xl overflow-hidden">
    
//     <div className="rounded-2xl p-5 bg-white/5 backdrop-blur-xl border border-white/10 space-y-5">
      
//       {/* Timeout */}
//       <div className="flex gap-3 items-start">
//         <div className="p-2 rounded-xl bg-purple-500/20 flex items-center justify-center">
//           <Clock size={18} className="text-purple-400" />
//         </div>
//         <div className="flex-1">
//           <p className="text-sm font-medium text-white">20 Minute Timeout</p>
//           <p className="text-xs text-[#A8ABB3] font-[300] leading-relaxed">
//             The payment address is only valid for 20 minutes. Please ensure you complete the transfer within this window.
//           </p>
//         </div>
//       </div>

//       {/* Single Transaction */}
//       <div className="flex gap-3 items-start">
//         <div className="p-2 rounded-xl bg-blue-500/20 flex items-center justify-center">
//           <Package size={18} className="text-blue-400" />
//         </div>
//         <div className="flex-1">
//           <p className="text-sm font-medium text-white">Single Transaction</p>
//           <p className="text-xs text-[#A8ABB3] font-[300] leading-relaxed">
//             Send the exact amount in one single
// transaction. Multiple partial payments may result in fund loss.
//           </p>
//         </div>
//       </div>

//       {/* Network Verification */}
//       <div className="flex gap-3 items-start">
//         <div className="p-2 rounded-xl bg-green-500/20 flex items-center justify-center">
//           <ShieldCheck size={18} className="text-green-400" />
//         </div>
//         <div className="flex-1">
//           <p className="text-sm font-medium text-white">Network Verification</p>
//           <p className="text-xs text-[#A8ABB3] font-[300] leading-relaxed">
//             Verification takes approximately 1-5
// minutes depending on network congestion. Funds will appear after 3 confirmations.
//           </p>
//         </div>
//       </div>

//     </div>
//   </div>
// </div>

//         {/* Terms */}
//         <div className="flex items-start gap-2 mb-6">
//           <input
//             type="checkbox"
//             className="mt-1 accent-cyan-500 scale-110"
//           />
//           <p className="text-xs text-gray-400 leading-relaxed">
//             I agree to the{" "}
//             <span className="text-cyan-400 hover:underline cursor-pointer">Terms of Service</span>{" "}
//             and{" "}
//             <span className="text-cyan-400 hover:underline cursor-pointer">Privacy Policy</span>
//           </p>
//         </div>

//         {/* Button */}
//         <button className="w-full py-3  rounded-xl font-semibold text-md tracking-wide
//       bg-[linear-gradient(45deg,_#587FFF_0%,_#09239F_100%)]
//           shadow-md shadow-blue-500/40 hover:brightness-110 transition active:scale-[0.98]">
//          Deposit 
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddFundHero;