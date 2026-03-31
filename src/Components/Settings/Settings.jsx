'use client';

import {
  User, Users, TrendingUp, Wallet,
  Plus, Clock, Download
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SettingsComponent = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <User size={20} />, label: "Profile" , action: () => navigate("/settings/Profile"),},
    { icon: <Users size={20} />, label: "My Referrals" , action: () => navigate("/settings/Referral"),},
    { icon: <TrendingUp size={20} />, label: "Referral Earnings History" },
    { icon: <Wallet size={20} />, label: "Wallet Breakdown" , action: () => navigate("/settings/WalletBreakdown"),},
    { icon: <Plus size={20} />, label: "Add Funds" },
    { icon: <Clock size={20} />, label: "Deposit History" },
    { icon: <Download size={20} />, label: "Withdraw USDT" },
    { icon: <Download size={20} />, label: "FAQ" ,action: () => navigate("/settings/FAQ"),},

    // 🔥 ROUTES
    {
      icon: <Download size={20} />,
      label: "Term Condition",
      action: () => navigate("/settings/TermCondition"),
    },
    {
      icon: <Download size={20} />,
      label: "Privacy Policy",
      action: () => navigate("/settings/privacy"),
    },
  ];

  return (
    <div className="pb-24  min-h-screen">
      <div className="w-full max-w-md mx-auto px-2 pt-5">

        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-4 px-2"
        >
          <div className="w-8 h-8 rounded-2xl flex items-center justify-center text-lg shadow-lg shadow-blue-500/30">
            ⚙️
          </div>
          <h1 className="text-xl font-semibold text-white">
            Settings
          </h1>
        </motion.div>

        <div className="space-y-2 px-1">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
             onClick={() => item.action && item.action()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-between px-3 py-2 rounded-md
                bg-white/5 backdrop-blur-xl border border-white/10">

                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-xl text-blue-400">
                    {item.icon}
                  </div>

                  <span className="text-[14px] text-gray-200">
                    {item.label}
                  </span>
                </div>

                <div className="text-gray-500 text-xl">→</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SettingsComponent;