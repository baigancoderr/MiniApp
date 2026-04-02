import { CheckCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";
import {
  DollarSign,
  Wallet,
  TrendingUp,
  Users,
  Coins,
  BarChart3,
  Copy,
  Share2,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler
);

const UpgradeHero = () => {
  
    const navigate = useNavigate();

const [amount, setAmount] = useState("25");

const investment = Number(amount) || 0;
const bonus = investment * 0.1; // 10% bonus example
const totalTokens = investment + bonus;
const dailyClaim = totalTokens / 700;

const startDate = new Date().toLocaleDateString();

 
  const userId = "CIP579317981";
   const [activeFilter, setActiveFilter] = useState("1D");

  // 🔷 STATS




 

  

 

  const transactions = [
    { id: "#TXN001", amount: "$100", date: "12 Mar", status: "Success" },
    { id: "#TXN002", amount: "$250", date: "13 Mar", status: "Success" },
  ];


  const handleQuickAmount = (value) => {
  setAmount(value);
};
 

  return (
    <div className="w-full flex justify-center px-2 py-3">
      <div className="w-full max-w-md space-y-6">
           <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-lg bg-[#00000033] border border-[#444385]"
            >
              <ArrowLeft size={18} />
            </button> 
            <h2 className="text-lg font-semibold">Investment </h2>
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

        <div className="rounded-xl p-3 
          
          border border-white/10 shadow-xl bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.5)_1.24%,_rgba(0,7,64,0.245)_20.92%)]">

          <h2 className="text-white text-lg font-semibold mb-3">Investment Plans</h2>

          {/* 2x2 Grid Cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="group rounded-2xl border-2 border-[#444385] hover:border-transparent overflow-hidden">
              <div className="bg-[#00000033] p-3 h-full backdrop-blur-[20px] transition-all duration-300 group-hover:bg-[linear-gradient(180deg,_#020204_0%,_#2C6096_100%)] group-hover:border-l-[5px] group-hover:border-l-[#587FFF]">
                <p className="text-gray-400 text-sm">Total Investment</p>
                <p className="text-emerald-400 text-md font-semibold mt-1">10</p>
              </div>
            </div>

            <div className="group rounded-2xl border-2 border-[#444385] hover:border-transparent overflow-hidden">
              <div className="bg-[#00000033] p-3 h-full backdrop-blur-[20px] transition-all duration-300 group-hover:bg-[linear-gradient(180deg,_#020204_0%,_#2C6096_100%)] group-hover:border-l-[5px] group-hover:border-l-[#587FFF]">
                <p className="text-gray-400 text-sm">Total Tokens</p>
                <p className="text-emerald-400 text-md font-semibold mt-1">10</p>
              </div>
            </div>

            <div className="group rounded-2xl border-2 border-[#444385] hover:border-transparent overflow-hidden">
              <div className="bg-[#00000033] p-3 h-full backdrop-blur-[20px] transition-all duration-300 group-hover:bg-[linear-gradient(180deg,_#020204_0%,_#2C6096_100%)] group-hover:border-l-[5px] group-hover:border-l-[#587FFF]">
                <p className="text-gray-400 text-sm">Total Supply </p>
                <p className="text-emerald-400 text-md font-semibold mt-1">10</p>
              </div>
            </div>

            <div className="group rounded-2xl border-2 border-[#444385] hover:border-transparent overflow-hidden">
              <div className="bg-[#00000033] p-3 h-full backdrop-blur-[20px] transition-all duration-300 group-hover:bg-[linear-gradient(180deg,_#020204_0%,_#2C6096_100%)] group-hover:border-l-[5px] group-hover:border-l-[#587FFF]">
                <p className="text-gray-400 text-sm">Burned Supply</p>
                <p className="text-emerald-400 text-md font-semibold mt-1">10</p>
              </div>
            </div>
          </div>


           

          {/* Deposit Input */}
         <div className="my-6">
      <label className="text-gray-400 text-sm font-medium mb-2 block">
        Amount For Investment (CPR)
      </label>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount to Investment"
        className="w-full bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.5)_1.24%,_rgba(0,7,64,0.245)_20.92%)] 
        border border-white/10 focus:border-cyan-400 rounded-md px-6 py-2 
        text-black text-md placeholder-gray-500 focus:outline-none shadow-inner transition-all"
      />

      <p className="text-xs text-gray-500 mt-3 pl-2">
        Minimum deposit: 25 CPR
      </p>
    </div>
    <div className="grid grid-cols-4 gap-3 mb-5">
  {[25, 50, 100, 200].map((amt) => (
    <button
      key={amt}
      onClick={() => handleQuickAmount(amt)}
      className="rounded-xl border-2 border-[#444385] overflow-hidden group"
    >
      <div
        className={`py-2 text-sm transition-all
        ${amount == amt 
          ? "bg-[linear-gradient(180deg,#020204,#2C6096)] text-white"
          : "bg-[#00000033] text-gray-400 group-hover:bg-[linear-gradient(180deg,#020204,#2C6096)]"
        }`}
      >
        {amt}
      </div>
    </button>
  ))}
</div>

    {/* Investment Box */}
    
      <div className="bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.5)_1.24%,_rgba(0,7,64,0.245)_20.92%)] rounded-xl border mb-6 shadow-1xl">
        <div className="p-5 border border-blue-400/20 rounded-xl">

          <p className="text-white font-semibold text-md mb-4">
            📊 Investment Summary
          </p>

          <div className="space-y-3 text-sm">

            <div className="flex justify-between">
              <span className="text-gray-400">Invested Amount</span>
              <span className="text-white font-semibold">
                {investment} CPR
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Total Tokens (bonus)</span>
              <span className="text-emerald-400 font-semibold">
                {totalTokens.toFixed(2)} CPR
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Lock Period</span>
              <span className="text-white">700 Days</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Start Date</span>
              <span className="text-white">{startDate}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Daily Claim Value</span>
              <span className="text-cyan-400 font-semibold">
                {dailyClaim.toFixed(4)} CPR
              </span>
            </div>

          </div>
        </div>
      </div>
    


          {/* Submit Button */}
          <button 
            className="w-full py-2 bg-[linear-gradient(45deg,_#587FFF_0%,_#09239F_100%)]
                     text-white text-md font-semibold rounded-xl shadow-md 
                     hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3">
            Invest 
            {/* <ArrowRight size={20} /> */}
          </button>

         
        </div>
      </div>
    </div>
  );
};

export default UpgradeHero;