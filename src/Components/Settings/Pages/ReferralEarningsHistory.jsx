'use client';

import React, { useState } from "react";
import { ArrowLeft, Users,  Settings, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReferralEarningsHistory = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("direct");

    const data = [
        {
            id: "CIP12345",
            name: "User 1",
            type: "Direct",
            amount: "10",
            date: "12 Mar 2026",
        },
        {
            id: "CIP67890",
            name: "User 2",
            type: "Level",
            amount: "5",
            date: "10 Mar 2026",
        },
        {
            id: "CIP54321",
            name: "User 3",
            type: "Direct",
            amount: "8",
            date: "08 Mar 2026",
        },
    ];

    return (
        <div className="min-h-screen flex justify-center px-2 py-3 pb-20 text-white relative overflow-x-hidden">

            <div className="w-full max-w-md mx-auto">

                {/* HEADER */}
                <div className="flex bg-[#282936] items-center justify-between mb-5 px-3 py-2">
                    <div className="flex items-center gap-3">
                        {/* <button className="p-1.5 rounded-md text-[#FFFFFF]">
                            <ArrowLeft size={20} />
                        </button> */}
                        <button
                            onClick={() => navigate(-1)}
                            className="p-1.5 rounded-md text-[#FFFFFF]"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <h2 className="text-lg font-[Manrope] font-bold">Profile</h2>
                    </div>
                    <Settings size={20} className="text-white" />
                </div>

                {/* TOP CARDS */}
                <div className="grid grid-cols-2 gap-3 mb-5">

                    {/* TOTAL REFERRAL */}
                    <div className="group rounded-2xl border-2 border-[#444385] overflow-hidden">
                        <div className="
                            bg-[#00000033] p-3 backdrop-blur-[20px]
                            group-hover:bg-[linear-gradient(180deg,_#020204_0%,_#2C6096_100%)]
                            group-hover:border-l-[5px] group-hover:border-l-[#587FFF]
                            transition-all duration-300
                        ">
                            <div className="flex gap-3 items-start">
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <Users size={20} />
                                </div>

                                <div>
                                    <p className="text-xs font-[Manrope] text-gray-300">
                                        Total Referral
                                    </p>
                                    <p className="text-lg font-bold font-[Space Grotesk]">
                                        120
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DIRECT REFERRAL */}
                    <div className="group rounded-2xl border-2 border-[#444385] overflow-hidden">
                        <div className="
                            bg-[#00000033] p-3 backdrop-blur-[20px]
                            group-hover:bg-[linear-gradient(180deg,_#020204_0%,_#2C6096_100%)]
                            group-hover:border-l-[5px] group-hover:border-l-[#587FFF]
                            transition-all duration-300
                        ">
                            <div className="flex gap-3 items-start">
                                <div className="w-8 h-8 flex items-center justify-center">
                                    <TrendingUp size={20} />
                                </div>

                                <div>
                                    <p className="text-xs font-[Manrope] text-gray-300">
                                        Direct Referral
                                    </p>
                                    <p className="text-lg font-bold font-[Space Grotesk]">
                                        45
                                    </p>
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
                                ? "bg-[linear-gradient(0deg,_#587FFF_0%,_#09239F_100%)]"
                                : "text-gray-400"
                        }`}
                    >
                        Direct
                    </button>

                    <button
                        onClick={() => setActiveTab("level")}
                        className={`flex-1 py-2 text-sm rounded-full font-[Poppins] transition ${
                            activeTab === "level"
                                ? "bg-[linear-gradient(0deg,_#587FFF_0%,_#09239F_100%)]"
                                : "text-gray-400"
                        }`}
                    >
                        Level
                    </button>
                </div>

                {/* TABLE */}
                <div className="rounded-2xl border border-[#81ECFF66] p-[1px]
                bg-[linear-gradient(217deg,_rgba(88,127,255,0.4),_rgba(0,7,64,0.2))]">

                    <div className="rounded-2xl bg-[#0B0F1A] backdrop-blur-xl overflow-hidden">

                        {/* TABLE HEADER */}
                        <div className="grid grid-cols-5 px-3 py-3 border-b border-[#444B55] text-xs font-[Manrope] text-gray-400">
                            <p>ID</p>
                            <p>Name</p>
                            <p>Type</p>
                            <p className="text-center">Amount</p>
                            <p className="text-right">Date</p>
                        </div>

                        {/* TABLE BODY */}
                        {data.map((item, i) => (
                            <div
                                key={i}
                                className="grid grid-cols-5 px-3 py-3 text-sm items-center
                                border-b border-[#1f2430]
                                hover:bg-[linear-gradient(90deg,_rgba(88,127,255,0.1),_transparent)]
                                transition-all duration-300"
                            >
                                <p className="truncate">{item.id}</p>

                                <p className="truncate font-[Poppins]">
                                    {item.name}
                                </p>

                                <p
                                    className={`text-xs px-2 py-1 rounded-full w-fit ${
                                        item.type === "Direct"
                                            ? "bg-[#1E3A8A66] text-blue-300"
                                            : "bg-[#14532D66] text-green-300"
                                    }`}
                                >
                                    {item.type}
                                </p>

                                <p className="text-center font-bold text-[#81ECFF]">
                                    +{item.amount}
                                </p>

                                <p className="text-right text-gray-400 text-xs">
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