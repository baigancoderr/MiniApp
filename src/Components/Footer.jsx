import { Home, Wallet, TrendingUp, Settings, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hovered, setHovered] = useState(null);

  const activeTab = hovered || location.pathname;

  const isActive = (path) => activeTab === path;

  const renderIcon = (Icon, path, label) => {
    const active = isActive(path);

    return (
      <div
        onMouseEnter={() => setHovered(path)}
        onMouseLeave={() => setHovered(null)}
        onClick={() => navigate(path)}
        className="flex-1 flex flex-col items-center justify-end"
      >
        <div
          className={`flex items-center justify-center transition-all duration-300
          ${
            active
              ? "w-12 h-12 -mt-6 rounded-full bg-black text-[#587FFF] shadow-lg scale-110"
              : "w-10 h-10 text-white"
          }`}
        >
          <Icon size={20} />
        </div>

        {/* Label */}
        <span
          className={`text-[10px] m-1 transition-all duration-300 ${
            active ? "opacity-100 text-white" : "opacity-0"
          }`}
        >
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center z-50">
      <div className="w-full max-w-md">
        <div className="relative flex items-center bg-[linear-gradient(45deg,_#587FFF_0%,_#09239F_100%)] border border-gray-600 rounded-t-3xl  px-2">

          {renderIcon(Wallet, "/wallet", "Wallet")}
          {renderIcon(Plus, "/addfund", "Add")}
          {renderIcon(Home, "/", "Home")}
          {renderIcon(TrendingUp, "/invest", "Invest")}
          {renderIcon(Settings, "/settings", "Profile")}

        </div>
      </div>
    </div>
  );
};

export default Footer;