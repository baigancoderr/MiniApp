import { Home, Wallet, Zap, TrendingUp, Settings ,Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const itemClass =
    "flex flex-col items-center text-gray-400 text-xs cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 hover:text-white";

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center z-50">
      <div className="w-full max-w-md px-3 pb-3">
        <div
          className="flex justify-between items-center px-4 py-2 rounded-2xl
        bg-gradient-to-r from-[#0f0f1a] via-[#1a1a2e] to-[#0f0f1a]
        border border-white/10 backdrop-blur-xl
        shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
        >
          {/* Scores */}
          {/* <div onClick={() => navigate("/")} className={itemClass}>
            <Home size={20} className="transition-transform duration-300 group-hover:rotate-6" />
            <span>Scores</span>
          </div> */}

          {/* Wallet */}
          <div onClick={() => navigate("/wallet")} className={itemClass}>
            <Wallet size={16} />
            <span className="text-[10px]">Wallet</span>
          </div>

          <div onClick={() => navigate("/addfund")} className={itemClass}>
  <Plus size={16} />
  <span className="text-[10px]">Add Fund</span>
</div>

          {/* Center Button */}
       <div
  className="relative -mt-8 cursor-pointer group"
  onClick={() => navigate("/")}
>
  {/* Glow ring */}
  {/* <div className="absolute inset-0 rounded-xl blur-md opacity-60 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:opacity-100 transition"></div> */}

  {/* Button */}
  <div
    className="relative w-10 h-10 flex items-center justify-center rounded-xl
    bg-gradient-to-r from-blue-500 to-cyan-400
    transition-all duration-300
    group-hover:scale-110 
    group-hover:-translate-y-1
    group-hover:rotate-6
    group-hover:shadow-[0_10px_25px_rgba(0,114,255,0.5)]"
  >
    <Home size={20} className="text-white group-hover:drop-shadow-lg transition" />
  </div>

  <p className="text-white text-[12px] text-center mt-1 transition">
    Home
  </p>
</div>

          {/* Upgrades */}
          <div onClick={() => navigate("/upgrade")} className={itemClass}>
            <TrendingUp size={16} />
            <span className="text-[10px]">Invest Now</span>
          </div>

          {/* Settings */}
          <div onClick={() => navigate("/settings")} className={itemClass}>
            <Settings size={16} />
            <span className="text-[10px]">Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;