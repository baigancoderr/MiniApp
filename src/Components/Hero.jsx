import React, { useState } from "react";
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
  const referralLink = "https://yourapp.com/ref/CPR1234567";
  const userId = "CIP579317981";

  const navigate = useNavigate();
 const handleShare = () => {
  const text = "Join and earn 🚀";
  const url = referralLink;

  if (window.Telegram?.WebApp) {
    const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(text)}`;

    window.Telegram.WebApp.openTelegramLink(telegramShareUrl);
  } else if (navigator.share) {
    navigator.share({
      title: "Join Now 🚀",
      text,
      url,
    });
  } else {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
      "_blank"
    );
  }
};

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        // ✅ Modern browsers
        await navigator.clipboard.writeText(referralLink);
      } else {
        // ✅ Fallback for mobile / insecure
        const textArea = document.createElement("textarea");
        textArea.value = referralLink;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      toast.success("Copied to clipboard 🚀");
    } catch (err) {
      toast.error("Copy failed ❌");
    }
  };


  // 🔷 STATS
  const stats = [
    { title: "LIVE PRICE", value: "$0.12", icon: <TrendingUp size={18} /> },
    { title: "TOTAL DEPOSIT", value: "$1200", icon: <DollarSign size={18} /> },
    { title: "WALLET BALANCE", value: "$850", icon: <Wallet size={18} /> },
    { title: "TOTAL CLAIMED", value: "500 CIP", icon: <Coins size={18} /> },
    { title: "MATURED TOKEN", value: "300 CIP", icon: <BarChart3 size={18} /> },
    { title: "TEAM", value: "25 Users", icon: <Users size={18} /> },
  ];

  const chartDataset = {
    "1H": [2, 5, 3, 6, 4, 7, 5, 6],
    "1D": [20, 40, 30, 60, 50, 70, 55],
    "1W": [100, 200, 150, 300, 250, 400, 350],
    "1M": [500, 700, 600, 900, 800, 1100, 1000],
    "1Y": [2000, 3000, 2500, 4000, 3500, 5000, 4500],
  };

  const labelsMap = {
    "1H": ["1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM"],   // hourly
    "1D": ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM", "12AM"],      // full day
    "1W": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],        // weekly
    "1M": ["W1", "W2", "W3", "W4"],                                 // monthly (week-wise)
    "1Y": ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],               // yearly
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: "#888" }, grid: { display: false } },
      y: { ticks: { color: "#888" }, grid: { color: "#1f1f2e" } },
    },
  };

  const transactions = [
    { id: "#TXN001", amount: "$100", date: "12 Mar", status: "Success" },
    { id: "#TXN002", amount: "$250", date: "13 Mar", status: "Success" },
  ];

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

  return (
    <div className="min-h-screen text-white   px-3 py-3">
      <div className="max-w-md mx-auto space-y-5">

        {/* 🔷 HEADER */}
        <div className="flex items-center justify-between 
bg-[#00000033] backdrop-blur-[20px] 
border border-[#444385] 
rounded-2xl px-4 py-3">

          {/* LEFT SIDE */}
          <div>
            <p className="text-xs text-gray-400">User ID</p>
            <h2 className="text-lg font-semibold 
    bg-gradient-to-r from-[#FFF] to-[#587FFF] 
    bg-clip-text text-transparent">
              {userId}
            </h2>
          </div>

          {/* RIGHT SIDE */}
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

        {/* 🔥 CARDS */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl border-2 border-[#444385] overflow-hidden"
            >
              <div className="bg-[#00000033] p-3 backdrop-blur-[20px] 
              transition-all duration-300
              group-hover:bg-[linear-gradient(180deg,#020204,#2C6096)]
              group-hover:border-l-[5px] group-hover:border-l-[#587FFF]">

                <div className="flex justify-between">
                  <p className="text-gray-400 text-xs">{item.title}</p>
                  <div className="text-blue-400">{item.icon}</div>
                </div>

                <p className="text-white text-md font-semibold mt-1">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 📊 CHART */}
        <div className="rounded-2xl border-2 border-[#444385] overflow-hidden">
          <div className="bg-[#00000033] p-4 backdrop-blur-[20px]
          group-hover:bg-[linear-gradient(180deg,#020204,#2C6096)]">

            <p className="text-gray-300 text-sm mb-3">Investment Overview</p>

            <Line data={chartData} options={chartOptions} />

            <div className="flex justify-between mt-4">
              {["1H", "1D", "1W", "1M", "1Y"].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveFilter(item)}
                  className={`text-xs px-3 py-1 rounded-full ${activeFilter === item
                    ? "bg-blue-500/20 text-blue-400"
                    : "text-gray-400"
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* 🔗 REFERRAL */}
        <div className="rounded-2xl border-2 border-[#444385] overflow-hidden">
          <div className="bg-[#00000033] p-4 backdrop-blur-[20px]">

            <p className="text-sm text-gray-300 mb-2">Referral Link</p>

            <div className="bg-black border border-[#81ECFF] rounded-lg p-2 text-xs mb-3">
              CPR1234567
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 
    bg-[linear-gradient(45deg,#587FFF,#09239F)] 
    hover:bg-[linear-gradient(45deg,#6C8CFF,#0B2ED1)]
    text-white text-sm py-3 rounded-full 
    flex items-center justify-center gap-2 transition-all"
              >
                <Copy size={16} />
                Copy
              </button>

              <button
                onClick={handleShare}
                className="flex-1 
    bg-[linear-gradient(45deg,#587FFF,#09239F)] 
    hover:bg-[linear-gradient(45deg,#6C8CFF,#0B2ED1)]
    text-white text-sm py-3 rounded-full 
    flex items-center justify-center gap-2 transition-all"
              >
                <Share2 size={16} />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* 📄 TABLE */}
        <div className="rounded-2xl border-2 border-[#444385] overflow-hidden">
          <div className="bg-[#00000033] p-4 backdrop-blur-[20px]">

            <p className="text-sm text-gray-300 mb-3">Recent Buy</p>

            {/* 🔥 RESPONSIVE WRAPPER */}
            <div className="overflow-x-auto">

              <table className="min-w-[500px] w-full text-xs">

                {/* HEADER */}
                <thead>
                  <tr className="text-gray-400 border-b border-[#333] text-left">
                    <th className="px-3 py-3 w-[60px]">S.No</th>
                    <th className="py-2">ID</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th className="text-right">Status</th>
                  </tr>
                </thead>

                {/* BODY */}
                <tbody>
                  {transactions.map((tx, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#222] hover:bg-[#ffffff05] transition"
                    >
                      {/* ✅ S.NO (FIXED) */}
                      <td className="px-3 py-3 text-blue-400 font-medium">
                        {i + 1}
                      </td>

                      <td className="py-2">{tx.id}</td>
                      <td>{tx.amount}</td>
                      <td>{tx.date}</td>

                      <td className="text-right">
                        <span className="text-green-400 text-xs">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                  {/* EMPTY STATE */}
                  {transactions.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-gray-400">
                        No Records Found
                      </td>
                    </tr>
                  )}

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


// import React, { useState, Suspense } from "react";
// import {
//   DollarSign,
//   Wallet,
//   TrendingUp,
//   Users,
//   Coins,
//   BarChart3,
//   Copy,
//   Share2,
//   User,
// } from "lucide-react";
// import toast from "react-hot-toast";
// import { motion } from "framer-motion";

// import { useNavigate } from "react-router-dom";
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Filler,
// } from "chart.js";

// ChartJS.register(
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Filler
// );

// // Lazy load the chart component
// const Line = React.lazy(() => import("react-chartjs-2").then(module => ({ default: module.Line })));

// const HomeDashboard = () => {
//   const [activeFilter, setActiveFilter] = useState("1D");
//   const referralLink = "https://yourapp.com/ref/CPR1234567";
//   const userId = "CIP579317981";

//   const navigate = useNavigate();
//  const handleShare = () => {
//   const text = "Join and earn 🚀";
//   const url = referralLink;

//   if (window.Telegram?.WebApp) {
//     const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(
//       url
//     )}&text=${encodeURIComponent(text)}`;

//     window.Telegram.WebApp.openTelegramLink(telegramShareUrl);
//   } else if (navigator.share) {
//     navigator.share({
//       title: "Join Now 🚀",
//       text,
//       url,
//     });
//   } else {
//     window.open(
//       `https://t.me/share/url?url=${encodeURIComponent(
//         url
//       )}&text=${encodeURIComponent(text)}`,
//       "_blank"
//     );
//   }
// };

//   const handleCopy = async () => {
//     try {
//       if (navigator.clipboard && window.isSecureContext) {
//         // ✅ Modern browsers
//         await navigator.clipboard.writeText(referralLink);
//       } else {
//         // ✅ Fallback for mobile / insecure
//         const textArea = document.createElement("textarea");
//         textArea.value = referralLink;
//         textArea.style.position = "fixed";
//         textArea.style.left = "-9999px";
//         document.body.appendChild(textArea);
//         textArea.focus();
//         textArea.select();
//         document.execCommand("copy");
//         document.body.removeChild(textArea);
//       }

//       toast.success("Copied to clipboard 🚀");
//     } catch (err) {
//       toast.error("Copy failed ❌");
//     }
//   };


//   // 🔷 STATS
//   const stats = [
//     { title: "LIVE PRICE", value: "$0.12", icon: <TrendingUp size={18} /> },
//     { title: "TOTAL DEPOSIT", value: "$1200", icon: <DollarSign size={18} /> },
//     { title: "WALLET BALANCE", value: "$850", icon: <Wallet size={18} /> },
//     { title: "TOTAL CLAIMED", value: "500 CIP", icon: <Coins size={18} /> },
//     { title: "MATURED TOKEN", value: "300 CIP", icon: <BarChart3 size={18} /> },
//     { title: "TEAM", value: "25 Users", icon: <Users size={18} /> },
//   ];

//   const chartDataset = {
//     "1H": [2, 5, 3, 6, 4, 7, 5, 6],
//     "1D": [20, 40, 30, 60, 50, 70, 55],
//     "1W": [100, 200, 150, 300, 250, 400, 350],
//     "1M": [500, 700, 600, 900, 800, 1100, 1000],
//     "1Y": [2000, 3000, 2500, 4000, 3500, 5000, 4500],
//   };

//   const labelsMap = {
//     "1H": ["1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM"],   // hourly
//     "1D": ["6AM", "9AM", "12PM", "3PM", "6PM", "9PM", "12AM"],      // full day
//     "1W": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],        // weekly
//     "1M": ["W1", "W2", "W3", "W4"],                                 // monthly (week-wise)
//     "1Y": ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],               // yearly
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: { 
//       legend: { display: false },
//       tooltip: {
//         backgroundColor: 'rgba(0,0,0,0.8)',
//         titleColor: '#fff',
//         bodyColor: '#fff',
//         borderColor: '#587FFF',
//         borderWidth: 1,
//       }
//     },
//     scales: {
//       x: { ticks: { color: "#888" }, grid: { display: false } },
//       y: { ticks: { color: "#888" }, grid: { color: "#1f1f2e" } },
//     },
//   };

//   const transactions = [
//     { id: "#TXN001", amount: "$100", date: "12 Mar", status: "Success" },
//     { id: "#TXN002", amount: "$250", date: "13 Mar", status: "Success" },
//   ];

//   const chartData = {
//     labels: labelsMap[activeFilter],
//     datasets: [
//       {
//         data: chartDataset[activeFilter],
//         borderColor: "#587FFF",
//         tension: 0.4,
//         fill: true,
//         pointRadius: 0,
//         pointHoverRadius: 5,
//         pointBackgroundColor: "#fff",
//         backgroundColor: (context) => {
//           const ctx = context.chart.ctx;
//           const gradient = ctx.createLinearGradient(0, 0, 0, 250);
//           gradient.addColorStop(0, "rgba(88,127,255,0.5)");
//           gradient.addColorStop(1, "rgba(88,127,255,0)");
//           return gradient;
//         },
//       },
//     ],
//   };

//   return (
//     <motion.div 
//       className="min-h-screen text-white px-3 py-6"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="max-w-md mx-auto space-y-6">

//         {/* 🔷 HEADER */}
//         <motion.div 
//           className="flex items-center justify-between bg-[#00000033] backdrop-blur-[20px] border border-[#444385] rounded-2xl px-4 py-3"
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.1 }}
//         >

//           {/* LEFT SIDE */}
//           <div>
//             <p className="text-xs text-gray-400">User ID</p>
//             <h2 className="text-lg font-semibold bg-gradient-to-r from-[#FFF] to-[#587FFF] bg-clip-text text-transparent">
//               {userId}
//             </h2>
//           </div>

//           {/* RIGHT SIDE */}
//           <div
//             onClick={() => navigate("/settings/profile")}
//             className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#587FFF] to-[#09239F] shadow-lg shadow-blue-500/20 cursor-pointer active:scale-95 transition"
//             aria-label="Go to settings"
//           >
//             <User size={18} />
//           </div>

//         </motion.div>

//         {/* 🔥 CARDS */}
//         <motion.div 
//           className="grid grid-cols-1 sm:grid-cols-2 gap-4"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           {stats.map((item, i) => (
//             <motion.div
//               key={i}
//               className="group rounded-2xl border-2 border-[#444385] overflow-hidden hover:scale-105 transition-transform duration-300"
//               whileHover={{ scale: 1.05 }}
//             >
//               <div className="bg-[#00000033] p-4 backdrop-blur-[20px] 
//               transition-all duration-300
//               group-hover:bg-[linear-gradient(180deg,#020204,#2C6096)]
//               group-hover:border-l-[5px] group-hover:border-l-[#587FFF]">

//                 <div className="flex justify-between">
//                   <p className="text-gray-400 text-xs">{item.title}</p>
//                   <div className="text-blue-400" aria-label={item.title}>{item.icon}</div>
//                 </div>

//                 <p className="text-white text-lg font-semibold mt-2">
//                   {item.value}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* 📊 CHART */}
//         <motion.div 
//           className="rounded-2xl border-2 border-[#444385] overflow-hidden"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3 }}
//         >
//           <div className="bg-[#00000033] p-4 backdrop-blur-[20px] group-hover:bg-[linear-gradient(180deg,#020204,#2C6096)]">

//             <p className="text-gray-300 text-sm mb-3">Investment Overview</p>

//             <Suspense fallback={<div className="h-40 flex items-center justify-center text-gray-400">Loading chart...</div>}>
//               <Line data={chartData} options={chartOptions} />
//             </Suspense>

//             <div className="flex justify-between mt-4">
//               {["1H", "1D", "1W", "1M", "1Y"].map((item) => (
//                 <button
//                   key={item}
//                   onClick={() => setActiveFilter(item)}
//                   className={`text-xs px-3 py-2 rounded-full transition-all active:scale-95 ${activeFilter === item
//                     ? "bg-blue-500/20 text-blue-400"
//                     : "text-gray-400 hover:bg-gray-700"
//                     }`}
//                   aria-label={`Filter by ${item}`}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>

//           </div>
//         </motion.div>

//         {/* 🔗 REFERRAL */}
//         <motion.div 
//           className="rounded-2xl border-2 border-[#444385] overflow-hidden"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.4 }}
//         >
//           <div className="bg-[#00000033] p-4 backdrop-blur-[20px]">

//             <p className="text-sm text-gray-300 mb-2">Referral Link</p>

//             <div className="bg-black border border-[#81ECFF] rounded-lg p-3 text-xs mb-4">
//               CPR1234567
//             </div>

//             <div className="flex gap-3">
//               <button
//                 onClick={handleCopy}
//                 className="flex-1 bg-[linear-gradient(45deg,#587FFF,#09239F)] hover:bg-[linear-gradient(45deg,#6C8CFF,#0B2ED1)] text-white text-sm py-3 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95"
//                 aria-label="Copy referral link"
//               >
//                 <Copy size={16} />
//                 Copy
//               </button>

//               <button
//                 onClick={handleShare}
//                 className="flex-1 bg-[linear-gradient(45deg,#587FFF,#09239F)] hover:bg-[linear-gradient(45deg,#6C8CFF,#0B2ED1)] text-white text-sm py-3 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95"
//                 aria-label="Share referral link"
//               >
//                 <Share2 size={16} />
//                 Share
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/* 📄 TABLE */}
//         <motion.div 
//           className="rounded-2xl border-2 border-[#444385] overflow-hidden"
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.5 }}
//         >
//           <div className="bg-[#00000033] p-4 backdrop-blur-[20px]">

//             <p className="text-sm text-gray-300 mb-3">Recent Buy</p>

//             {/* 🔥 RESPONSIVE WRAPPER */}
//             <div className="overflow-x-auto">

//               <table className="min-w-[500px] w-full text-xs">

//                 {/* HEADER */}
//                 <thead>
//                   <tr className="text-gray-400 border-b border-[#333] text-left">
//                     <th className="px-3 py-3 w-[60px]">S.No</th>
//                     <th className="py-2">ID</th>
//                     <th>Amount</th>
//                     <th>Date</th>
//                     <th className="text-right">Status</th>
//                   </tr>
//                 </thead>

//                 {/* BODY */}
//                 <tbody>
//                   {transactions.map((tx, i) => (
//                     <motion.tr
//                       key={i}
//                       className="border-b border-[#222] hover:bg-[#ffffff05] transition"
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.6 + i * 0.1 }}
//                     >
//                       {/* ✅ S.NO (FIXED) */}
//                       <td className="px-3 py-3 text-blue-400 font-medium">
//                         {i + 1}
//                       </td>

//                       <td className="py-2">{tx.id}</td>
//                       <td>{tx.amount}</td>
//                       <td>{tx.date}</td>

//                       <td className="text-right">
//                         <span className="text-green-400 text-xs">
//                           {tx.status}
//                         </span>
//                       </td>
//                     </motion.tr>
//                   ))}

//                   {/* EMPTY STATE */}
//                   {transactions.length === 0 && (
//                     <tr>
//                       <td colSpan="5" className="text-center py-4 text-gray-400">
//                         No Records Found
//                       </td>
//                     </tr>
//                   )}

//                 </tbody>

//               </table>

//             </div>
//           </div>
//         </motion.div>

//       </div>
//     </motion.div>
//   );
// };

// export default HomeDashboard;