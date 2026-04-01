'use client';

import React, { useState } from "react";
import { ArrowLeft, Users, TrendingUp, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReferralEarningsHistory = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("direct");

    const data = [
        { id: "CIP12345", name: "Rahul", type: "Direct", amount: "10", date: "12 Mar 2026" },
        { id: "CIP67890", name: "Amit", type: "Level", amount: "5", date: "10 Mar 2026" },
        { id: "CIP54321", name: "Suresh", type: "Direct", amount: "8", date: "08 Mar 2026" },
    ];

    return (
        <div className="min-h-screen flex justify-center px-2 py-3 pb-20 text-white">

            <div className="w-full max-w-md mx-auto">

                {/* HEADER */}
                <div className="flex bg-[#282936] items-center justify-between mb-5 px-3 py-2 rounded-lg">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate(-1)}>
                            <ArrowLeft size={20} />
                        </button>
                        <h2 className="text-lg font-bold font-[Manrope]">
                            Referral Earnings
                        </h2>
                    </div>
                    <Settings size={20} />
                </div>

                {/* TOP STATS */}
                <div className="grid grid-cols-2 gap-3 mb-5">

                    {/* TOTAL */}
                    <div className="group rounded-2xl border-2 border-[#444385] overflow-hidden">
            <div className="
              bg-[#00000033] p-3 backdrop-blur-[20px]
              group-hover:bg-[linear-gradient(180deg,_#020204_0%,_#2C6096_100%)]
              group-hover:border-l-[5px] group-hover:border-l-[#587FFF]
              transition-all duration-300
            ">

                            <div className="flex gap-3">
                                <div className="w-9 h-9 rounded-full bg-[#587FFF33] flex items-center justify-center">
                                    <Users size={18} />
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">Total Referral</p>
                                    <p className="text-lg font-bold">120</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* DIRECT */}
                    <div className="group rounded-2xl border-2 border-[#444385] overflow-hidden">
            <div className="
              bg-[#00000033] p-3 backdrop-blur-[20px]
              group-hover:bg-[linear-gradient(180deg,_#020204_0%,_#2C6096_100%)]
              group-hover:border-l-[5px] group-hover:border-l-[#587FFF]
              transition-all duration-300
            ">

                            <div className="flex gap-3">
                                <div className="w-9 h-9 rounded-full bg-[#587FFF33] flex items-center justify-center">
                                    <TrendingUp size={18} />
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">Direct Referral</p>
                                    <p className="text-lg font-bold">45</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                {/* TABS */}
                <div className="flex bg-[#1B2028] border border-[#444B55] rounded-full p-1 mb-4">
                    <button
                        onClick={() => setActiveTab("direct")}
                        className={`flex-1 py-2 text-sm rounded-full font-[Poppins] transition ${
                            activeTab === "direct"
                                ? "bg-[linear-gradient(45deg,_#587FFF_0%,_#09239F_100%)]"
                                : "text-gray-400"
                        }`}
                    >
                        Direct
                    </button>

                    <button
                        onClick={() => setActiveTab("level")}
                        className={`flex-1 py-2 text-sm rounded-full font-[Poppins] transition ${
                            activeTab === "level"
                                ? "bg-[linear-gradient(45deg,_#587FFF_0%,_#09239F_100%)]"
                                : "text-gray-400"
                        }`}
                    >
                        Level
                    </button>
                </div>

                {/* TABLE CARD */}
                <div className="rounded-2xl border border-[#81ECFF66] p-[1px]
                bg-[linear-gradient(217deg,_rgba(88,127,255,0.4),_rgba(0,7,64,0.2))]">

                    <div className="rounded-2xl bg-[#0B0F1A] overflow-hidden backdrop-blur-xl">

                        {/* HEADER */}
                        <div className="grid grid-cols-5 px-3 py-3 text-xs text-gray-400 border-b border-[#1f2430]">
                            <p>ID</p>
                            <p>Name</p>
                            <p>Type</p>
                            <p className="text-center">Amt</p>
                            <p className="text-right">Date</p>
                        </div>

                        {/* DATA */}
                        {data.map((item, i) => (
                            <div key={i}
                                className="grid grid-cols-5 px-3 py-3 text-sm items-center
                                border-b border-[#1f2430]
                                hover:bg-[linear-gradient(90deg,_rgba(88,127,255,0.1),_transparent)]
                                transition">

                                <p className="truncate">{item.id}</p>

                                <p className="truncate font-medium">{item.name}</p>

                                <p className={`text-xs px-2 py-1 rounded-full w-fit
                                    ${item.type === "Direct"
                                        ? "bg-blue-500/20 text-blue-300"
                                        : "bg-green-500/20 text-green-300"
                                    }`}>
                                    {item.type}
                                </p>

                                <p className="text-center font-bold text-[#81ECFF]">
                                    +{item.amount}
                                </p>

                                <p className="text-right text-xs text-gray-400">
                                    {item.date}
                                </p>

                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReferralEarningsHistory;



