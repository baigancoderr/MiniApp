'use client';

import React, { useState } from "react";
import { ArrowLeft, User, Wallet, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DepositHistory = () => {
  const navigate = useNavigate();

  // 🔥 Dummy Data (25 rows)
  const data = Array.from({ length: 25 }, (_, i) => ({
    id: "#TXN" + (12345 + i),
    amount: 50 + i * 10,
    method: "USDT",
    date: "12 Mar 2026",
    status: i % 3 === 0 ? "Success" : i % 3 === 1 ? "Pending" : "Failed",
  }));

  // 🔥 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = data.slice(indexOfFirst, indexOfLast);

  // 🔥 Stats
  const totalDeposit = data
    .filter((d) => d.status === "Success")
    .reduce((acc, curr) => acc + curr.amount, 0);

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
            <h1 className="text-lg font-semibold">Deposit History</h1>
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

        {/* 🔥 SUMMARY */}
        <div className="grid grid-cols-2 gap-3 mb-5">

          <div className="rounded-2xl border border-[#444385] p-3 bg-[#00000033]">
            <div className="flex gap-3 items-center">
              <TrendingUp size={18} />
              <div>
                <p className="text-xs text-gray-400">Total Deposit</p>
                <p className="text-lg font-bold">${totalDeposit}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#444385] p-3 bg-[#00000033]">
            <div className="flex gap-3 items-center">
              <Wallet size={18} />
              <div>
                <p className="text-xs text-gray-400">Total Balance</p>
                <p className="text-lg font-bold">${totalDeposit}</p>
              </div>
            </div>
          </div>

        </div>

        {/* 🔥 TABLE SECTION */}
        <div className="space-y-4 border border-[#444385] rounded-lg px-2 py-4 bg-[#00000033]">

          {/* HEADING */}
          <h2 className="text-lg font-semibold 
          bg-gradient-to-r from-[#587FFF] to-[#09239F] 
          bg-clip-text text-transparent">
            Deposit History
          </h2>

          {/* TABLE */}
          <div className="rounded-lg border border-[#81ECFF66] p-[1px]
        bg-[linear-gradient(217deg,_rgba(88,127,255,0.4),_rgba(0,7,64,0.2))]">

            <div className="rounded-lg bg-[#0B0F1A] backdrop-blur-xl">

              <div className="overflow-x-auto">

                <table className="min-w-[600px] w-full text-sm">

                  {/* HEADER */}
                  <thead className="bg-[linear-gradient(90deg,_rgba(88,127,255,0.1),_transparent)] uppercase rounded-lg">
                    <tr className="text-gray-400 border-b border-[#1f2430]">
                      <th className="px-3 py-3 text-left">S.No</th>
                      <th className="px-3 py-3 text-left">Txn ID</th>
                      <th className="px-3 py-3 text-left">Amount</th>
                      <th className="px-3 py-3 text-left">Method</th>
                      <th className="px-3 py-3 text-left">Date</th>
                      <th className="px-3 py-3 text-right">Status</th>
                    </tr>
                  </thead>

                  {/* BODY */}
                  <tbody>
                    {currentData.map((item, i) => (
                      <tr key={i}
                        className="border-b border-[#1f2430]
                        hover:bg-[linear-gradient(90deg,_rgba(88,127,255,0.1),_transparent)]">
                        <td className="px-3 py-3 text-blue-400 font-medium">
                          {indexOfFirst + i + 1}
                        </td>
                        <td className="px-3 py-3">{item.id}</td>
                        <td className="px-3 py-3">${item.amount}</td>
                        <td className="px-3 py-3">{item.method}</td>
                        <td className="px-3 py-3">{item.date}</td>

                        <td className="px-3 py-3 text-right">
                          <span className={`px-2 py-1 rounded-full text-xs ${item.status === "Success"
                              ? "bg-green-500/20 text-green-300"
                              : item.status === "Pending"
                                ? "bg-yellow-500/20 text-yellow-300"
                                : "bg-red-500/20 text-red-300"
                            }`}>
                            {item.status}
                          </span>
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
            <div className="flex justify-between items-center">

              <p className="text-xs text-gray-400">
                Page <span className="text-white">{currentPage}</span> of {totalPages}
              </p>

              <div className="flex gap-2">

                <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}
                  className="px-2 py-1 text-xs border border-[#444385] rounded disabled:opacity-40">
                  ⏮
                </button>

                <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}
                  className="px-2 py-1 text-xs border border-[#444385] rounded disabled:opacity-40">
                  ←
                </button>

                <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}
                  className="px-2 py-1 text-xs border border-[#444385] rounded disabled:opacity-40">
                  →
                </button>

                <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}
                  className="px-2 py-1 text-xs border border-[#444385] rounded disabled:opacity-40">
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

export default DepositHistory;