import { ArrowLeft, ChevronLeft, ChevronRight,Settings } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const WalletBreakdown = () => {
  const [activeTab, setActiveTab] = useState("utility"); // "utility" or "earning"
  const [currentPage, setCurrentPage] = useState(1);
const navigate = useNavigate();

  const transactionsPerPage = 4; // You can change this

  // Dummy Transaction Data
  const transactions = [
    {
      id: "TXN001",
      type: "Received",
      amount: "0.0452",
      token: "ETH",
      from: "0x7a2b...9f3d",
      date: "Mar 30, 2026",
      time: "14:32",
      status: "Completed",
    },
    {
      id: "TXN002",
      type: "Sent",
      amount: "0.0120",
      token: "ETH",
      from: "0x9f3d...a1b8",
      date: "Mar 29, 2026",
      time: "09:15",
      status: "Completed",
    },
    {
      id: "TXN003",
      type: "Received",
      amount: "0.0085",
      token: "ETH",
      from: "0x4c8e...2d7f",
      date: "Mar 28, 2026",
      time: "18:45",
      status: "Completed",
    },
    {
      id: "TXN004",
      type: "Sent",
      amount: "0.0250",
      token: "ETH",
      from: "0x1b9e...c3a2",
      date: "Mar 27, 2026",
      time: "11:20",
      status: "Pending",
    },
    {
      id: "TXN005",
      type: "Received",
      amount: "0.0150",
      token: "ETH",
      from: "0x8f3a...b9c1",
      date: "Mar 26, 2026",
      time: "16:05",
      status: "Completed",
    },
  ];

  // Pagination Logic
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="min-h-screen pb-16 text-white font-poppins ">
      <div className="max-w-md mx-auto ">

        {/* Header */}
        <div className="flex bg-[#282936] items-center justify-between mb-5 px-3 py-2">
                    <div className="flex items-center gap-3">
                        <button 
  onClick={() => navigate(-1)} 
  className="p-1.5 rounded-md text-[#FFFFFF]"
>
  <ArrowLeft size={20} />
</button>
                        <h1 className="text-lg font-[Manrope] font-bold">Wallet BreakDown</h1>
                    </div>
                    <Settings size={20} className="text-white" />
                </div>

        {/* Tabs */}
        <div className="px-4 pt-2 flex gap-2">
          <button
            onClick={() => setActiveTab("utility")}
            className={`flex-1 py-2 rounded-xl font-medium transition-all text-sm ${
              activeTab === "utility"
                ? "bg-blue-500 text-white"
                : "bg-white/10 text-gray-400 hover:bg-white/15"
            }`}
          >
            Utility Wallet
          </button>

          <button
            onClick={() => setActiveTab("earning")}
            className={`flex-1 py-2 rounded-xl font-medium transition-all text-sm ${
              activeTab === "earning"
                ? "bg-blue-500 text-white"
                : "bg-white/10 text-gray-400 hover:bg-white/15"
            }`}
          >
            Earning Wallet
          </button>
        </div>

        {/* Available Balance */}
        <div className="px-4 pt-6 pb-4">
          <div 
            className="bg-[#00000066] border border-[#44484F1A] rounded-2xl p-5 flex justify-between items-start"
          >
            <div>
              <p 
                className="text-xs uppercase tracking-widest mb-1"
                style={{ color: "#587FFF" }}
              >
                AVAILABLE BALANCE
              </p>
              
              <div className="flex items-baseline gap-2">
                <h2 className="text-xl font-semibold text-white">0.0000</h2>
                <span className="text-xl font-medium text-gray-300">ETH</span>
              </div>
              
              <p className="text-sm text-gray-400 mt-1">$0.00 USD</p>
            </div>

            {/* ETH Icon */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-4xl">⟠</span>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md text-sm">Transaction History</h3>
            <span className="text-blue-400 text-sm font-medium cursor-pointer hover:underline">
              View All
            </span>
          </div>

          <div className="rounded-xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-5 py-4 text-left text-gray-400 font-medium">ID</th>
                    <th className="px-5 py-4 text-left text-gray-400 font-medium">TYPE</th>
                    <th className="px-5 py-4 text-left text-gray-400 font-medium">AMOUNT</th>
                    <th className="px-5 py-4 text-left text-gray-400 font-medium">FROM</th>
                    <th className="px-5 py-4 text-left text-gray-400 font-medium">DATE</th>
                    <th className="px-5 py-4 text-left text-gray-400 font-medium">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {currentTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-5 py-4 font-mono text-gray-300 text-xs">
                        {tx.id}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            tx.type === "Received"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {tx.type}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`font-medium ${tx.type === "Received" ? "text-emerald-400" : "text-red-400"}`}>
                          {tx.type === "Received" ? "+" : "-"}{tx.amount} 
                        </span>
                      </td>
                      <td className="px-5 py-4 font-mono text-gray-400 text-xs">
                        {tx.from}
                      </td>
                      <td className="px-5 py-4 text-gray-300 whitespace-nowrap">
                        <div>{tx.date}</div>
                        <div className="text-xs text-gray-500">{tx.time}</div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            tx.status === "Completed"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty state */}
            {transactions.length === 0 && (
              <div className="py-12 flex flex-col items-center justify-center">
                <p className="text-gray-400 text-sm">No transactions found</p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-5 px-1">
              {/* Page Info */}
              <div className="text-xs text-gray-400 font-medium">
                Page <span className="text-white">{currentPage}</span> of {totalPages}
              </div>

              {/* Pagination Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md border border-white/10 transition-all duration-300 
                    ${currentPage === 1 
                      ? "opacity-40 cursor-not-allowed" 
                      : "hover:bg-white/10 hover:border-white/20 active:scale-95 hover:scale-110"
                    }`}
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-md border border-white/10 transition-all duration-300 
                    ${currentPage === totalPages 
                      ? "opacity-40 cursor-not-allowed" 
                      : "hover:bg-white/10 hover:border-white/20 active:scale-95 hover:scale-110"
                    }`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Portfolio Section */}
      <div className="px-4 mt-8">
  <div 
    className="rounded-2xl p-5 border border-[#81ECFF99]"
    style={{
      background: "linear-gradient(217.49deg, rgba(88, 127, 255, 0.5) 1.24%, rgba(0, 7, 64, 0.245) 20.92%)"
    }}
  >
    {/* Wallet Balances */}
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-300">Utility Wallet</span>
        <span className="font-medium">0.0000 ETH</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-300">Earning Wallet</span>
        <span className="font-medium">0.0000 ETH</span>
      </div>
    </div>

   <div 
      className="h-px my-4"
      style={{
        background: "linear-gradient(90deg, rgba(68, 72, 79, 0) 0%, rgba(68, 72, 79, 0.3) 50%, rgba(68, 72, 79, 0) 100%)"
      }}
    ></div>

    {/* Total Portfolio */}
    <div className="flex justify-between items-end">
      <div>
        <p className="text-xs uppercase  text-gray-400">TOTAL PORTFOLIO VALUE</p>
        <div className="flex items-baseline gap-2 mt-1">
          <span 
            className="text-xl font-semibold"
           
          >
            0.0000
          </span>
          <span className="text-md font-medium text-[#587FFF]">ETH</span>
        </div>
      </div>

      <div className="text-right">
        <p className="text-md font-semibold">$0.00 USD</p>
        <p className="text-xs text-emerald-400">+0.00% (24H)</p>
      </div>
    </div>
  </div>
</div>



        {/* Extra bottom padding for mobile */}
        <div className="h-8"></div>
      </div>
    </div>
  );
};

export default WalletBreakdown;