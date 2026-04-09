import React, { useState, useEffect } from "react";
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

import api from "../api/axios";   // ← Your axios instance

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Filler
);

const HomeDashboard = () => {
  const navigate = useNavigate();

  // State
  const [activeFilter, setActiveFilter] = useState("1D");
  const [tgUser, setTgUser] = useState(null);
  const [apiUser, setApiUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Stats (will be updated from API later)
  const [stats, setStats] = useState([
    { title: "LIVE PRICE", value: "$0.12", icon: <TrendingUp size={18} /> },
    { title: "TOTAL DEPOSIT", value: "$1200", icon: <DollarSign size={18} /> },
    { title: "WALLET BALANCE", value: "$850", icon: <Wallet size={18} /> },
    { title: "TOTAL CLAIMED", value: "500 CIP", icon: <Coins size={18} /> },
    { title: "MATURED TOKEN", value: "300 CIP", icon: <BarChart3 size={18} /> },
    { title: "TEAM", value: "25 Users", icon: <Users size={18} /> },
  ]);

  // Telegram + API Integration (Same as Profile)
  useEffect(() => {
    const initTelegram = async () => {
      try {
        const tg = window.Telegram?.WebApp;
        if (!tg) {
          console.log("Not inside Telegram WebApp");
          setLoading(false);
          return;
        }

        tg.ready();
        const user = tg.initDataUnsafe?.user;

        if (!user) {
          setLoading(false);
          return;
        }

        setTgUser(user);

        // Handle referral
        const urlParams = new URLSearchParams(window.location.search);
        const refFromUrl = urlParams.get("ref");
        const refFromTG = tg.initDataUnsafe?.start_param;
        const refFromStorage = localStorage.getItem("referral");
        const referralCode = refFromTG || refFromUrl || refFromStorage;

        if (referralCode) {
          localStorage.setItem("referral", referralCode);
        }

        // API Login
        const res = await api.post("/user/telegram-login", {
          telegramId: user.id,
          name: `${user.first_name} ${user.last_name || ""}`,
          username: user.username || "",
          referralCode: referralCode || null,
        });

        const data = res.data;

        if (data.success) {
          setApiUser(data.user);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user.userId || data.user._id);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          toast.error(data.message || "Login failed");
        }
      } catch (error) {
        console.error("Telegram Login Error:", error);
        toast.error("Failed to connect with server");
      } finally {
        setLoading(false);
      }
    };

    initTelegram();
  }, []);

  // Dynamic Referral Link (Same as your Profile)
  const referralLink = `https://t.me/cipera_bot?startapp=${apiUser?.referralCode || "loading"}`;

  // Share & Copy Functions (Unified)
  const handleShare = () => {
    const text = "Join and earn 🚀";
    const url = referralLink;

    if (window.Telegram?.WebApp) {
      const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
      window.Telegram.WebApp.openTelegramLink(telegramShareUrl);
    } else if (navigator.share) {
      navigator.share({ title: "Join Now 🚀", text, url });
    } else {
      window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      toast.success("Referral link copied 🚀");
    } catch (err) {
      toast.error("Failed to copy ❌");
    }
  };

  // Chart Data
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
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#888" }, grid: { display: false } },
      y: { ticks: { color: "#888" }, grid: { color: "#1f1f2e" } },
    },
  };

  const chartData = {
    labels: labelsMap[activeFilter],
    datasets: [
      {
        data: chartDataset[activeFilter],
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

  // Transactions (You can later fetch from API)
  const transactions = [
    { id: "#TXN001", amount: "$100", date: "12 Mar", status: "Success" },
    { id: "#TXN002", amount: "$250", date: "13 Mar", status: "Success" },
  ];

  return (
    <div className="min-h-screen text-white px-3 py-3 ">
      <div className="max-w-md mx-auto space-y-5">

        {/* HEADER */}
        <div className="flex items-center justify-between   border border-[#444385] rounded-2xl px-4 py-3">
          <div>
            <p className="text-xs text-gray-400">User ID</p>
            <h2 className="text-lg font-semibold bg-gradient-to-r from-white to-[#587FFF] bg-clip-text text-transparent">
              {loading ? "Loading..." : apiUser?.userId || "CIP579317981"}
            </h2>
          </div>

          <div
            onClick={() => navigate("/settings")}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#587FFF] to-[#09239F] shadow-lg shadow-blue-500/20 cursor-pointer active:scale-95 transition"
          >
            <User size={18} />
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl border-2 border-[#444385] overflow-hidden"
            >
              <div className="bg-[#00000033] p-3 backdrop-blur-[20px] transition-all duration-300 group-hover:bg-[linear-gradient(180deg,#020204,#2C6096)] group-hover:border-l-[5px] group-hover:border-l-[#587FFF]">
                <div className="flex justify-between">
                  <p className="text-gray-400 text-xs">{item.title}</p>
                  <div className="text-blue-400">{item.icon}</div>
                </div>
                <p className="text-white text-md font-semibold mt-1">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CHART SECTION */}
        <div className="rounded-2xl border-2 border-[#444385] overflow-hidden">
          <div className="bg-[#00000033] p-4 backdrop-blur-[20px]">
            <p className="text-gray-300 text-sm mb-3">Investment Overview</p>
            <Line data={chartData} options={chartOptions} />

            <div className="flex justify-between mt-4">
              {["1H", "1D", "1W", "1M", "1Y"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveFilter(item)}
                  className={`text-xs px-3 py-1 rounded-full transition ${
                    activeFilter === item
                      ? "bg-blue-500/20 text-blue-400"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* REFERRAL SECTION */}
        <div className="rounded-2xl border-2 border-[#444385] overflow-hidden">
          <div className="bg-[#00000033] p-4 backdrop-blur-[20px]">
            <p className="text-sm text-gray-300 mb-2">Referral Link</p>

            <div className="bg-black border border-[#81ECFF] rounded-lg p-3 text-xs mb-3 break-all">
              {referralLink}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 bg-[linear-gradient(45deg,#587FFF,#09239F)] hover:bg-[linear-gradient(45deg,#6C8CFF,#0B2ED1)] text-white py-3 rounded-full flex items-center justify-center gap-2 transition-all"
              >
                <Copy size={16} />
                Copy
              </button>

              <button
                onClick={handleShare}
                className="flex-1 bg-[linear-gradient(45deg,#587FFF,#09239F)] hover:bg-[linear-gradient(45deg,#6C8CFF,#0B2ED1)] text-white py-3 rounded-full flex items-center justify-center gap-2 transition-all"
              >
                <Share2 size={16} />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* RECENT TRANSACTIONS */}
        <div className="rounded-2xl border-2 border-[#444385] overflow-hidden">
          <div className="bg-[#00000033] p-4 backdrop-blur-[20px]">
            <p className="text-sm text-gray-300 mb-3">Recent Buy</p>

            <div className="overflow-x-auto">
              <table className="min-w-[500px] w-full text-xs">
                <thead>
                  <tr className="text-gray-400 border-b border-[#333] text-left">
                    <th className="px-3 py-3 w-[60px]">S.No</th>
                    <th className="py-2">ID</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th className="text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#222] hover:bg-[#ffffff05] transition"
                    >
                      <td className="px-3 py-3 text-blue-400 font-medium">{i + 1}</td>
                      <td className="py-2">{tx.id}</td>
                      <td>{tx.amount}</td>
                      <td>{tx.date}</td>
                      <td className="text-right">
                        <span className="text-green-400 text-xs">{tx.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeDashboard;