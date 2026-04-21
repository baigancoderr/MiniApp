'use client';

import React, { useState, useCallback } from "react";
import { ArrowLeft, User, Wallet, TrendingUp, Copy, Check, Layers } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../../../api/axios";
import CustomDateInput from "../../utils/CustomDateInput"

// ─── Helpers ────────────────────────────────────────────────────────────────

const shortenHash = (hash) => {
  if (!hash) return "—";
  return `${hash.slice(0, 4)}...${hash.slice(-3)}`;
};

const statusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return "bg-green-500/20 text-green-300";
    case "pending":
      return "bg-yellow-500/20 text-yellow-300";
    case "failed":
      return "bg-red-500/20 text-red-300";
    default:
      return "bg-gray-500/20 text-gray-300";
  }
};

const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "—");

// ─── Fetch ───────────────────────────────────────────────────────────────────

const fetchDepositHistory = async (page, startDate, endDate) => {
  const token = localStorage.getItem("token");

  const res = await api.get("/user/deposit-history", {
    params: {
      page,
      startDate,
      endDate,
    },
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data;
};

// ─── CopyCell ────────────────────────────────────────────────────────────────

const CopyCell = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      toast.success("Copied!");
      setTimeout(() => setCopied(false), 2000);
    });
  }, [value]);

  return (
    <button
      onClick={handleCopy}
      title={value || "No hash available"}
      className="flex items-center gap-1 text-left group"
    >
      <span className="text-blue-300 underline underline-offset-2 decoration-dotted text-sm">
        {shortenHash(value)}
      </span>
      <span className="text-gray-500 group-hover:text-white transition">
        {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
      </span>
    </button>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const DepositHistory = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("history"); // "history" | "balance"
  const [currentPage, setCurrentPage] = useState(1);
 
  const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");

const [tempStartDate, setTempStartDate] = useState("");
const [tempEndDate, setTempEndDate] = useState("");

  // 🔥 Cached Query — won't hit API again for 5 minutes
  const { data, isLoading, isError } = useQuery({
   queryKey: ["deposit-history", currentPage, startDate, endDate],
queryFn: () => fetchDepositHistory(currentPage, startDate, endDate),
    staleTime: 1000 * 60 * 5,   // 5 min fresh
    cacheTime: 1000 * 60 * 10,  // 10 min in cache
    refetchOnWindowFocus: false,
  });

  const deposits = data?.deposits || [];
  const pagination = data?.pagination || {};

  // ─── Stats ───────────────────────────────────────────────────────────────
  const totalRecords = pagination.total ?? deposits.length;
  const totalDeposited = deposits
    .filter((d) => d.status?.toLowerCase() === "completed")
    .reduce((acc, d) => acc + (d.creditedAmount ?? 0), 0);

  // ─── Pagination ──────────────────────────────────────────────────────────
  // const totalPages = Math.ceil(deposits.length / itemsPerPage);
  // const indexOfLast = currentPage * itemsPerPage;
  // const indexOfFirst = indexOfLast - itemsPerPage;
  // const currentData = deposits.slice(indexOfFirst, indexOfLast);
// const deposits = data?.deposits || [];
// const pagination = data?.pagination || {};
const totalPages = pagination.pages || 1;
  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex justify-center px-2 py-3 pb-24 text-white ">
      <div className="w-full max-w-md mx-auto">

        {/* HEADER */}
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

        {/* TABS */}
        <div className="flex gap-2 mb-5">
          {[
            { key: "history", label: "Deposit History", icon: <TrendingUp size={14} /> },
            { key: "balance", label: "Balance Info", icon: <Wallet size={14} /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 border
                ${activeTab === tab.key
                  ? "bg-gradient-to-r from-[#587FFF] to-[#09239F] border-transparent text-white shadow-md shadow-blue-500/20"
                  : "bg-[#00000033] border-[#444385] text-gray-400 hover:text-white"
                }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ─── TAB: HISTORY ─────────────────────────────────────────────────── */}
        {activeTab === "history" && (
          <>
            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="rounded-2xl border border-[#444385] p-3 bg-[#00000033]">
                <div className="flex gap-3 items-center">
                  <TrendingUp size={18} className="text-blue-400" />
                  <div>
                    <p className="text-xs text-gray-400">Total Balance</p>
                    <p className="text-md font-bold">${totalDeposited.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#444385] p-3 bg-[#00000033]">
                <div className="flex gap-3 items-center">
                  <Layers size={18} className="text-purple-400" />
                  <div>
                    <p className="text-xs text-gray-400">Total Records</p>
                    <p className="text-md font-bold">{totalRecords}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="space-y-4 border border-[#444385] rounded-xl px-2 py-4 bg-[#00000033]">
              <h2 className="text-lg font-semibold bg-gradient-to-r from-[#587FFF] to-[#09239F] bg-clip-text text-transparent">
                Transactions
              </h2>



{/* FILTER SECTION - Custom DD/MM/YYYY Date Inputs */}
<div className="flex flex-col gap-4 mb-4">

  {/* START DATE */}
  <CustomDateInput 
    label="Start Date" 
    value={tempStartDate} 
    onChange={setTempStartDate} 
  />

  {/* END DATE */}
  <CustomDateInput 
    label="End Date" 
    value={tempEndDate} 
    onChange={setTempEndDate} 
  />

  {/* BUTTONS SIDE BY SIDE */}
  <div className="grid grid-cols-2 gap-3 pt-1">

    {/* CLEAR BUTTON - 3D Style */}
    <button
      onClick={() => {
    setTempStartDate("");
    setTempEndDate("");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  }}
      className="py-2 text-sm font-semibold rounded-md  
                 bg-gradient-to-br from-gray-700 to-gray-900
                 border border-gray-500/50
                 text-gray-200
                 shadow-[0_4px_14px_-2px_rgba(0,0,0,0.6),inset_0_-2px_6px_rgba(255,255,255,0.08)]
                 transition-all duration-200 ease-out
                 hover:scale-[1.04] hover:shadow-[0_6px_20px_-4px_rgba(0,0,0,0.7)]
                 active:scale-[0.96] active:translate-y-[1px] active:shadow-inner
                 hover:border-gray-400/60"
    >
      Clear
    </button>

    {/* APPLY FILTER BUTTON - 3D Style */}
    <button
       onClick={() => {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
    setCurrentPage(1);
  }}
      className="py-2 text-sm font-semibold rounded-md
                 bg-gradient-to-br from-[#587FFF] via-[#3B6EFF] to-[#09239F]
                 shadow-[0_4px_8px_-2px_rgb(88,127,255,0.5),inset_0_-3px_8px_rgba(0,0,0,0.4)]
                 border border-blue-400/30
                 transition-all duration-200 ease-out
                 hover:scale-[1.04] hover:shadow-[0_6px_10px_-4px_rgb(88,127,255,0.6)]
                 active:scale-[0.96] active:translate-y-[1px] active:shadow-inner
                 text-white"
    >
      Apply Filter
    </button>

  </div>

</div>




              <div className="rounded-lg border border-[#81ECFF66] p-[1px]
                bg-[linear-gradient(217deg,_rgba(88,127,255,0.4),_rgba(0,7,64,0.2))]">
                <div className="rounded-lg bg-[#0B0F1A] backdrop-blur-xl">
                  <div className="overflow-x-auto">
                    <table className="min-w-[600px] w-full text-sm">
                    

                      {/* HEADER */}
                      <thead className="bg-[linear-gradient(90deg,_rgba(88,127,255,0.1),_transparent)] uppercase">
                        <tr className="text-gray-400 border-b border-[#1f2430]">
                          <th className="px-3 py-3 text-left">#</th>
                          <th className="px-3 py-3 text-left">Txn Hash</th>
                          <th className="px-3 py-3 text-left">Amount</th>
                          <th className="px-3 py-3 text-left">Method</th>
                          <th className="px-3 py-3 text-left">Date</th>
                          <th className="px-3 py-3 text-right">Status</th>
                        </tr>
                      </thead>

                      {/* BODY */}
                      <tbody>
                        {isLoading ? (
                          <tr>
                            <td colSpan="6" className="text-center py-6 text-gray-400">
                              Loading deposit history...
                            </td>
                          </tr>
                        ) : isError ? (
                          <tr>
                            <td colSpan="6" className="text-center py-6 text-red-400">
                              Failed to load history. Please try again.
                            </td>
                          </tr>
                        ) : deposits.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="text-center py-6 text-gray-400">
                              No Deposit Records Found
                            </td>
                          </tr>
                        ) : (
                          deposits.map((item, i) => (
                            <tr
                              key={item._id}
                              className="border-b border-[#1f2430]
                              hover:bg-[linear-gradient(90deg,_rgba(88,127,255,0.08),_transparent)]
                              transition-colors"
                            >
                              {/* S.No */}
                              <td className="px-3 py-3 text-blue-400 font-medium">
                               {(pagination.page - 1) * pagination.limit + i + 1}
                              </td>

                              {/* Txn Hash — click to copy */}
                              <td className="px-3 py-3">
                                <CopyCell value={item.transactionHash} />
                              </td>

                              {/* Amount = creditedAmount */}
                              <td className="px-3 py-3 font-medium text-white">
                                ${item.creditedAmount ?? 0}
                              </td>

                              {/* Method = currency */}
                              <td className="px-3 py-3 text-gray-300 text-xs uppercase">
                                {item.currency}
                              </td>

                              {/* Date */}
                              <td className="px-3 py-3 text-gray-400 text-xs">
                                {new Date(item.createdAt).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </td>

                              {/* Status */}
                              <td className="px-3 py-3 text-right">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle(item.status)}`}>
                                  {capitalize(item.status)}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>

                    </table>
                  </div>
                </div>
              </div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-400">
                    Page <span className="text-white">{currentPage}</span> of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    {[
                      { label: "⏮", action: () => setCurrentPage(1), disabled: currentPage === 1 },
                    { label: "←", action: () => setCurrentPage(p => Math.max(1, p - 1)) },
                    { label: "→", action: () => setCurrentPage(p => Math.min(totalPages, p + 1)) },
                    { label: "⏭", action: () => setCurrentPage(totalPages), disabled: currentPage === totalPages },
                    ].map(({ label, action, disabled }) => (
                      <button
                        key={label}
                        onClick={action}
                        disabled={disabled}
                        className="px-2 py-1 text-xs border border-[#444385] rounded disabled:opacity-40 hover:bg-[#444385]/30 transition"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ─── TAB: BALANCE ─────────────────────────────────────────────────── */}
        {activeTab === "balance" && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-[#587FFF] to-[#09239F] bg-clip-text text-transparent">
              Balance Overview
            </h2>

            <div className="rounded-2xl border border-[#81ECFF66] p-[1px]
              bg-[linear-gradient(217deg,_rgba(88,127,255,0.4),_rgba(0,7,64,0.2))]">
              <div className="rounded-2xl bg-[#0B0F1A] p-4 space-y-4">

                {/* Total Credited */}
                <div className="flex justify-between items-center border-b border-[#1f2430] pb-3">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <TrendingUp size={16} className="text-green-400" />
                    Total Credited
                  </div>
                  <p className="text-white font-bold text-base">${totalDeposited.toFixed(2)}</p>
                </div>

                {/* Total Records */}
                <div className="flex justify-between items-center border-b border-[#1f2430] pb-3">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Layers size={16} className="text-blue-400" />
                    Total Transactions
                  </div>
                  <p className="text-white font-bold text-base">{totalRecords}</p>
                </div>

                {/* Completed */}
                <div className="flex justify-between items-center border-b border-[#1f2430] pb-3">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                    Completed
                  </div>
                  <p className="text-green-300 font-medium">
                    {deposits.filter(d => d.status?.toLowerCase() === "completed").length}
                  </p>
                </div>

                {/* Pending */}
                <div className="flex justify-between items-center border-b border-[#1f2430] pb-3">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" />
                    Pending
                  </div>
                  <p className="text-yellow-300 font-medium">
                    {deposits.filter(d => d.status?.toLowerCase() === "pending").length}
                  </p>
                </div>

                {/* Failed */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                    Failed
                  </div>
                  <p className="text-red-300 font-medium">
                    {deposits.filter(d => d.status?.toLowerCase() === "failed").length}
                  </p>
                </div>

              </div>
            </div>

            {/* Networks breakdown */}
            <div className="rounded-2xl border border-[#444385] p-4 bg-[#00000033] space-y-2">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Networks Used</p>
              {[...new Set(deposits.map(d => d.network))].map(network => (
                <div key={network} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">{network}</span>
                  <span className="text-white font-medium">
                    {deposits.filter(d => d.network === network).length} txn
                  </span>
                </div>
              ))}
              {deposits.length === 0 && (
                <p className="text-gray-500 text-sm">No data available</p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DepositHistory;




