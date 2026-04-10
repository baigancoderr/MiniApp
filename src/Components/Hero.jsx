import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import api from "../api/axios";
import DashboardSkeletonPage from "../Layout/Skeleton";

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

const HomeDashboard = () => {
  const [activeFilter, setActiveFilter] = useState("1D");
  const navigate = useNavigate();

  // Icon Mapping
  const getIcon = (title) => {
    switch (title?.toUpperCase()) {
      case "LIVE PRICE": return <TrendingUp size={18} className="text-blue-400" />;
      case "TOTAL DEPOSIT": return <DollarSign size={18} className="text-emerald-400" />;
      case "WALLET BALANCE": return <Wallet size={18} className="text-amber-400" />;
      case "TOTAL EARNINGS": return <Coins size={18} className="text-purple-400" />;
      case "ACTIVE PACKAGE": return <BarChart3 size={18} className="text-cyan-400" />;
      case "TEAM": return <Users size={18} className="text-pink-400" />;
      default: return <TrendingUp size={18} />;
    }
  };

  // Fetch Dashboard Data
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await api.get("/user/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });

  // Share Handler
  const handleShare = () => {
    const referralLink = data?.dashboard?.referralLink;
    if (!referralLink) {
      toast.error("Referral link not available");
      return;
    }

    const text = "Join Cipera and start earning daily! 🚀";

    if (window.Telegram?.WebApp) {
      const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`;
      window.Telegram.WebApp.openTelegramLink(telegramShareUrl);
    } else if (navigator.share) {
      navigator.share({ title: "Join Cipera", text, url: referralLink });
    } else {
      window.open(
        `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`,
        "_blank"
      );
    }
  };

  // Copy Handler
  const handleCopy = async () => {
    const referralLink = data?.dashboard?.referralLink;
    if (!referralLink) {
      toast.error("No referral link available");
      return;
    }

    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success("Referral link copied successfully! 🚀");
    } catch (err) {
      toast.error("Failed to copy referral link");
    }
  };

  // Chart Configuration
  const chartDataset = {
    "1H": [2, 5, 3, 6, 4, 7, 5, 6],
    "1D": [20, 40, 30, 60, 50, 70, 55],
    "1W": [100, 200, 150, 300, 250, 400, 350],
    "1M": [500, 700, 600, 900, 800, 1100, 1000],
    "1Y": [2000, 3000, 2500, 4000, 3500, 5000, 4500],
  };

  const labelsMap = {
    "1H": ["1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM"],
    "1D": ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM", "12AM"],
    "1W": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    "1M": ["W1", "W2", "W3", "W4"],
    "1Y": ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#888" }, grid: { display: false } },
      y: { ticks: { color: "#888" }, grid: { color: "#1f1f2e" } },
    },
  };

  const chartData = {
    labels: labelsMap[activeFilter] || labelsMap["1D"],
    datasets: [
      {
        data: chartDataset[activeFilter] || chartDataset["1D"],
        borderColor: "#587FFF",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointBackgroundColor: "#fff",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 250);
          gradient.addColorStop(0, "rgba(88,127,255,0.5)");
          gradient.addColorStop(1, "rgba(88,127,255,0)");
          return gradient;
        },
      },
    ],
  };

  // Loading State
  if (isLoading) {
    return <DashboardSkeletonPage />;
  }

  // Error State
  if (error || !data?.success) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white px-4">
        <div className="text-center">
          <p className="text-red-400 mb-4">Failed to load dashboard</p>
          <button
            onClick={() => refetch()}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-full text-sm transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { user, dashboard } = data;
  const stats = dashboard?.stats || [];
  const referralLink = dashboard?.referralLink || "";

  return (
    <motion.div
      className="min-h-screen text-white px-3 py-6 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-md mx-auto space-y-6">

        {/* HEADER */}
        <motion.div
          className="flex items-center justify-between bg-[#00000033] backdrop-blur-[20px] border border-[#444385] rounded-2xl px-4 py-3"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div>
            <p className="text-xs text-gray-400">User ID</p>
            <h2 className="text-lg font-semibold bg-gradient-to-r from-white to-[#587FFF] bg-clip-text text-transparent">
              {user?.userId || "N/A"}
            </h2>
          </div>

          <div
            onClick={() => navigate("/settings")}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#587FFF] to-[#09239F] shadow-lg shadow-blue-500/20 cursor-pointer active:scale-95 transition-all"
          >
            <User size={18} />
          </div>
        </motion.div>

        {/* STATS CARDS */}
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {stats.map((item, i) => (
            <motion.div
              key={i}
              className="group rounded-2xl border-2 border-[#444385] overflow-hidden hover:scale-[1.02] transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-[#00000033] p-4 backdrop-blur-[20px] transition-all duration-300 group-hover:bg-gradient-to-b group-hover:from-[#020204] group-hover:to-[#2C6096]">
                <div className="flex justify-between items-start">
                  <p className="text-gray-400 text-xs">{item.title}</p>
                  <div>{getIcon(item.title)}</div>
                </div>
                <p className="text-white text-lg font-semibold mt-2 tracking-tight">
                  {item.value}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CHART SECTION */}
        <motion.div
          className="rounded-2xl border-2 border-[#444385] overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-[#00000033] p-4 backdrop-blur-[20px]">
            <p className="text-gray-300 text-sm mb-4">Investment Overview</p>
            
            <div className="h-64">
              <Line data={chartData} options={chartOptions} />
            </div>

            <div className="flex justify-between mt-6 gap-1">
              {["1H", "1D", "1W", "1M", "1Y"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveFilter(item)}
                  className={`flex-1 text-xs py-2 rounded-full transition-all ${
                    activeFilter === item
                      ? "bg-blue-500/20 text-blue-400 font-medium"
                      : "text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* REFERRAL LINK */}
        <motion.div
          className="rounded-2xl border-2 border-[#444385] overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-[#00000033] p-4 backdrop-blur-[20px]">
            <p className="text-sm text-gray-300 mb-2">Referral Link</p>

            <div className="bg-black border border-[#81ECFF]/70 rounded-lg p-3 text-xs mb-4 break-all font-mono text-gray-300">
              {referralLink || "Referral link not generated yet"}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                disabled={!referralLink}
                className="flex-1 bg-gradient-to-r from-[#587FFF] to-[#09239F] hover:brightness-110 disabled:opacity-60 text-white text-sm py-3 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Copy size={16} />
                Copy
              </button>

              <button
                onClick={handleShare}
                disabled={!referralLink}
                className="flex-1 bg-gradient-to-r from-[#587FFF] to-[#09239F] hover:brightness-110 disabled:opacity-60 text-white text-sm py-3 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <Share2 size={16} />
                Share
              </button>
            </div>
          </div>
        </motion.div>

        {/* RECENT BUY TABLE */}
        <motion.div
          className="rounded-2xl border-2 border-[#444385] overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-[#00000033] p-4 backdrop-blur-[20px]">
            <p className="text-sm text-gray-300 mb-3">Recent Transactions</p>

            <div className="overflow-x-auto">
              <table className="min-w-[500px] w-full text-xs">
                <thead>
                  <tr className="text-gray-400 border-b border-[#333] text-left">
                    <th className="px-3 py-3 w-[60px]">S.No</th>
                    <th className="py-3">ID</th>
                    <th className="py-3">Amount</th>
                    <th className="py-3">Date</th>
                    <th className="text-right py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#222] hover:bg-[#ffffff05] transition">
                    <td className="px-3 py-3 text-blue-400 font-medium">1</td>
                    <td>#TXN001</td>
                    <td>$100</td>
                    <td>12 Mar 2026</td>
                    <td className="text-right">
                      <span className="text-green-400 text-xs px-3 py-1 bg-green-500/10 rounded-full">Success</span>
                    </td>
                  </tr>
                  <tr className="border-b border-[#222] hover:bg-[#ffffff05] transition">
                    <td className="px-3 py-3 text-blue-400 font-medium">2</td>
                    <td>#TXN002</td>
                    <td>$250</td>
                    <td>13 Mar 2026</td>
                    <td className="text-right">
                      <span className="text-green-400 text-xs px-3 py-1 bg-green-500/10 rounded-full">Success</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomeDashboard;