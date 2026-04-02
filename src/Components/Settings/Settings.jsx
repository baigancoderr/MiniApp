'use client';

import {
  User, Users, TrendingUp, Wallet,
  Plus, Clock, Download, ChevronRight
} from "lucide-react";
import { FaQuestion } from "react-icons/fa";
import { MdOutlinePolicy } from "react-icons/md";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import settingImg from "../../assets/setting/user-img.jpeg";
import { FaGavel } from "react-icons/fa";
const SettingsComponent = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <User size={18} />,
      title: "Account",
      subtitle: "Security, change number",
      action: () => navigate("/settings/profile"),
    },
    {
      icon: <Users size={18} />,
      title: "My Referrals",
      subtitle: "Invite & manage referrals",
      action: () => navigate("/settings/referral"),
    },
    {
      icon: <TrendingUp size={18} />,
      title: "Referral Earnings",
      subtitle: "Track your earnings",
      action: () => navigate("/settings/referral-earning-history"),
    },
    {
      icon: <Wallet size={18} />,
      title: "Wallet Breakdown",
      subtitle: "Balance & details",
      action: () => navigate("/settings/wallet-breakdown"),
    },
    {
      icon: <Plus size={18} />,
      title: "Add Funds",
      subtitle: "Deposit crypto",
      action: () => navigate("/addfund"),
    },
    {
      icon: <Clock size={18} />,
      title: "Deposit History",
      subtitle: "All transactions",
      action: () => navigate("/settings/deposit-history"),
    },
    {
      icon: <Wallet size={18} />,
      title: "Withdraw USDT",
      subtitle: "Transfer funds",
      action: () => navigate("/settings/withdraw-usdt"),
    },
    {
      icon: <FaQuestion size={18} />,
      title: "FAQs",
      subtitle: "Common questions",
      action: () => navigate("/settings/faqs"),
    },
    {
      icon: <FaGavel size={18} />,
      title: "Terms & Conditions",
      subtitle: "Legal info",
      action: () => navigate("/settings/term-condition"),
    },
    {
      icon: <MdOutlinePolicy size={18} />,
      title: "Privacy Policy",
      subtitle: "Your data safety",
      action: () => navigate("/settings/privacy"),
    },
  ];

  return (
    <div className="min-h-screen  text-white pb-24">
  <div className="max-w-md mx-auto w-full">

      {/* 🔥 HEADER */}
      <div className="relative h-48 bg-gradient-to-b from-[#587FFF] to-black rounded-b-[50px] flex flex-col items-center justify-end pb-6">

        {/* <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 text-white text-lg"
        >
          ←
        </button>

        <p className="absolute top-4 text-sm text-gray-200">
          Settings
        </p> */}

        {/* Profile */}
        <div className="flex flex-col items-center">
          <img
            src={settingImg}
            alt="profile"
            className="w-20 h-20 rounded-full border-2 border-white shadow-lg"
          />
          <h2 className="mt-2 font-semibold text-lg">
            Mark Steven
          </h2>
          <p className="text-xs text-gray-300">
            markst@co.in
          </p>
        </div>
      </div>

      {/* 🔥 MENU LIST */}
      <div className="mt-4 space-y-1 px-3">

        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            whileTap={{ scale: 0.97 }}
            onClick={item.action}
            className="flex items-center justify-between py-3 border-b border-white/10 cursor-pointer"
          >
            <div className="flex items-center gap-3">

              <div className="p-2 bg-white/5 rounded-lg">
                {item.icon}
              </div>

              <div>
                <p className="text-sm">{item.title}</p>
                <p className="text-xs text-gray-400">
                  {item.subtitle}
                </p>
              </div>
            </div>

            <ChevronRight size={18} className="text-gray-500" />
          </motion.div>
        ))}

      </div>
    </div>
    </div>
  );
};

export default SettingsComponent;