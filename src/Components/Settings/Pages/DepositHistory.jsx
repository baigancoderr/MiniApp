import React from "react";
import { ArrowLeft, Settings, Wallet, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DepositHistory = () => {
  const navigate = useNavigate();

  const data = [
    {
      id: "#TXN12345",
      amount: 100,
      method: "USDT",
      date: "12 Mar 2026",
      status: "Success",
    },
    {
      id: "#TXN12346",
      amount: 50,
      method: "USDT",
      date: "10 Mar 2026",
      status: "Pending",
    },
    {
      id: "#TXN12347",
      amount: 200,
      method: "USDT",
      date: "08 Mar 2026",
      status: "Failed",
    },
  ];

  // 🔥 CALCULATIONS
  const totalDeposit = data
    .filter((d) => d.status === "Success")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalBalance = totalDeposit; // future me withdraw minus kar sakte ho

  return (
    <div className="min-h-screen flex items-start justify-center px-2 py-3 pb-20 text-white">
      
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
            <h2 className="text-lg font-bold">Deposit History</h2>
          </div>
          <Settings size={20} />
        </div>

        {/* 🔥 SUMMARY CARDS */}
        <div className="grid grid-cols-2 gap-3 mb-4">

          {/* TOTAL DEPOSIT */}
          <div className="relative rounded-xl p-[1px] bg-gradient-to-br from-blue-500/40 to-transparent">
            <div className="rounded-xl p-3 bg-black/40 backdrop-blur-xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Total Deposit</p>
                  <h3 className="text-lg font-semibold">
                    ${totalDeposit}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* TOTAL BALANCE */}
          <div className="relative rounded-xl p-[1px] bg-gradient-to-br from-purple-500/40 to-transparent">
            <div className="rounded-xl p-3 bg-black/40 backdrop-blur-xl border border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                  <Wallet size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Total Balance</p>
                  <h3 className="text-lg font-semibold">
                    ${totalBalance}
                  </h3>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* TABLE */}
        <div className="px-1">
          <div className="relative rounded-2xl border border-[#81ECFF66] p-[1px] 
          bg-[linear-gradient(217.49deg,_rgba(88,127,255,0.4)_1.24%,_rgba(0,7,64,0.2)_20.92%)]">

            <div className="rounded-2xl p-3 bg-[#00000033] backdrop-blur-[20px] overflow-x-auto">

              <table className="w-full text-left min-w-[500px]">

                {/* HEAD */}
                <thead>
                  <tr className="text-xs text-[#81ECFF]">
                    <th className="py-2">Txn ID</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Method</th>
                    <th className="py-2">Date</th>
                    <th className="py-2 text-right">Status</th>
                  </tr>
                </thead>

                {/* BODY */}
                <tbody>
                  {data.map((item, i) => (
                    <tr
                      key={i}
                      className="border-t border-white/10 text-sm"
                    >
                      <td className="py-3">{item.id}</td>
                      <td className="py-3">${item.amount}</td>
                      <td className="py-3">{item.method}</td>
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
    </div>
  );
};

export default DepositHistory;