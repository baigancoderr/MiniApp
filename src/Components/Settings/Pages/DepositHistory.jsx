'use client';

import React from "react";
import { ArrowLeft, Settings, Wallet, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DepositHistory = () => {
  const navigate = useNavigate();

  const data = [
    { id: "#TXN12345", amount: 100, method: "USDT", date: "12 Mar 2026", status: "Success" },
    { id: "#TXN12346", amount: 50, method: "USDT", date: "10 Mar 2026", status: "Pending" },
    { id: "#TXN12347", amount: 200, method: "USDT", date: "08 Mar 2026", status: "Failed" },
  ];

  const totalDeposit = data
    .filter((d) => d.status === "Success")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalBalance = totalDeposit;

  return (
    <div className="min-h-screen flex items-start justify-center px-2 py-3 pb-20 text-white">

      <div className="w-full max-w-md mx-auto">

        {/* HEADER */}
        <div className="flex bg-[#282936] items-center justify-between mb-5 px-3 py-2 rounded-lg">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-lg font-bold font-[Manrope]">
              Deposit History
            </h2>
          </div>
          <Settings size={20} />
        </div>

        {/* 🔥 SUMMARY CARDS (MATCH PROFILE STYLE) */}
        <div className="grid grid-cols-2 gap-3 mb-5">

          {/* TOTAL DEPOSIT */}
          <div className="group rounded-2xl border-2 border-[#444385] overflow-hidden">
            <div className="
              bg-[#00000033] p-3 backdrop-blur-[20px]
              group-hover:bg-[linear-gradient(180deg,_#020204_0%,_#2C6096_100%)]
              group-hover:border-l-[5px] group-hover:border-l-[#587FFF]
              transition-all duration-300
            ">
              <div className="flex gap-3 items-center">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#587FFF33]">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <p className="text-xs text-white font-[Manrope]">Total Deposit</p>
                  <p className="text-lg font-bold font-[Space Grotesk]">
                    ${totalDeposit}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* TOTAL BALANCE */}
          <div className="group rounded-2xl border-2 border-[#444385] overflow-hidden">
            <div className="
              bg-[#00000033] p-3 backdrop-blur-[20px]
              group-hover:bg-[linear-gradient(180deg,_#020204_0%,_#2C6096_100%)]
              group-hover:border-l-[5px] group-hover:border-l-[#587FFF]
              transition-all duration-300
            ">
              <div className="flex gap-3 items-center">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#587FFF33]">
                  <Wallet size={18} />
                </div>
                <div>
                  <p className="text-xs text-white font-[Manrope]">Total Balance</p>
                  <p className="text-lg font-bold font-[Space Grotesk]">
                    ${totalBalance}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 🔥 TABLE CARD (MATCH PROFILE GRADIENT BORDER) */}
        <div className="px-1">
          <div className="rounded-2xl border border-[#81ECFF66] p-[1px]
          bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.4),_rgba(0,7,64,0.2))]">

            <div className="rounded-2xl bg-[#0B0F1A] backdrop-blur-[20px] overflow-hidden">

              {/* HEADER */}
              <div className="grid grid-cols-5 px-3 py-3 text-xs font-[Manrope] text-[#81ECFF] border-b border-[#1f2430]">
                <p>Txn ID</p>
                <p>Amount</p>
                <p>Method</p>
                <p>Date</p>
                <p className="text-right">Status</p>
              </div>

              {/* DATA */}
              {data.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-5 px-3 py-3 text-sm items-center
                  border-b border-[#1f2430]
                  hover:bg-[linear-gradient(90deg,_rgba(88,127,255,0.1),_transparent)]
                  transition-all"
                >
                  <p>{item.id}</p>
                  <p>${item.amount}</p>
                  <p>{item.method}</p>
                  <p>{item.date}</p>

                  <p className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${item.status === "Success"
                        ? "bg-green-500/20 text-green-300"
                        : item.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-red-500/20 text-red-300"
                      }`}>
                      {item.status}
                    </span>
                  </p>

                </div>
              ))}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DepositHistory;


