'use client';

import React, { useState } from "react";
import { ArrowLeft, User, Wallet, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WithdrawUSDT = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  const balance = 350;

  // 🔥 Dummy Data
  const withdrawHistory = Array.from({ length: 25 }, (_, i) => ({
    id: "#W" + (12345 + i),
    amount: "$" + (50 + i * 10),
    address: "0xA1B2C3D4...XYZ" + i,
    date: "12 Mar 2026",
    status: i % 2 === 0 ? "Success" : "Pending",
  }));

  // 🔥 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(withdrawHistory.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = withdrawHistory.slice(indexOfFirst, indexOfLast);

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
            <h2 className="text-lg font-semibold">Withdraw</h2>
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

        {/* 🔥 BALANCE */}
        <div className="rounded-2xl border border-[#444385] p-4 mb-5 bg-[#00000033]">
          <div className="flex gap-3 items-center">
            <Wallet size={18} />
            <div>
              <p className="text-xs text-gray-400">Available Balance</p>
              <p className="text-lg font-bold">${balance}</p>
            </div>
          </div>
        </div>

        {/* 🔥 FORM */}
        <div className="rounded-2xl border border-[#81ECFF66] p-[1px] mb-5
        bg-[linear-gradient(217deg,_rgba(88,127,255,0.4),_rgba(0,7,64,0.2))]">

          <div className="rounded-2xl bg-[#0B0F1A] p-4 space-y-4">

            <div>
              <label className="text-xs text-[#81ECFF]">Amount</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-[#00000033] border border-[#444B55]"
              />
            </div>

            <div>
              <label className="text-xs text-[#81ECFF]">Wallet Address</label>
              <input
                type="text"
                placeholder="Enter wallet address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg bg-[#00000033] border border-[#444B55]"
              />
            </div>

            <button className="w-full py-3 rounded-full
            bg-gradient-to-r from-[#587FFF] to-[#09239F]
            flex items-center justify-center gap-2">
              <Send size={16} />
              Withdraw Now
            </button>

          </div>
        </div>

        {/* 🔥 HISTORY */}
        <div className="space-y-3">

          {/* HEADING */}
          <h2 className="text-lg font-semibold 
          bg-gradient-to-r from-[#587FFF] to-[#09239F] 
          bg-clip-text text-transparent">
            Withdraw History
          </h2>

          {/* TABLE */}
          <div className="rounded-2xl border border-[#81ECFF66] p-[1px]
          bg-[linear-gradient(217deg,_rgba(88,127,255,0.4),_rgba(0,7,64,0.2))]">

            <div className="rounded-2xl bg-[#0B0F1A]">

              <div className="overflow-x-auto">

                <table className="min-w-[700px] w-full text-sm">

                  <thead className="bg-[linear-gradient(90deg,_rgba(88,127,255,0.1),_transparent)] uppercase rounded-lg">
                    <tr className="text-gray-400 border-b border-[#1f2430]">
                      <th className="px-3 py-3 text-left">S.No</th>
                      <th className="px-3 py-3 text-left">Txn ID</th>
                      <th className="px-3 py-3 text-left">Amount</th>
                      <th className="px-3 py-3 text-left">Address</th>
                      <th className="px-3 py-3 text-left">Date</th>
                      <th className="px-3 py-3 text-right">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentData.map((item, i) => (
                      <tr key={i}
                        className="border-b border-[#1f2430]
                        hover:bg-[linear-gradient(90deg,_rgba(88,127,255,0.1),_transparent)]">

                        {/* S.NO */}
                        <td className="px-3 py-3 text-blue-400 font-medium">
                          {indexOfFirst + i + 1}
                        </td>

                        <td className="px-3 py-3">{item.id}</td>
                        <td className="px-3 py-3">{item.amount}</td>
                        <td className="px-3 py-3 truncate max-w-[120px]">{item.address}</td>
                        <td className="px-3 py-3">{item.date}</td>

                        <td className="px-3 py-3 text-right">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.status === "Success"
                              ? "bg-green-500/20 text-green-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }`}>
                            {item.status}
                          </span>
                        </td>

                      </tr>
                    ))}

                    {currentData.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-5 text-gray-400">
                          No Records Found
                        </td>
                      </tr>
                    )}

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

export default WithdrawUSDT;