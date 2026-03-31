import React, { useState } from "react";
import { ArrowLeft, Settings, Wallet, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WithdrawUSDT = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  // Dummy balance
  const balance = 350;

  const withdrawHistory = [
    {
      id: "#W12345",
      amount: "$100",
      address: "0xA1B2...9F",
      date: "12 Mar 2026",
      status: "Success",
    },
    {
      id: "#W12346",
      amount: "$50",
      address: "0xX9Y8...7K",
      date: "10 Mar 2026",
      status: "Pending",
    },
  ];

  const handleWithdraw = () => {
    if (!amount || !address) {
      alert("Please fill all fields");
      return;
    }

    alert("Withdraw request submitted 🚀");
    setAmount("");
    setAddress("");
  };

  return (
    <div className="min-h-screen flex justify-center px-2 py-3 pb-20 text-white">
      <div className="w-full max-w-md mx-auto">

        {/* HEADER */}
        <div className="flex bg-[#282936] items-center justify-between mb-4 px-3 py-2 rounded-lg">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 rounded-md hover:bg-white/10"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-lg font-bold">Withdraw USDT</h2>
          </div>
          <Settings size={20} />
        </div>

        {/* 🔥 BALANCE CARD */}
        <div className="relative rounded-xl p-[1px] mb-4 bg-gradient-to-br from-green-500/40 to-transparent">
          <div className="rounded-xl p-4 bg-black/40 backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                <Wallet size={18} />
              </div>
              <div>
                <p className="text-xs text-gray-400">Available Balance</p>
                <h3 className="text-xl font-semibold">${balance}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* 🔥 WITHDRAW FORM */}
        <div className="relative rounded-xl p-[1px] mb-4 bg-gradient-to-br from-blue-500/40 to-transparent">
          <div className="rounded-xl p-4 bg-black/40 backdrop-blur-xl border border-white/10">

            <div className="space-y-3">

              {/* Amount */}
              <div>
                <label className="text-xs text-gray-400">Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-md bg-white/5 border border-white/10 outline-none focus:border-blue-400"
                />
              </div>

              {/* Address */}
              <div>
                <label className="text-xs text-gray-400">USDT Wallet Address</label>
                <input
                  type="text"
                  placeholder="Enter wallet address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-md bg-white/5 border border-white/10 outline-none focus:border-blue-400"
                />
              </div>

              {/* Button */}
              <button
                onClick={handleWithdraw}
                className="w-full mt-2 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 font-semibold flex items-center justify-center gap-2 hover:opacity-90"
              >
                <Send size={16} />
                Withdraw Now
              </button>

            </div>

          </div>
        </div>

        {/* 🔥 WITHDRAW HISTORY */}
        <div className="relative rounded-2xl border border-[#81ECFF66] p-[1px] 
        bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.4)_1.24%,_rgba(0,7,64,0.2)_20.92%)]">

          <div className="rounded-2xl p-3 bg-[#00000033] backdrop-blur-[20px] overflow-x-auto">

            <table className="w-full text-left min-w-[500px]">

              <thead>
                <tr className="text-xs text-[#81ECFF]">
                  <th className="py-2">Txn ID</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Address</th>
                  <th className="py-2">Date</th>
                  <th className="py-2 text-right">Status</th>
                </tr>
              </thead>

              <tbody>
                {withdrawHistory.map((item, i) => (
                  <tr key={i} className="border-t border-white/10 text-sm">
                    <td className="py-3">{item.id}</td>
                    <td className="py-3">{item.amount}</td>
                    <td className="py-3">{item.address}</td>
                    <td className="py-3">{item.date}</td>

                    <td className="py-3 text-right">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold
                          ${
                            item.status === "Success"
                              ? "bg-green-500/20 text-green-400"
                              : item.status === "Pending"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                      >
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
    </div>
  );
};

export default WithdrawUSDT;