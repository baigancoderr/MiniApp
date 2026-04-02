'use client';

import React, { useState } from "react";
import { ArrowLeft, User, Wallet, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WithdrawUSDT = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  const balance = 350;

  const withdrawHistory = [
    { id: "#W12345", amount: "$100", address: "0xA1B2...9F", date: "12 Mar 2026", status: "Success" },
    { id: "#W12346", amount: "$50", address: "0xX9Y8...7K", date: "10 Mar 2026", status: "Pending" },
  ];

  return (
    <div className="min-h-screen flex justify-center px-2 py-3 pb-20 text-white">

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
            <h2 className="text-lg font-semibold">Withdraw</h2>
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

        {/* 🔥 BALANCE CARD (MATCH PROFILE STATS CARD) */}
        <div className="group rounded-2xl border-2 border-[#444385] overflow-hidden mb-5">
          <div className="
            bg-[#00000033] p-4 backdrop-blur-[20px]
            group-hover:bg-[linear-gradient(180deg,_#020204_0%,_#2C6096_100%)]
            group-hover:border-l-[5px] group-hover:border-l-[#587FFF]
            transition-all duration-300
          ">
            <div className="flex gap-3 items-center">

              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#587FFF33]">
                <Wallet size={18} />
              </div>

              <div>
                <p className="text-xs text-white font-[Manrope]">
                  Available Balance
                </p>
                <p className="text-lg font-bold font-[Space Grotesk]">
                  ${balance}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* 🔥 FORM CARD (PROFILE STYLE GRADIENT BORDER) */}
        <div className="rounded-2xl border border-[#81ECFF66] p-[1px] mb-5
        bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.4),_rgba(0,7,64,0.2))]">

          <div className="rounded-2xl bg-[#0B0F1A] p-4 backdrop-blur-[20px]">

            <div className="space-y-4">

              {/* Amount */}
              <div>
                <label className="text-xs text-[#81ECFF] font-[Manrope]">
                  Amount
                </label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="
                  w-full mt-1 px-3 py-2 rounded-lg
                  bg-[#00000033]
                  border border-[#444B55]
                  text-white
                  outline-none
                  focus:border-[#587FFF]
                  "
                />
              </div>

              {/* Address */}
              <div>
                <label className="text-xs text-[#81ECFF] font-[Manrope]">
                  Wallet Address
                </label>
                <input
                  type="text"
                  placeholder="Enter wallet address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="
                  w-full mt-1 px-3 py-2 rounded-lg
                  bg-[#00000033]
                  border border-[#444B55]
                  text-white
                  outline-none
                  focus:border-[#587FFF]
                  "
                />
              </div>

              {/* BUTTON (PROFILE SAME) */}
              <button
                className="
                w-full py-3 rounded-full
                bg-[linear-gradient(45deg,_#587FFF_0%,_#09239F_100%)]
                text-white text-sm font-[Poppins]
                flex items-center justify-center gap-2
                hover:opacity-90 transition
                "
              >
                <Send size={16} />
                Withdraw Now
              </button>

            </div>

          </div>
        </div>

        {/* 🔥 HISTORY TABLE (SAME STYLE) */}
        <div className="rounded-2xl border border-[#81ECFF66] p-[1px]
        bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.4),_rgba(0,7,64,0.2))]">

          <div className="rounded-2xl bg-[#0B0F1A] backdrop-blur-[20px] overflow-hidden">

            {/* HEADER */}
            <div className="grid grid-cols-5 px-3 py-3 text-xs font-[Manrope] text-[#81ECFF] border-b border-[#1f2430]">
              <p>Txn ID</p>
              <p>Amount</p>
              <p>Address</p>
              <p>Date</p>
              <p className="text-right">Status</p>
            </div>

            {/* DATA */}
            {withdrawHistory.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-5 px-3 py-3 text-sm items-center
                border-b border-[#1f2430]
                hover:bg-[linear-gradient(90deg,_rgba(88,127,255,0.1),_transparent)]
                transition"
              >
                <p>{item.id}</p>
                <p>{item.amount}</p>
                <p className="truncate">{item.address}</p>
                <p>{item.date}</p>

                <p className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${item.status === "Success"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-yellow-500/20 text-yellow-300"
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
  );
};

export default WithdrawUSDT;