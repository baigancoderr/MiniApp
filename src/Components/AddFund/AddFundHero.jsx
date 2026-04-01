import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Settings, Copy, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
const AddFundHero = () => {
  const navigate = useNavigate();
  const coins = [
    // { name: "BNB", icon: "https://cryptologos.cc/logos/bnb-bnb-logo.png" },
    { name: "USDT", icon: "https://cryptologos.cc/logos/tether-usdt-logo.png" },
    // { name: "SOL", icon: "https://cryptologos.cc/logos/solana-sol-logo.png" },
    // { name: "BTC", icon: "https://cryptologos.cc/logos/bitcoin-btc-logo.png" },
    // { name: "ETH", icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png" },
  ];

  const [selected, setSelected] = useState(coins[0]);
  const [amount, setAmount] = useState(""); // Added state for amount
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle quick amount selection
  const handleQuickAmount = (value) => {
    const numericValue = value.replace("$", "");
    setAmount(numericValue);
  };

  return (
    <div className="w-full flex justify-center text-white font-poppins">
      <div className="w-full max-w-md px-4 py-4 relative">
        {/* Header */}
        {/* <div className="flex items-center gap-3 mb-6">
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold">Add Funds</h1>
        </div> */}

         <div className="flex bg-[#282936] items-center justify-between mb-5 px-3 py-2">
                    <div className="flex items-center gap-3">
                        <button 
  onClick={() => navigate("/settings")} 
  className="p-1.5 rounded-md text-[#FFFFFF]"
>
  <ArrowLeft size={20} />
</button>
                        <h1 className="text-lg font-[Manrope] font-bold">Add Fund</h1>
                    </div>
                    <Settings size={20} className="text-white" />
                </div>

        {/* Amount Input */}
        <div className="mb-5">
          <p className="text-sm text-gray-400 mb-2">Enter Amount</p>

          <div className="flex items-center justify-between bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.5)_1.24%,_rgba(0,7,64,0.245)_20.92%)] border border-cyan-400/30 rounded-xl px-4 py-2 relative">
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent outline-none text-md font-medium w-full text-gray-200 placeholder-gray-500"
            />

            {/* Currency Selector */}
            <div
              ref={buttonRef}
              onClick={() => setOpen(!open)}
              className="bg-black px-4 py-1 rounded-md flex items-center gap-2 cursor-pointer hover:bg-zinc-900 transition border border-white/10"
            >
              <img
                src={selected.icon}
                alt={selected.name}
                className="w-6 h-6 rounded-full"
                onError={(e) => (e.target.src = "https://via.placeholder.com/24?text=?")}
              />
              <span className="text-sm font-semibold text-white">{selected.name}</span>
              <span className="text-xs text-gray-400">▼</span>
            </div>

            {/* Dropdown */}
            {open && (
              <div
                ref={dropdownRef}
                className="absolute top-full right-3 mt-2 w-28 bg-[#000] border border-white rounded-md shadow-2xl z-50 overflow-hidden py-1"
              >
                {coins.map((coin) => (
                  <div
                    key={coin.name}
                    onClick={() => {
                      setSelected(coin);
                      setOpen(false);
                    }}
                    className={`px-3 py-1 flex items-center gap-1 hover:bg-white/10 cursor-pointer transition ${
                      selected.name === coin.name ? "bg-white/10" : ""
                    }`}
                  >
                    {/* <img
                      src={coin.icon}
                      alt={coin.name}
                      className="w-6 h-6 rounded-full"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/24?text=?")}
                    /> */}
                    <span className="text-white font-medium">{coin.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="text-xs text-cyan-400 mt-2 pl-1">Minimum: $2 USDT</p>
        </div>

        {/* Quick Amount Buttons - Now functional */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {["$25", "$50", "$100", "$200"].map((amt) => (
            <button
              key={amt}
              onClick={() => handleQuickAmount(amt)}
              className="py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition active:scale-95"
            >
              {amt}
            </button>
          ))}
        </div>

        {/* Payment Instructions - Icons on first line */}
        <div className="mb-6">
          <p className="text-xs tracking-widest text-gray-400 mb-4">
            PAYMENT INSTRUCTIONS
          </p>

          <div className="rounded-xl p-[0.7px] bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.5)_1.24%,_rgba(0,7,64,0.245)_20.92%)] border border-white shadow-xl overflow-hidden">
            <div className="rounded-2xl p-5 bg-white/5 backdrop-blur-xl border border-white/10 space-y-5">
              
              {/* First Item - Icon + Text in same row */}
              <div className="flex gap-3">
                <div className="p-2 rounded-xl bg-purple-500/20 text-xl flex-shrink-0">⏱️</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">20 Minute Timeout</p>
                  <p className="text-xs text-gray-400">Address valid only for 20 minutes.</p>
                </div>
              </div>

              {/* Second Item */}
              <div className="flex gap-3">
                <div className="p-2 rounded-xl bg-blue-500/20 text-xl flex-shrink-0">📦</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Single Transaction</p>
                  <p className="text-xs text-gray-400">Send exact amount in one transaction.</p>
                </div>
              </div>

              {/* Third Item */}
              <div className="flex gap-3">
                <div className="p-2 rounded-xl bg-green-500/20 text-xl flex-shrink-0">🛡️</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Network Verification</p>
                  <p className="text-xs text-gray-400">Funds appear after confirmations.</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2 mb-6">
          <input
            type="checkbox"
            className="mt-1 accent-cyan-500 scale-110"
          />
          <p className="text-xs text-gray-400 leading-relaxed">
            I agree to the{" "}
            <span className="text-cyan-400 hover:underline cursor-pointer">Terms of Service</span>{" "}
            and{" "}
            <span className="text-cyan-400 hover:underline cursor-pointer">Privacy Policy</span>
          </p>
        </div>

        {/* Button */}
        <button className="w-full py-3  rounded-xl font-semibold text-md tracking-wide
        bg-[linear-gradient(0deg,_#587FFF_0%,_#09239F_70%)] 
          shadow-xl shadow-blue-500/40 hover:brightness-110 transition active:scale-[0.98]">
         Submit
        </button>
      </div>
    </div>
  );
};

export default AddFundHero;