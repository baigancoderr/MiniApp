'use client';

import React, { useState } from "react";
import { ArrowLeft, Users, TrendingUp, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReferralEarningsHistory = () => {
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
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirst, indexOfLast);

    return (
        <div className="min-h-screen flex justify-center px-2 py-3 pb-24 text-white bg-[#0B0F19]">
            <div className="w-full max-w-md mx-auto">

                {/* 🔷 HEADER */}
                <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate("/settings")}
                            className="p-2 rounded-lg bg-[#00000033] border border-[#444385]"
                        >
                            <ArrowLeft size={18} />
                        </button>
                        <h2 className="text-lg font-semibold">Referral Earnings</h2>
                    </div>

                    <div
                        onClick={() => navigate("/settings/profile")}
                        className="w-10 h-10 flex items-center justify-center rounded-xl 
            bg-gradient-to-r from-[#587FFF] to-[#09239F] 
            shadow-lg shadow-blue-500/20 cursor-pointer"
                    >
                        <User size={18} />
                    </div>
                </div>

                {/* 🔥 STATS */}
                <div className="grid grid-cols-2 gap-3 mb-5">

                    <div className="rounded-2xl border border-[#444385] p-3 bg-[#00000033]">
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

                    <div className="rounded-2xl border border-[#444385] p-3 bg-[#00000033]">
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

                <div className="space-y-4 border border-[#444385] rounded-lg px-2 py-4 bg-[#00000033]">

                <h2 className="text-lg font-semibold mb-4">Reffral Earnings History</h2>

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

                {/* 🔥 PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex justify-between items-center mt-4">

                        <p className="text-xs text-gray-400">
                            Page <span className="text-white">{currentPage}</span> of {totalPages}
                        </p>

                        <div className="flex gap-2">

                            <button
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                                className="px-2 py-1 text-xs border border-[#444385] rounded disabled:opacity-40"
                            >
                                ⏮
                            </button>

                            <button
                                onClick={() => setCurrentPage((p) => p - 1)}
                                disabled={currentPage === 1}
                                className="px-2 py-1 text-xs border border-[#444385] rounded disabled:opacity-40"
                            >
                                ←
                            </button>

                            <button
                                onClick={() => setCurrentPage((p) => p + 1)}
                                disabled={currentPage === totalPages}
                                className="px-2 py-1 text-xs border border-[#444385] rounded disabled:opacity-40"
                            >
                                →
                            </button>

                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                                className="px-2 py-1 text-xs border border-[#444385] rounded disabled:opacity-40"
                            >
                                ⏭
                            </button>

                        </div>
                    </div>
                )}

                </div>

            </div>
        </div>
    );
};

export default ReferralEarningsHistory;