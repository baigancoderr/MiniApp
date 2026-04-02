import React from 'react';
import btmimg from "../../../assets/btmimg.png";
import { ArrowLeft, ChevronLeft, ChevronRight, ArrowRight, Settings,Gift  } from "lucide-react";
import { useState } from "react";
import { Users, User, Network } from "lucide-react";
import { useNavigate } from "react-router-dom";



const Referral = () => {
  const navigate = useNavigate();
   
  
      const [activeTab, setActiveTab] = useState("all");
      const [currentPage, setCurrentPage] = useState(1);
  
      // 🔥 Dummy Data
      const data = Array.from({ length: 25 }, (_, i) => ({
          id: "CIP" + (10000 + i),
          name: ["Rahul", "Amit", "Suresh", "Vikas"][i % 4],
          type: i % 2 === 0 ? "Direct" : "Level",
          amount: (5 + i).toString(),
          date: "12 Mar 2026",
      }));
  
      // 🔥 Filter
      const filteredData =
          activeTab === "all"
              ? data
              : activeTab === "direct"
                  ? data.filter((item) => item.type === "Direct")
                  : data.filter((item) => item.type === "Level");
  
      // 🔥 Pagination
      const itemsPerPage = 5;
      const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
      const indexOfLast = currentPage * itemsPerPage;
      const indexOfFirst = indexOfLast - itemsPerPage;
      const currentData = filteredData.slice(indexOfFirst, indexOfLast);
  return (
    <div className="  pb-20 py-3 px-2  text-white font-sans flex justify-center">
      <div className="w-full max-w-md mx-auto   relative">

        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/settings")}
              className="p-2 rounded-lg bg-[#00000033] border border-[#444385]"
            >
              <ArrowLeft size={18} />
            </button>
            <h2 className="text-lg font-semibold">Referral</h2>
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

       

        {/* Stats Cards */}


        <div className=" grid grid-cols-2 gap-4">

          {/* Direct Referrals */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl px-2 py-3">

            {/* Title Row */}
            <div className="flex items-center gap-2 mb-2">
              <Users size={18} className="text-emerald-400" />
              <p className="text-xs text-gray-400">Direct Referrals</p>
            </div>

            {/* Value */}
            <p className="text-xl font-bold">0</p>

            {/* Subtext */}
            <p className="text-emerald-400 text-sm">Active Users</p>
          </div>


          {/* Team Size */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-3">

            {/* Title Row */}
            <div className="flex items-center gap-2 mb-2">
              <Network size={18} className="text-blue-400" />
              <p className="text-xs text-gray-400">Team Size</p>
            </div>

            {/* Value */}
            <p className="text-xl font-bold">0</p>

            {/* Subtext */}
            <p className="text-blue-400 text-sm">Total Network</p>
          </div>

        </div>

         {/* Referral Earning History */}
      <div className="space-y-4 border border-[#444385] rounded-lg px-2 py-4 mt-5 bg-[#00000033]">

              <div className="flex justify-between items-center mb-4">
  <h2 className="text-md font-semibold">Referral Earnings History</h2>

  <button
    onClick={() => navigate("/settings/referral-earning-history")}
    className="text-xs text-[#81ECFF] flex items-center gap-1"
  >
    See More →
  </button>
</div>

                {/* 🔥 TABS */}
                <div className="flex bg-[#1B2028] border border-[#444B55] rounded-full p-1 mb-4">

                    {/* ALL */}
                    <button
                        onClick={() => {
                            setActiveTab("all");
                            setCurrentPage(1);
                        }}
                        className={`flex-1 py-2 text-sm rounded-full transition ${activeTab === "all"
                                ? "bg-gradient-to-r from-[#587FFF] to-[#09239F] text-white"
                                : "text-gray-400"
                            }`}
                    >
                        All
                    </button>

                    {/* DIRECT */}
                    <button
                        onClick={() => {
                            setActiveTab("direct");
                            setCurrentPage(1);
                        }}
                        className={`flex-1 py-2 text-sm rounded-full transition ${activeTab === "direct"
                                ? "bg-gradient-to-r from-[#587FFF] to-[#09239F] text-white"
                                : "text-gray-400"
                            }`}
                    >
                        Direct
                    </button>

                    {/* LEVEL */}
                    <button
                        onClick={() => {
                            setActiveTab("level");
                            setCurrentPage(1);
                        }}
                        className={`flex-1 py-2 text-sm rounded-full transition ${activeTab === "level"
                                ? "bg-gradient-to-r from-[#587FFF] to-[#09239F] text-white"
                                : "text-gray-400"
                            }`}
                    >
                        Level
                    </button>

                </div>

                {/* 🔥 TABLE */}
                <div className="rounded-lg border border-[#81ECFF66] p-[1px]
        bg-[linear-gradient(217deg,_rgba(88,127,255,0.4),_rgba(0,7,64,0.2))]">

                    <div className="rounded-lg bg-[#0B0F1A] backdrop-blur-xl">

                        <div className="overflow-x-auto">

                            <table className="min-w-[600px]  w-full text-sm">

                                <thead className="bg-[linear-gradient(90deg,_rgba(88,127,255,0.1),_transparent)] uppercase rounded-lg">
                                    <tr className="text-[#FFFFFF] border-b border-[#1f2430]">
                                       
                                       <th className="px-3 py-3 text-left">S.No</th>
                                        <th className="px-3 py-3 text-left">ID</th>
                                        <th className="px-3 py-3 text-left">Name</th>
                                        <th className="px-3 py-3 text-left">Type</th>
                                        <th className="px-3 py-3 text-center">Amount</th>
                                        <th className="px-3 py-3 text-right">Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {currentData.map((item, i) => (
                                        <tr key={i}
                                            className="border-b border-[#1f2430]
                      hover:bg-[linear-gradient(90deg,_rgba(88,127,255,0.1),_transparent)]">
<td className="px-3 py-3 text-blue-400 font-medium">
  {indexOfFirst + i + 1}
</td>
                                            <td className="px-3 py-3">{item.id}</td>
                                            <td className="px-3 py-3 font-medium">{item.name}</td>

                                            <td className="px-3 py-3">
                                                <span className={`text-xs px-2 py-1 rounded-full ${item.type === "Direct"
                                                        ? "bg-blue-500/20 text-blue-300"
                                                        : "bg-green-500/20 text-green-300"
                                                    }`}>
                                                    {item.type}
                                                </span>
                                            </td>

                                            <td className="px-3 py-3 text-center font-bold text-[#81ECFF]">
                                                +{item.amount}
                                            </td>

                                            <td className="px-3 py-3 text-right text-xs text-gray-400">
                                                {item.date}
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                        </div>
                    </div>
                </div>

              
                

                </div>

        {/* Main Image Section with Overlay Text */}
        <div className="relative mt-1">
          {/* Your Image */}
          <img
            src={btmimg}
            alt="No Referrals"
            className="w-full rounded-3xl"
          />

          {/* Text & Button Overlay on Image */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
            <div className="mt-4"> {/* Adjust margin-top to position text properly over image */}
              <h2 className="text-lg font-semibold mb-2">No Referrals Yet</h2>
              <p className="text-gray-300 text-[14px] leading-relaxed max-w-[330px]">
                Start sharing your referral code to earn commission on every trade your friends make.
              </p>
            </div>

            {/* Invite Button - positioned at bottom of image */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full px-16">
              <button
                className="w-full font-semibold text-md py-[10px] rounded-xl shadow-xl active:scale-95 transition-all text-white"
                style={{
                  background: 'linear-gradient(45deg, #587FFF 0%, #09239F 100%)'
                }}
              >
                Invite Friends
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Referral;